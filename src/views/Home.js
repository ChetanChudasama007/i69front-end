import React, { useEffect, useState, useRef } from "react";
import Navbar from "../layouts/Navbar";
import { gql, useLazyQuery } from "@apollo/client";
import { sendMessege } from "../mutation/sendMessege";
import AllMessages, { AllMessagesForWeb } from "./mobileChat/AllMessages";
import { formatDate, formatTime } from "../common/formatTime";
import { useRouter } from "next/router";
import Broadcast, { BroadcastMsgs } from "./mobileChat/Broadcast";
import { Avatar } from "@mui/material";
import ChatBox from "./mobileChat/ChatBox";
import { sendGift } from "../mutation/sendGift";
import {
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import { Block } from "@material-ui/icons";

const USER_QUERY = gql`
  query user($id: String!) {
    user(id: $id) {
      username
      fullName
      coins
      avatarPhotos {
        url
      }
    }
  }
`;

const MESSEGES_QUERY = gql`
  query messages($id: ID) {
    messages(id: $id) {
      edges {
        node {
          id
          content
          messageType
          timestamp
          userId {
            id
            username
            isOnline
            avatarPhotos {
              url
            }
          }
          roomId {
            id
            name
            userId {
              id
              username
              avatarPhotos {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const ChatVideoPlayer = ({ src, setVideoUrlState }) => {
  const videoRef = useRef(null);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAutoplay(true);
          console.log(entry);
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  }, []);

  const handleVideoClick = () => {
    setVideoUrlState(true);
  };

  return (
    <div className="d-flex align-items-end justify-content-end gap-1">
      <video
        width="320"
        height="320"
        ref={videoRef}
        controls={false}
        muted={true}
        autoPlay={autoplay}
        sx={{ display: Block }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="giftviewVideo" onClick={handleVideoClick}>
        <img src="./images/eye_ic.svg" alt="view"/>
      </div>
    </div>
  );
};

const Home = () => {
  const [load, setLoad] = useState(false);
  const [room, setRoom] = useState(null);
  const [roomsAllData, setRoomsAllData] = useState(null);
  const [allData, setAllData] = useState(null);
  // const [brodData, setBrodData] = useState();
  const [selectedUserId, setSelectedUserId] = useState();
  const [time, setTime] = useState();
  const [message, setMessage] = useState("");
  const [selectedGift, setselectedGift] = useState();
  const [showGiftDetails, setShowGiftDetails] = useState(false);
  const [giftImage, setGiftImage] = useState(null);
  const [onlineNowCount, setOnlineNowCount] = useState(0);
  const [onlineNowUsers, setOnlineNowUsers] = useState();
  const [chatSerch, setchatSearch] = useState("");
  const [videoUrlState, setVideoUrlState] = useState(false);
  // const [messageType,setMessageType] = useState("")

  const router = useRouter();

  const [userId, setUserId] = useState();

  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  useEffect(() => {
    if(message){
      const chatbox = document.querySelector("#chatinput");
      chatbox.click();
      // sendMessege({
      //   roomId: room,
      //   messegeStr: message,
      //   messageType: messageType,
      // }).then((response) => {
      //   if (response) {
      //     setMessage("");
      //     setMessageType("")
      //     // refetch();
      //     refetchData();
      //     console.log(response,'Res');
      //   }
      // });
    }
  },[message])

  const prevItemIdRef = useRef(null);

  const [
    getUserData,
    {
      data: userData,
      error: userError,
      loading: userLoading,
      refetch: refetchData,
    },
  ] = useLazyQuery(USER_QUERY);

  const [getMessageData, { data, error, loading, refetch }] =
    useLazyQuery(MESSEGES_QUERY);

  useEffect(() => {
    if (userId) {
      getUserData({
        variables: {
          id: userId,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (room) {
      getMessageData({
        variables: { id: room },
      });
    }
  }, [room]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const roomId = localStorage.getItem("roomId");
      console.log(roomId, "room id found");
      setRoom(roomId);
    }
  }, [room]);

  useEffect(() => {
    console.log("room", room);
    if (room) {
      refetch();
    }
    if (userId) {
      refetchData();  
    }
    // if (data) {
    //   if (
    //     prevItemIdRef.current !== data?.messages?.edges[0]?.node?.roomId?.id
    //   ) {
    //     console.log(prevItemIdRef, "Old");
    //     console.log(data?.messages?.edges[0]?.node?.roomId?.id, "new");
    //     scrollToBottom();
    //     prevItemIdRef.current = data?.messages?.edges[0]?.node?.roomId?.id;
    //   }
    // }
    // scrollToBottomNew();
  }, [data, loading, room, load, userData]);

  useEffect(() => {
    scrollToBottom()
  },[data?.messages?.edges?.length])

  const handleSendMessage = async () => {
      if(message){
        const response = await sendMessege({
          roomId: room,
          messegeStr: message,
          messageType: "C",
        });
        if (response) {
      console.log(response,new Date(),'Response');
          setMessage("");
          refetch();
          refetchData();
          console.log(response,'Res');
        }
      }
      // setMessageType("C")
  };

  const handleSendLocation = async () => {
    const response = await sendMessege({
      roomId: room,
      messegeStr: message,
      messageType: "GL",
    });

    if (response) {
      console.log(response,new Date(),'Response');
      setMessage("");
      refetch();
      refetchData();
      console.log(response);
    }
    // setMessageType("GL")
  };

  const handleSendGift = async () => {
    console.log(selectedGift);   
    const response = await sendGift({
      giftId: selectedGift,
      senderId: localStorage.getItem("userId"),
      receiverId:
        roomsAllData?.userId?.id === localStorage.getItem("userId")
          ? roomsAllData?.target?.id
          : roomsAllData?.userId?.id,
    });

    if (response) {
      setMessage("");
      refetch();
      refetchData();
      console.log(response);
    }
  };

  const showGiftDetailView = (image) => {
    setGiftImage(image);
    setShowGiftDetails(true);
  };

  const hideGiftDetail = () => {
    setShowGiftDetails(false);
  };

  let messegeData = data?.messages?.edges;

  const messagesEndRef = useRef(null);
  const scrollRef = useRef();

  // const scrollToBottomNew = () => {
  //   const scrollPosition = scrollRef.current.scrollTop;
  //   const scrollHeight = scrollRef.current.scrollHeight;
  //   if (scrollPosition >= scrollHeight - 1000) {
  //     scrollRef.current.scrollTo({
  //       top: scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setchatSearch(value);
  };

  const randerID = (id) => {
    router.push(`/profile/${id}`);
  };
  const sortMessgeData =
    messegeData &&
    messegeData.sort(
      (a, b) => new Date(a?.node?.timestamp) - new Date(b?.node?.timestamp)
    );
  //   console.log(sortMessgeData);
  const outgoingMessages =
    sortMessgeData &&
    sortMessgeData
      .filter(
        (message) =>
          message?.node?.userId?.id === localStorage.getItem("userId")
      )
      .sort(
        (a, b) => new Date(a?.node?.timestamp) - new Date(b?.node?.timestamp)
      );
      
  //   console.log(outgoingMessages);
  const incomingMessages =
    sortMessgeData &&
    sortMessgeData
      .filter(
        (message) =>
          message?.node?.userId?.id !== localStorage.getItem("userId")
      )
      .sort(
        (a, b) => new Date(a?.node?.timestamp) - new Date(b?.node?.timestamp)
      );
  //   console.log(incomingMessages)
  return (
    <>

      <div className="content_wrapper ">
        <div className="body-lg">
          {/* <Navbar /> */}

          <div className="row m-0 chatcover">
            {/* <div className="header-control header-control-msg h-c-g col-12" style={{ justifyContent: 'space-between', display: 'flex' }}>
              <i onClick={() => router.back()} className="fa fa-angle-left gold-icon" aria-hidden="true"></i>
              <div style={{ lineHeight: '30px', color: 'black' }}>
                <h6 style={{ color: 'black', lineHeight: '18px' }}>{roomsAllData?.target?.fullName}</h6>
              </div>

              <img src="./images/logo-right.jpg" style={{ height: '30px', width: '30px' }} />
            </div> */}
            <div className="col-3 user-list-parent px-0">
              <div className="chat-header-left">
                <div className="author">
                  <i
                    onClick={() => router.back()}
                    className="fa fa-angle-left gold-icon"
                    aria-hidden="true"
                  ></i>
                  <Avatar
                    sizes="small"
                    alt="user-avatar"
                    src={userData?.user?.avatarPhotos[0]?.url}
                    sx={{ cursor: "pointer" }}
                  />
                  <div className="rname">
                    <strong>{userData?.user?.fullName}</strong>
                    My Account
                  </div>
                </div>
                <div className="online-now-list">
                  <h4>
                    <span className="txt">Online Now</span>{" "}
                    <span className="count">{onlineNowCount}</span>
                  </h4>
                  <ul>
                    {onlineNowUsers &&
                      onlineNowUsers.map((item, index) => (
                        <li key={index}>
                          <a
                            onClick={(e) => {
                              localStorage.setItem("roomId", item?.id);
                              setRoom(item?.id);
                            }}
                          >
                            <img
                              className="pro_img"
                              src={
                                item?.userId?.id ===
                                localStorage.getItem("userId")
                                  ? item?.target?.avatarPhotos[0]?.url
                                  : item?.userId?.avatarPhotos[0]?.url
                              }
                              alt="avatar"
                            />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="search-friend">
                  <h4>
                    <span className="txt">
                      Messages <i className="fa fa-angle-down"></i>
                    </span>{" "}
                    <a className="edit_lnk" href="#!">
                      <i className="fa fa-pencil-square"></i>
                    </a>
                  </h4>
                  <div className="search_group">
                    <button aria-label="search">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                    <input
                      type="text"
                      placeholder="Search"
                      value={chatSerch}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="scr-msg">
                <Broadcast
                  setSelectedUser={setSelectedUserId}
                  setTime={setTime}
                />
                <AllMessagesForWeb
                  setLoad={setLoad}
                  room={room}
                  setRoom={setRoom}
                  setRoomsAllData={setRoomsAllData}
                  message={message}
                  setAllData={setAllData}
                  setSelectedUserId={setSelectedUserId}
                  setOnlineNowCount={setOnlineNowCount}
                  setOnlineNowUsers={setOnlineNowUsers}
                  userId={userId}
                  chatSerch={chatSerch}
                />
              </div>
            </div>

            <div className="col-9 chat-area  px-0">
              {/* <div onClick={() => router.push('/buy-chat-coin')} className="coin-area" style={{ cursor: 'pointer' }}>
                  <img src="./images/coin.PNG" alt="" />
                  <span>{roomsAllData?.userId?.coins}</span>
                  <small className="pb-1">COINS LEFT</small>
                </div> */}
              <div className="chat_mid_head">
                <div className="author">
                  {roomsAllData?.target?.fullName ? (
                    <Avatar
                      sizes="small"
                      alt="avatar"
                      src={
                        roomsAllData?.userId?.id ===
                        localStorage.getItem("userId")
                          ? roomsAllData?.target?.avatarPhotos[0]?.url
                          : roomsAllData?.userId?.avatarPhotos[0]?.url
                      }
                      sx={{ cursor: "pointer" }}
                      onClick={(e) =>
                        randerID(
                          roomsAllData?.userId?.id ===
                            localStorage.getItem("userId")
                            ? roomsAllData?.target?.id
                            : roomsAllData?.userId?.id
                        )
                      }
                    />
                  ) : (
                    <figure>
                      <img className="pro_img" src="/images/logo-right.jpg" alt="logo"/>
                    </figure>
                  )}

                  <div
                    className="rname"
                    onClick={(e) =>
                      randerID(
                        roomsAllData?.userId?.id ===
                          localStorage.getItem("userId")
                          ? roomsAllData?.target?.id
                          : roomsAllData?.userId?.id
                      )
                    }
                  >
                    <strong>
                      {roomsAllData?.target?.fullName
                        ? roomsAllData?.userId?.id ===
                          localStorage.getItem("userId")
                          ? roomsAllData?.target?.fullName
                          : roomsAllData?.userId?.fullName
                        : "Team i69"}
                    </strong>
                    {roomsAllData?.target?.fullName
                      ? (
                          roomsAllData?.userId?.id ===
                          localStorage.getItem("userId")
                            ? roomsAllData?.target?.isOnline
                            : roomsAllData?.userId?.isOnline
                        )
                        ? "Online"
                        : "Offline"
                      : ""}
                  </div>
                </div>
                <div className="rtl_dtl">
                  <a href="#">
                    <img src="./images/vdcall_ic.png" alt="video call"/>
                  </a>
                  <a href="#">
                    <img src="./images/ph_ic.png" alt="call"/>
                  </a>
                  <div className="leftcoin_lbl">
                    <img src="./images/coins_ic.png" alt="coins"/> {userData?.user?.coins}{" "}
                    Left
                  </div>
                </div>
              </div>
              <div className="scr-cht chat-area-color" ref={scrollRef}>
                {messegeData?.length > 0 ? (
                  selectedUserId === null ? (
                    <div className="chat-time chat-time-color">
                      {formatDate(
                        messegeData && messegeData[0]?.node?.timestamp
                      )}
                    </div>
                  ) : (
                    <div className="chat-time chat-time-color">
                      {formatDate(time)}
                    </div>
                  )
                ) : (
                  <div className="chat-time chat-time-color">Start</div>
                )}

                {selectedUserId === null ? (
                  <>
                    {sortMessgeData &&
                      sortMessgeData.length > 0 &&
                      sortMessgeData.map((item, index) => (
                        <div
                          key={index}
                          className={
                            item?.node?.userId?.id ===
                            localStorage.getItem("userId")
                              ? "msg-right"
                              : "msg-left"
                          }
                        >
                          <div
                            className={
                              item?.node?.userId?.id ===
                              localStorage.getItem("userId")
                                ? "bubble-1"
                                : "bubble-2"
                            }
                          >
                            <Avatar
                              sizes="small"
                              alt="avatar"
                              src={item?.node?.userId?.avatarPhotos[0]?.url}
                              sx={{ cursor: "pointer" }}
                              onClick={(e) => randerID(item?.node?.userId?.id)}
                            />
                            {item?.node?.messageType == "G" ? (
                              <div className="rdtail">
                                <span className="msg_txt">
                                  {item?.node?.content
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                                </span>
                                <div className="sendedgift">
                                  <img
                                    className="giftImg"
                                    src={item?.node?.content.split(" ")[0]}
                                    alt="gift"
                                  />
                                  <a
                                    href="#!"
                                    className="giftview"
                                    onClick={(e) =>
                                      showGiftDetailView(
                                        item?.node?.content.split(" ")[0]
                                      )
                                    }
                                  >
                                    <img src="./images/eye_ic.svg" alt="view"/>
                                  </a>
                                </div>
                              </div>
                            ) : item?.node?.content.startsWith("http") ||
                              item?.node?.content.startsWith("/media") ? (
                                (/\.(mp4|webm|ogg|ogv|mov|avi|wmv|flv)$/i).test(item?.node?.content)
                               ? (
                                <>
                                  <ChatVideoPlayer
                                    src={
                                      item?.node?.content.startsWith("/media")
                                        ? "https://api.i69app.com" +
                                          item?.node?.content
                                        : item?.node?.content
                                    }
                                    setVideoUrlState={setVideoUrlState}
                                  />
                                  <div
                                    className={
                                      videoUrlState
                                        ? "gift_image_preview_modal show align-items-center justify-content-center"
                                        : "gift_image_preview_modal"
                                    }
                                    style={{
                                      width: "55%",
                                      top: "20%",
                                      left: "35%",
                                    }}
                                  >
                                    <div className="d-flex align-items-center">
                                      <a
                                        href="#!"
                                        className="gift_image_preview_modal_button"
                                        onClick={() => setVideoUrlState(false)}
                                      >
                                        <img
                                          src="./images/close_ic.svg"
                                          alt="close/icon"
                                          width={25}
                                          height={25}
                                        />
                                      </a>
                                    </div>
                                    <div
                                      className="gift_image_preview_modal_image"
                                      onClick={() => setVideoUrlState(false)}
                                    >
                                      <video
                                        controls={true}
                                        muted={true}
                                        loop
                                        autoPlay={true}
                                        controlsList="nodownload"
                                      >
                                        <source
                                          src={
                                            item?.node?.content.startsWith(
                                              "/media"
                                            )
                                              ? "https://api.i69app.com" +
                                                item?.node?.content
                                              : item?.node?.content
                                          }
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="rdtail">
                                  <div className="sendedgift">
                                    <img
                                      className="giftImg"
                                      src={
                                        item?.node?.content.startsWith("/media")
                                          ? "https://api.i69app.com" +
                                            item?.node?.content
                                          : item?.node?.content
                                      }
                                      alt="gift"
                                    />
                                    <a
                                      href="#!"
                                      className="giftview"
                                      onClick={(e) =>
                                        showGiftDetailView(
                                          item?.node?.content.startsWith(
                                            "/media"
                                          )
                                            ? "https://api.i69app.com" +
                                                item?.node?.content
                                            : item?.node?.content
                                        )
                                      }
                                    >
                                      <img src="./images/eye_ic.svg" alt="view"/>
                                    </a>
                                  </div>
                                </div>
                              )
                            ) : item?.node?.messageType == "GL" ? (
                              <>
                                <APIProvider apiKey="AIzaSyBNDQFHOXjOH-AJH_tvgd7FM_IxLNClDRk">
                                  <Map
                                    style={{ width: "20vw", height: "40vh" }}
                                    defaultCenter={{
                                      lat: parseFloat(
                                        item?.node?.content.split(",")[0]
                                      ),
                                      lng: parseFloat(
                                        item?.node?.content.split(",")[1]
                                      ),
                                    }}
                                    defaultZoom={12}
                                    gestureHandling={"greedy"}
                                    disableDefaultUI={true}
                                    fullscreenControl={true}
                                    zoomControl={true}
                                    streetViewControl={true}
                                    mapTypeControl={true}
                                  >
                                    <Marker
                                      position={{
                                        lat: parseFloat(
                                          item?.node?.content.split(",")[0]
                                        ),
                                        lng: parseFloat(
                                          item?.node?.content.split(",")[1]
                                        ),
                                      }}
                                    />
                                  </Map>
                                </APIProvider>
                              </>
                            ) : (
                              <span className="msg_txt">
                                {item?.node?.content}
                              </span>
                            )}
                          </div>
                          <small className="time_lbl">
                            {formatTime(item?.node?.timestamp)}
                          </small>
                        </div>
                      ))}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <BroadcastMsgs selectedUser={selectedUserId} />
                )}
              </div>
              {roomsAllData?.target?.fullName && !selectedUserId && (
                <>
                  <ChatBox
                    room={room}
                    message={message}
                    handleSendMessage={handleSendMessage}
                    setMessage={setMessage}
                    receiver={
                      roomsAllData?.target?.fullName
                        ? roomsAllData?.userId?.id ===
                          localStorage.getItem("userId")
                          ? roomsAllData?.target?.fullName
                          : roomsAllData?.userId?.fullName
                        : "Team i69"
                    }
                    handleSendGift={handleSendGift}
                    setselectedGift={setselectedGift}
                    selectedGift={selectedGift}
                    handleSendLocation={handleSendLocation}
                    showGiftDetails={showGiftDetails}
                    setShowGiftDetails={setShowGiftDetails}
                    giftImage={giftImage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="body-sm">
          {/* <Navbar /> */}
          <div className="row m-0">
            <div className="col-12 user-list-parent px-0">
              <div className="chat-headers msg-header msg-header-res">
                MESSAGES
              </div>
              <div className="scr-msg">
                <AllMessages />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
