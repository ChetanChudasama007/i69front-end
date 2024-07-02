import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../common/formatTime";
import { deleteMessage } from "../../mutation/deleteMessage";
import moment from "moment";
import dynamic from "next/dynamic";
const Broadcast = dynamic(() => import('./Broadcast'))

const ROOMS_QUERY = gql`
  query rooms {
    rooms {
      edges {
        node {
          id
          name
          lastModified
          unread
          blocked
          messageSet {
            edges {
              node {
                id
                content
                messageType
                timestamp
                giftMessageSender {
                  id
                }
              }
            }
          }

          userId {
            coins
            id
            fullName
            isOnline
            purchaseCoins
            giftCoins
            coins
            avatarPhotos {
              url
            }
            username
          }
          target {
            id
            username
            isOnline
            avatarPhotos {
              url
            }
            fullName
            purchaseCoins
            giftCoins
            coins
          }
        }
      }
    }
  }
`;

const BROADCAST_QUERY = gql`
  query broadcast {
    broadcastMsgs {
      edges {
        node {
          id
          timestamp
          content
        }
      }
    }
  }
`;

const AllMessages = () => {
  const router = useRouter();
  const [getRoomsData, { data, loading, refetch }] =
    useLazyQuery(ROOMS_QUERY);

  useEffect(() => {
    getRoomsData();
  }, []);

  // console.log(data?.rooms?.edges)
  const [selectedUser, setSlelectedUser] = useState();
  // console.log(error)
  useEffect(() => {
    refetch();
  }, [loading]);
  let newmessegeData = data?.rooms?.edges;

  const fetchRoomId = (roomsData) => {
    // console.log(roomId)
    if (roomsData) {
      setSlelectedUser(roomsData?.id);
      localStorage.setItem("roomId", roomsData?.id);
      router.push(`/mobileChat/${roomsData?.id}`);
    }
  };

  return (
    <>
      <Broadcast />
      {newmessegeData &&
        newmessegeData.length > 0 &&
        newmessegeData.map((item, index) => (
          <div
            onClick={() => fetchRoomId(item?.node)}
            key={index}
            className={`${
              selectedUser === item?.node?.id ? "user-list2" : "user-list"
            }`}
          >
            {item?.node?.messageSet?.edges?.length > 0 ? (
              <small>
                {formatDate(item?.node?.messageSet?.edges[0]?.node?.timestamp)}
              </small>
            ) : (
              <small>Start</small>
            )}

            <img
              src={item?.node?.target?.avatarPhotos[0]?.url}
              alt="avatar"
              style={{ height: "80px" }}
            />

            <div className="chat-list-text">
              <div>
                <strong>{item?.node?.target?.fullName}</strong>
                <span>{item?.node?.messageSet?.edges[0]?.node?.content}</span>
              </div>
              <i className="fa fa-angle-right"></i>
            </div>
          </div>
        ))}
    </>
  );
};

export const AllMessagesForWeb = ({
  setLoad,
  room,
  setRoom,
  setRoomsAllData,
  message,
  setAllData,
  setSelectedUserId,
  setOnlineNowCount,
  setOnlineNowUsers,
  userId,
  chatSerch,
}) => {
  const router = useRouter();
  const [selectedUser, setSlelectedUser] = useState();

  const [getRoomsData, { data, error, loading, refetch }] =
  useLazyQuery(ROOMS_QUERY);

useEffect(() => {
  getRoomsData();
}, []);

  const [loadroom, setRoomData] = useState();
  // console.log(data?.rooms?.edges)
  // console.log(error)
  const [broadcastData, setBroadcastData] = useState();

  useEffect(() => {
    refetch();
    setAllData(data?.rooms?.edges);
  }, [selectedUser, message]);

  let newmessegeData = data?.rooms?.edges;
  let onlienuserList = [];

  useEffect(() => {
    newmessegeData &&
      newmessegeData.length > 0 &&
      newmessegeData
        .filter((message) => message?.node?.id === room)
        .map(
          (item, index) => (
            setRoomsAllData(item?.node),
            setSlelectedUser(item?.node?.id),
            setRoom(item?.node?.id),
            setLoad(true),
            setSelectedUserId(null)
          )
        );

    newmessegeData &&
      newmessegeData.length > 0 &&
      newmessegeData
        .filter(
          (message) => message?.node?.target?.id !== message?.node?.userId?.id
        )
        .map(
          (item, index) =>
            (item?.node?.id == room ||
              item?.node?.messageSet?.edges?.length > 0) &&
            (item?.node?.target?.id === userId
              ? item?.node?.userId?.isOnline
                ? onlienuserList.push(item?.node)
                : null
              : item?.node?.target?.isOnline
              ? onlienuserList.push(item?.node)
              : null)
        );
    setOnlineNowCount(onlienuserList.length);
    setOnlineNowUsers(onlienuserList);
  }, [newmessegeData, loading, room]);

  const fetchRoomId = (roomsData) => {
    // console.log(roomId)
    if (roomsData) {
      localStorage.setItem("roomId", roomsData?.id);
      setRoomsAllData(roomsData);
      setSlelectedUser(roomsData?.id);
      setRoom(roomsData?.id);
      setLoad(true);
      setSelectedUserId(null);
      router.push("/chat");
    }
  };

  const fetchData = () => {
    refetch();
  };

  //test
  useEffect(() => {
    // call this api after 3 second
    const id = setInterval(fetchData, 5000);
    return () => clearInterval(id);
    // fetchData();
  }, [data, loading]);

  const handleDeleteMessage = (messageid) => async () => {
    const response = await deleteMessage({
      chat: messageid,
    });

    if (response) {
      console.log(response);
      refetch();
      const button = document.querySelector("#broadcastroom");
      button.click();
    }
  };
  console.log(chatSerch, "search key");
  return (
    <>
      {newmessegeData &&
        newmessegeData.length > 0 &&
        newmessegeData
          .filter(
            (message) => message?.node?.target?.id !== message?.node?.userId?.id
          )
          .map(
            (item, index) =>
              (item?.node?.id == room ||
                item?.node?.messageSet?.edges?.length > 0) &&
              (chatSerch === null ||
                chatSerch === "" ||
                (item?.node?.userId?.id === localStorage.getItem("userId")
                  ? item?.node?.target?.fullName.includes(chatSerch)
                  : item?.node?.userId?.fullName.includes(chatSerch))) && (
                <div
                  onClick={() => fetchRoomId(item?.node)}
                  key={index}
                  className={`${
                    selectedUser === item?.node?.id ? "user-list2" : "user-list"
                  } ${item?.node?.unread !== "0" ? "unread-user" : ""}`}
                >
                  {item?.node?.messageSet?.edges?.length > 0 ? (
                    <small>
                      {moment
                        .utc(item?.node?.messageSet?.edges[0]?.node?.timestamp)
                        .local()
                        .startOf("seconds")
                        .fromNow()}
                    </small>
                  ) : (
                    <small>Start</small>
                  )}

                  <img
                    className="pro_img"
                    alt="avatar"
                    src={
                      item?.node?.userId?.id === localStorage.getItem("userId")
                        ? item?.node?.target?.avatarPhotos[0]?.url
                        : item?.node?.userId?.avatarPhotos[0]?.url
                    }
                  />

                  <div className="chat-list-text">
                    <div>
                      <strong>
                        {item?.node?.userId?.id ===
                        localStorage.getItem("userId")
                          ? item?.node?.target?.fullName
                          : item?.node?.userId?.fullName}
                      </strong>
                      <span>
                        {item?.node?.messageSet?.edges[0]?.node?.content}
                      </span>
                    </div>
                    {item?.node?.unread !== "0" ? (
                      <b className="noti_count unreadchat_count">
                        {item?.node?.unread}
                      </b>
                    ) : (
                      <i
                        class="fa fa-trash deleteic"
                        aria-hidden="true"
                        onClick={handleDeleteMessage(item?.node?.id)}
                      ></i>
                    )}
                  </div>
                </div>
              )
          )}
    </>
  );
};

// export const BroadCastMsg = () => {
//   const {data,error,loading,refetch}= useQuery(ROOMS_QUERY)
//   let newmessegeData = (data?.rooms?.edges)
//   return(
//     <>
//     {newmessegeData && newmessegeData.length >0 ?(
//       <></>

//     ):(
//       <>
//       <BroadcastMsgs/>
//       </>
//     )}

//     </>
//   )
// }

export default AllMessages;
