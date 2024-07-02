import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const GiftImagePreviewModal = dynamic(() => import('./GiftImagePreviewModal'))

const REALGIFT_QUERY = gql`
  query allRealGift {
    allRealGift {
      id
      giftName
      cost
      picture
      url
      type
      status
    }
  }
`;

const VIRTUALGIFT_QUERY = gql`
  query allVirtualGift {
    allVirtualGift {
      id
      giftName
      cost
      picture
      url
      type
      status
    }
  }
`;

export const ChatBox = ({
  room,
  message,
  handleSendMessage,
  setMessage,
  receiver,
  handleSendGift,
  setselectedGift,
  selectedGift,
  handleSendLocation,
  showGiftDetails,
  setShowGiftDetails,
  giftImage,
}) => {
  const [getRealGiftData, 
    {
      data: realGiftData,
      error: realGiftError,
      loading: realGiftLoading,
      refetch,
    }] = useLazyQuery(REALGIFT_QUERY);


  const [getVirtualGiftData, 
    {
      data: virtualGiftData,
      error: virtualGiftError,
      loading: virtualGiftLoading,
    }] = useLazyQuery(VIRTUALGIFT_QUERY);


  useEffect(() => {
    getRealGiftData({});
    getVirtualGiftData({});
  }, []);

  const [showLinks, setLinks] = useState(false);
  const [showGifts, setGifts] = useState(false);
  const [showReal, setShowReal] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [giftImageDailouge, setGiftImageDailouge] = useState("");
  const [giftImageDailougeState, setGiftImageDailougeState] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [messageValue,setMessageValue] = useState("")
  const [error, setError] = useState("");

  useEffect(() => {
    refetch();
  }, [realGiftLoading, virtualGiftLoading]);

  const handleMessageChange = (event) => {
    setMessageValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setMessage(messageValue)
      handleSendMessage();
      refetch();
      setMessageValue("")
    }
  };

  const handleSendMessageType = () => {
    if (latitude != null && longitude != null) {
      handleSendLocation();
      setLatitude(null);
      setLongitude(null);
    } else {
      setMessage(messageValue)
      handleSendMessage();
      setMessageValue("")
    }
  };

  const toggleSendGift = () => {
    setGifts(!showGifts);
  };

  const toggleSendAttachments = () => {
    setLinks(!showLinks);
  };

  const hideGiftDetail = () => {
    setShowGiftDetails(false);
  };

  const showVirtualGifts = () => {
    setShowReal(false);
  };

  const showRealGifts = () => {
    setShowReal(true);
  };

  const setSelectedGiftData = (giftid) => {
    setselectedGift(giftid);
  };

  const handleSendMessageData = () => {
    setGifts(!showGifts);
    setGiftImageDailougeState(false);
    handleSendGift();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.onerror = (error) => {
      console.error("File reading error:", error);
    };

    reader.readAsDataURL(selectedFile);

    const image = selectedFile;
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("upload_type", "image");
    formData.append("image", image);

    try {
      let httpLink;
      if (`${process.env.NEXT_PUBLIC_APP_ENV}` === "development") {
        httpLink = process.env.NEXT_PUBLIC_STAGING;
      } else {
        httpLink = process.env.NEXT_PUBLIC_PRODUCTION;
      }

      const response = await fetch(httpLink + "chat/image_upload", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data) {
        setMessage(data?.img);
        setLinks(!showLinks);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position, "location");
          handleSetLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      console.log("getcordinate is not working");
    }
  };

  const handleSetLocation = (lat, long) => {
    setMessage(lat + "," + long);
    setLatitude(lat);
    setLongitude(long);
    setLinks(!showLinks);
    refetch();
  };

  useEffect(() => {
    const img = new Image();
    img.src = giftImage;
    img.onload = () => {
      // Check if the image is horizontal or vertical based on its width and height
      if (img.width > img.height) {
        setIsHorizontal(true);
      } else {
        setIsHorizontal(false);
      }
    };
  }, [giftImage]);

  return (
    <div className="chat-send-area">
      <div className="send">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageValue}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
        />
        <div className="action">
          <a href="#!" className="giftsend" onClick={toggleSendGift}>
            <img src="./images/gift_img.png" alt="gift"/>
          </a>
          <div className={showGifts ? "sendgift_modal show" : "sendgift_modal"}>
            <div className="modal_title">
              <img src="./images/gift_img62x.png" />
              <span>Gifts</span>
              <a href="#!" className="modal_close" onClick={toggleSendGift}>
                <img src="./images/close_circle_icon.svg" />
              </a>
            </div>
            <div className="modal_body">
              <ul className="nav_tabs">
                <li>
                  <a
                    href="#!"
                    className={showReal ? "active" : ""}
                    onClick={showRealGifts}
                  >
                    REAL GIFTS
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className={showReal ? "" : "active"}
                    onClick={showVirtualGifts}
                  >
                    VIRTUAL GIFTS
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab_pane">
                  {showReal && realGiftData && (
                    <>
                      <div className="grid">
                        {realGiftData.allRealGift &&
                          realGiftData.allRealGift.length > 0 &&
                          realGiftData.allRealGift.map((item, index) => (
                            <div
                              key={index}
                              className={
                                item?.id === selectedGift
                                  ? "selected column"
                                  : "column grid_gold_color"
                              }
                            >
                              <h4>{item?.giftName}</h4>
                              <figure
                                onClick={() => {
                                  setGiftImageDailouge(item);
                                  setGiftImageDailougeState(true);
                                  setSelectedGiftData(item?.id);
                                }}
                              >
                                <img src={item?.url} />{" "}
                                <a className="expand_link" href="#!">
                                  <img src="./images/interface-arrows_ic.svg" />
                                </a>
                              </figure>
                              <span>{item?.cost} Coins</span>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                  {!showReal && virtualGiftData && (
                    <>
                      <div className="grid">
                        {virtualGiftData.allVirtualGift &&
                          virtualGiftData.allVirtualGift.length > 0 &&
                          virtualGiftData.allVirtualGift.map((item, index) => (
                            <div
                              key={index}
                              className={
                                item?.id === selectedGift
                                  ? "selected column"
                                  : "column grid_gold_color"
                              }
                            >
                              <h4>{item?.giftName}</h4>
                              <figure
                                onClick={() => {
                                  setGiftImageDailouge(item);
                                  setGiftImageDailougeState(true);
                                  setSelectedGiftData(item?.id);
                                }}
                              >
                                <img src={item?.url} />{" "}
                                <a className="expand_link">
                                  <img src="./images/interface-arrows_ic.svg" />
                                </a>
                                m
                              </figure>
                              <span>{item?.cost} Coins</span>
                            </div>
                          ))}
                      </div>
                    </>
                  )}

                  {giftImageDailougeState && (
                    <GiftImagePreviewModal
                      user={receiver}
                      data={giftImageDailouge}
                      close={setGiftImageDailougeState}
                      handleSend={handleSendMessageData}
                    />
                  )}

                  <button
                    className="gift_send"
                    // onClick={() => {}}
                  >
                    Send Gift To {receiver}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              showGiftDetails
                ? "gift_image_preview_modal show align-items-center justify-content-center"
                : "gift_image_preview_modal"
            }
            style={{
              width: isHorizontal ? "55%" : "30%",
            }}
          >
            <div className="d-flex align-items-center">
              <a
                href="#!"
                className="gift_image_preview_modal_button"
                onClick={hideGiftDetail}
              >
                <img
                  src="./images/close_ic.svg"
                  alt="close/icon"
                  width={25}
                  height={25}
                />
              </a>
            </div>
            <div className="gift_image_preview_modal_image">
              <img src={giftImage} alt="chat/img-modal" />
            </div>
          </div>

          <a href="#!" className="attach_link">
            <i className="fa-solid fa-link" onClick={toggleSendAttachments}></i>
          </a>
          <div className={showLinks ? "attache_modal show" : "attache_modal"}>
            <h4>SELECT IMAGE/FILE</h4>
            <div className="grid">
              <div className="attache_file_btn">
                <div className="icon">
                  <img src="./images/file_attache_ic1.svg" />
                </div>
                <strong>Camera</strong>
              </div>
              <div className="attache_file_btn">
                <div className="icon">
                  <label htmlFor="file-upload" className="custom--upload">
                    <img src="./images/file_attache_ic2.svg" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <strong>Gallery</strong>
              </div>
              <div className="attache_file_btn">
                <div className="icon" onClick={getLocation}>
                  <img src="./images/file_attache_ic3.svg" />
                </div>
                <strong>Location</strong>
              </div>
            </div>
          </div>

          <button
            className="send_btn"
            aria-label="send"
            id="chatinput"
            onClick={handleSendMessageType}
          >
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
