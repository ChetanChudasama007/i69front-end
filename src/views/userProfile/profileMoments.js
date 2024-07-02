import { gql, useLazyQuery } from "@apollo/client";
import { Box, CircularProgress, Typography, styled } from "@mui/material";
import { AvatarWrapper, Avatar } from "../Home2";
import Carousel from "react-material-ui-carousel";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { ViewMoment } from "../home/HomeScreen";
import dynamic from "next/dynamic";
const AddStoryTooltip = dynamic(() => import('../home/AddStoryTooltip'))

// data query

const GET_ALL_USER_MOMENTS = gql`
  query GetAllUserMoments(
    $UserId: UUID
    $width: Int = 30
    $characterSize: Int = 400
  ) {
    allUserMoments(user_Id: $UserId) {
      edges {
        cursor
        cursor
        node {
          pk
          comment
          createdDate
          publishAt
          file
          id
          like
          momentDescription
          momentDescriptionPaginated(
            width: $width
            characterSize: $characterSize
          )
          user {
            id
            email
            fullName
            username
            gender
            email
            avatar {
              url
              id
              user
            }
            onesignalPlayerId
            avatarPhotos {
              url
              id
              user
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

const GET_ALL_USER_STORIES = gql`
  query GetAllUserMultiStories {
    allUserMultiStories {
      user {
        id
        fullName
        avatar {
          url
          id
        }
        avatarIndex
        avatarPhotos {
          url
          id
        }
      }
      batchNumber
      stories {
        edges {
          cursor
          node {
            createdDate
            publishAt
            file
            fileType
            id
            pk
            thumbnail
            commentsCount
            comments {
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
              edges {
                cursor
                node {
                  id
                  pk
                  createdDate
                  commentDescription
                  objectId
                  pk
                  user {
                    id
                    fullName
                    avatarIndex
                    avatarPhotos {
                      url
                      id
                    }
                    avatar {
                      id
                      url
                    }
                  }
                }
              }
            }
            likesCount
            likes {
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
              edges {
                cursor
                node {
                  id
                  pk
                  objectId
                  user {
                    id
                    fullName
                    avatarIndex
                    avatarPhotos {
                      url
                      id
                    }
                    avatar {
                      id
                      url
                    }
                  }
                }
              }
            }
            user {
              id
              fullName
              avatar {
                url
                id
              }
              avatarIndex
              avatarPhotos {
                url
                id
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

// ============= Styled Components =============
// const StoriesContainer = styled(Box)({
//   width: "100%",
//   display: "flex",
//   backgroundColor: "#1F243080",
//   borderBottom: "3px solid #DEBC63",
//   padding: "4px",
//   gap: "4px",
//   overflowX: "scroll",
//   // scrollbarWidth: 'none',
//   // '-ms-overflow-style': 'none',
//   // '&::-webkit-scrollbar': {
//   //     display: 'none'
//   // }
// });

const AddStoryLightBlackShade = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  objectFit: "cover",
  borderRadius: "20px",
  position: "absolute",
  backgroundColor: "#000000b0",
  cursor: "pointer",
});

const StoryImage = styled("img")({
  height: "100%",
  width: "100%",
  borderRadius: "20px",
  objectFit: "cover",
});

const StoryVideo = styled("video")({
  height: "100%",
  width: "100%",
  borderRadius: "20px",
  objectFit: "cover",
});

const StoryName = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  textAlign: "center",
  marginTop: "10px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const MomentContainer = styled(Box)({
  backgroundColor: "#1F243080",
  display: "flex",
  flexWrap: "wrap",
  padding: "4px",
  margin: "4px",
  borderRadius: "10px",
});

const MomentResponsesBar = styled(Box)({
  width: "100%",
  paddingTop: "15px",
});

// const SelectedImagePreview = styled(Box)({
//   padding: "20px",
//   background: "#000000d1",
//   height: "100%",
//   width: "100%",
//   position: "absolute",
//   zIndex: 999,
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   display: "flex",
//   justifyContent: "center",
// });

const ShareOptionsContainer = styled(Box)({
  position: "absolute",
  bottom: "5%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const RadionButtonsContainer = styled(Box)({
  backgroundColor: "#1F243080",
  display: "flex",
  gap: "10px",
  padding: "20px",
  borderRadius: "20px",
});

// ============= Custom Components =============
const AddStory = ({ userData, handleFileChange }) => {
  const [open, setOpen] = useState(false);
  const onChangeHandler = (event) => {
    handleFileChange(event);
    setOpen(false);
  };

  return (
    <AddStoryTooltip open={open} onChangeHandler={onChangeHandler}>
      <div className="story-container add-story" onClick={() => setOpen(!open)}>
        <AddStoryLightBlackShade>
          <img
            src="/images/noto_camera.png"
            alt=""
            className="add-story-icon"
            style={{ height: "58px", width: "58px" }}
          />
        </AddStoryLightBlackShade>
        {/* <StoryImage src="/images/model25.png" alt="" /> */}
        <StoryImage src={userData?.user?.avatarPhotos[0]?.url} alt="" />
      </div>
      <StoryName sx={{ color: "#F3D27A" }}>ADD STORY</StoryName>
    </AddStoryTooltip>
  );
};

const MomentVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the video is in view
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAutoplay(true);
          console.log(entry);
          entry.target.play();
          //   observer.unobserve(entry.target); // Stop observing once triggered
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

  return (
    <video
      className="moment-image"
      width="320"
      height="320"
      ref={videoRef}
      controls={true}
      autoPlay={autoplay}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

const StoryVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the video is in view
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAutoplay(true);
          console.log(entry);
          entry.target.play();
          //   observer.unobserve(entry.target); // Stop observing once triggered
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

  return (
    <video className="storyvideoprod" loop autoPlay>
      <source src={src} type="video/mp4" />
    </video>
  );
};

const Story = ({ data, index }) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedID, setSelectedID] = useState("");
  const [imgClass, setimgClass] = useState("shimmer");
  let selected = "";
  let currentIndex = 0;
  let progress = 10;

  const showStoryDetailView = (data, index) => {
    setSelectedID(index);
    selected = "" + index;
    setSelectedStory(data);
    setShowModel(true);
  };

  const hideStoryDetailView = () => {
    setShowModel(false);
  };

  const fetchData = () => {
    if (selectedID != null) {
      let id = "progressbar_" + selectedID + "_" + currentIndex + "_data";
      let chatbox = document.querySelector("#" + id);
      let totalBars = document.getElementsByClassName(
        "progressbar_" + selectedID
      );

      if (chatbox) {
        if (parseInt(chatbox.style.width) < 100) {
          let newval = parseInt(chatbox.style.width) + 1;
          chatbox.style.width = newval + "%";
        } else {
          if (totalBars.length - 1 > currentIndex) {
            currentIndex = currentIndex + 1;
          } else {
            if (totalBars.length - 1 == currentIndex) {
              currentIndex = 0;
              setShowModel(false);
            }
          }
          chatbox.style.width = "0%";
        }
      }
    }

    // chatbox?.style.width = chatbox?.style.width + 10;
  };

  useEffect(() => {
    const id = setInterval(fetchData, 100);
    return () => clearInterval(id);
  }, [selectedStory, selectedID]);

  return (
    <>
      <Box sx={{ maxWidth: "120px" }}>
        <div
          className="story-container"
          onClick={(e) => showStoryDetailView(data, index)}
        >
          <AvatarWrapper sx={{ position: "absolute" }}>
            <Avatar src={data?.user?.avatar?.url} alt="avatar" />
          </AvatarWrapper>
          {/* {data?.stories?.edges?.map((story, sindex) => (
            <StoryImage src={story?.node?.file} alt="" key={sindex} />
            ))
            } */}
          {/* <StoryImage src={data?.stories?.edges[0]?.node?.file} alt="" /> */}
          {data?.stories?.edges[0]?.node?.file?.endsWith(".mp4") ? (
            <StoryVideo
              className={imgClass}
              onLoadedData={() => setimgClass("")}
            >
              <source
                src={data?.stories?.edges[0]?.node?.file}
                type="video/mp4"
              />
            </StoryVideo>
          ) : (
            <StoryImage
              src={data?.stories?.edges[0]?.node?.file}
              alt=""
              className={imgClass}
              onLoad={() => setimgClass("")}
            />
          )}
        </div>
        <StoryName sx={{ color: "#D7D7D7" }}>
          {data?.user?.fullName?.slice(0, 13)}
        </StoryName>
      </Box>
      {showModel && (
        <div className="story_modal" key={index} style={{ display: "block" }}>
          <div className="story_head">
            <div className="progressbar_grp">
              {selectedStory?.stories?.edges?.map((story, sindex) => (
                <div
                  className={"progressbar progressbar_" + index}
                  id={"progressbar_" + index + "_" + sindex}
                >
                  <span
                    id={"progressbar_" + index + "_" + sindex + "_data"}
                    class="sronly"
                    style={{ width: "0%" }}
                  ></span>
                </div>
              ))}
            </div>
            <div className="author">
              <img src={selectedStory?.user?.avatar?.url} />
              <div className="txt">
                <span>{selectedStory?.user?.fullName?.slice(0, 13)}</span>
                <small>
                  {moment
                    .utc(selectedStory?.stories?.edges[0]?.node?.createdDate)
                    .local()
                    .startOf("seconds")
                    .fromNow()}
                </small>
              </div>
            </div>
            <a className="close" onClick={hideStoryDetailView}>
              <img src="/images/close_btn.svg" />
            </a>
          </div>
          <div className="story_mid">
            <Carousel
              animation={"slide"}
              interval={10000}
              className="story_popup"
              duration={0}
            >
              {selectedStory?.stories?.edges?.map((story, sindex) => (
                <div class="carousel-item active">
                  {story?.node?.file?.endsWith(".mp4") ? (
                    <StoryVideoPlayer src={story?.node?.file} />
                  ) : (
                    <img src={story?.node?.file} alt="" />
                  )}
                </div>
              ))}
            </Carousel>
          </div>
          <div className="story_foot">
            <ul>
              <li>
                <img src="/images/like_ic.png" /> <span>Like</span>
              </li>
              <li>
                <img src="/images/cmnt_ic.png" /> <span>Comments</span>
              </li>
              <li>
                <img src="/images/gft_ic.png" /> <span>Send Gift</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

// const ShareStoryOptions = ({
//   show,
//   setShow,
//   selected,
//   setSelected,
//   onShare,
// }) => {
//   const sharingOptionsStyles = show
//     ? {
//         position: "absolute",
//         background: "#000000d1",
//         inset: 0,
//         borderRadius: "20px",
//       }
//     : {};

//   const ToggleButtonA = () => setSelected(1);
//   const ToggleButtonB = () => setSelected(2);
//   return (
//     <Box sx={sharingOptionsStyles}>
//       <ShareOptionsContainer>
//         {show ? (
//           <Box
//             className="texture-01-transparent"
//             sx={{ padding: "16px", borderRadius: "20px" }}
//           >
//             <Typography sx={{ fontWeight: 600, fontSize: "25px", mb: 2 }}>
//               Share Option
//             </Typography>
//             <RadionButtonsContainer>
//               <RadionButton
//                 title="Share Now"
//                 checked={selected === 1}
//                 onChange={ToggleButtonA}
//               />
//               <RadionButton
//                 title="Share Later"
//                 checked={selected === 2}
//                 onChange={ToggleButtonB}
//               />
//             </RadionButtonsContainer>
//             <button className="global-btn-3" onClick={onShare}>
//               SHARE
//             </button>
//           </Box>
//         ) : (
//           <button className="global-btn-3" onClick={() => setShow(true)}>
//             SHARE
//           </button>
//         )}
//       </ShareOptionsContainer>
//     </Box>
//   );
// };

// ============= Main =============
const MomentScreen = ({ userData, screenType }) => {
  const [show, setShow] = useState(false);
  // const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedShareOption, setSelectedShareOption] = useState(1);

  console.log(userData, "user Data");

  const [getAlUserMoments, { data, error, loading, refetch }] =
    useLazyQuery(GET_ALL_USER_MOMENTS);

  useEffect(() => {
    if (userData?.user?.id) {
      getAlUserMoments(
        screenType != "feed"
          ? {
              variables: {
                UserId: userData?.user?.id,
              },
            }
          : {}
      );
    }
  }, [userData?.user?.id]);

  const fetchData = () => {
    refetch();
  };

  //test
  useEffect(() => {
    const id = setInterval(fetchData, 3000);
    return () => clearInterval(id);
  }, [data, loading]);

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 52px)",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  let momentData = data?.allUserMoments?.edges;
  console.log("momentData profileMoment", momentData);

  const ShareStoryHandler = () => {
    //Just for now until we implement functionality
    setSelectedImage(null);
    setShow(false);
  };
  const shareOptionProps = {
    show,
    setShow,
    selected: selectedShareOption,
    setSelected: setSelectedShareOption,
    onShare: ShareStoryHandler,
  };

  const showMoment = (image) => {
    setSelectedImage(image);
    setShow(true);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ height: `calc(100vh - 120px)`, overflowY: "scroll" }}>
        {momentData?.map((item) => (
          <MomentContainer className="moment-container">
            <Box
              className="col-lg-12 col-12"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingInline: "4px !important",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1.5, mb: 1 }}>
                    <AvatarWrapper sx={{ margin: 0 }}>
                      {/* <Avatar src="/images/model24.png" alt="" sx={{ height: 45, width: 45, maxHeight: 45, maxWidth: 45 }} /> */}
                      <Avatar
                        src={item?.node?.user?.avatar?.url}
                        alt=""
                        sx={{
                          height: 45,
                          width: 45,
                          maxHeight: 45,
                          maxWidth: 45,
                        }}
                      />
                    </AvatarWrapper>
                    <Typography className="moment-heading">
                      <span style={{ color: "#DEBC63" }}>
                        {item?.node?.user?.fullName}{" "}
                      </span>
                      <span style={{ color: "#ffffff" }}>
                        has a shared a moment.
                      </span>
                      <section>
                        {moment
                          .utc(item?.node?.createdDate)
                          .local()
                          .startOf("seconds")
                          .fromNow()}
                      </section>
                    </Typography>
                  </Box>
                  <img alt="Menu" src="/images/threeDotsMenuIcon.svg" />
                </Box>

                <Box className="moment-content">
                  {item?.node?.momentDescription}
                </Box>
                <Box
                  className="col-lg-12 col-12"
                  sx={{ paddingInline: "4px !important", paddingTop: "5px" }}
                  onClick={() => {
                    showMoment(item?.node?.file);
                  }}
                >
                  {item?.node?.file?.endsWith(".mp4") ? (
                    <MomentVideoPlayer src={item?.node?.file} />
                  ) : (
                    <img
                      src={item?.node?.file}
                      alt=""
                      className="moment-image"
                    />
                  )}
                </Box>
              </Box>

              <MomentResponsesBar>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#3A3A3A",
                        display: "flex",
                        gap: "10px",
                        borderRadius: "30px",
                        background:
                          "linear-gradient(to right, #FBDB84, #B48E39)",
                        padding: "8px 12px 8px 12px",
                        minWidth: "85px",
                      }}
                    >
                      <img src="/images/profile_moment_heart.svg" alt="" />
                      <span>{item?.node?.like}</span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#3A3A3A",
                        display: "flex",
                        gap: "10px",
                        borderRadius: "30px",
                        background:
                          "linear-gradient(to right, #FBDB84, #B48E39)",
                        padding: "8px 12px 8px 12px",
                        minWidth: "76px",
                      }}
                    >
                      <img src="/images/profile_moment_comment.svg" alt="" />
                      <span>{item?.node?.comment}</span>
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#3A3A3A",
                      display: "flex",
                      gap: "10px",
                      borderRadius: "30px",
                      background: "linear-gradient(to right, #FBDB84, #B48E39)",
                      padding: "8px 16px 8px 16px",
                    }}
                  >
                    <img
                      src="/images/profile_moment_gift.svg"
                      alt=""
                      className="gift-icon"
                    />
                  </Typography>
                </Box>
              </MomentResponsesBar>
            </Box>
          </MomentContainer>
        ))}
      </Box>

      {selectedImage && (
        <ViewMoment image={selectedImage} setImage={setSelectedImage} />
      )}
    </Box>
  );
};

export default MomentScreen;
