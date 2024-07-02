import { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { AllMomentsList, ViewMoment } from "../home/HomeScreen";
import { CircularProgress, Avatar } from "@mui/material";

const videoExtensions = /\.(mp4|webm|ogg|ogv|mov|avi|wmv|flv)$/i;

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

const GET_MOMENT_COMMENTS = gql`
  query getMomentComments($pk: Int!) {
    getMomentComments(momentPk: $pk) {
      id
      user {
        username
        avatarPhotos {
          url
          user
          id
        }
        username
        firstName
        lastName
        fullName
        email
        gender
      }
      commentDescription
      momemt {
        momentDescription
        Title
        createdDate
        pk
      }
      createdDate
      pk
      replys {
        commentDescription
        user {
          username
          avatarPhotos {
            url
            user
            id
          }
          username
          firstName
          lastName
          fullName
          email
          gender
        }
      }
      like
      report
      __typename
    }
  }
`;

const MomentsTab = ({ userData, screenType }) => {
  const [showMomentImage, setShowMomentImage] = useState(null);
  const [ifMomentImage, setIfMomentImage] = useState(null);
  const [showMomentImageState, setShowMomentImageState] = useState(false);
  const [showFullMomentImageState, setShowFullMomentImageState] =
    useState(false);
  const [momentPkforComments, setMomentPkforComments] = useState();
  const [showComment, setShowComment] = useState(true);
  const [getAlUserMoments, { data, error, loading, refetch }] =
    useLazyQuery(GET_ALL_USER_MOMENTS);

    const [getMomentComments, { data: commentsData }] =
    useLazyQuery(GET_MOMENT_COMMENTS);

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

  useEffect(() => {
    if (momentPkforComments) {
      getMomentComments({
        variables: {
          pk: momentPkforComments,
        },
      });
    }
  }, [momentPkforComments]);

  let momentData = data?.allUserMoments?.edges;
  console.log("momentData in MomentsTab", momentData);

  const fetchData = () => {
    refetch();
  };

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

  return (
    <>
      <AllMomentsList
        momentData={momentData}
        smallScreen
        sx={{ height: "calc(100vh - 125px)" }}
        setIfMomentImage={setIfMomentImage}
        setShowMomentImageState={setShowMomentImageState}
        setShowFullMomentImageState={setShowFullMomentImageState}
        setMomentPkforComments={setMomentPkforComments}
      />
      {showMomentImage && (
        <ViewMoment image={showMomentImage} setImage={setShowMomentImage} />
      )}
      <div
        className={
          showMomentImageState
            ? "gift_image_preview_modal show align-items-center justify-content-center"
            : "gift_image_preview_modal"
        }
        style={{
          width: "70%",
          top: "31vh",
          left: "10%",
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src="/images/close_ic.svg"
            alt="close/icon"
            width={25}
            height={25}
            className="gift_image_preview_modal_button"
            onClick={() => {
              setShowMomentImageState(false);
              setIfMomentImage(null);
            }}
          />
        </div>
        <div
          className="gift_image_preview_modal_image"
          data-testid="image_modal"
          // onClick={() => setShowMomentImageState(false)}
        >
          {ifMomentImage && !videoExtensions.test(ifMomentImage) ? (
            <img src={ifMomentImage} width={"55%"} height={"auto"} />
          ) : (
            <>
              {ifMomentImage && (
                <video
                  controls={true}
                  muted={true}
                  loop
                  autoPlay={true}
                  controlsList="nodownload"
                >
                  <source src={ifMomentImage} type="video/mp4" />
                </video>
              )}
            </>
          )}
        </div>
        {showComment && (
          <div className="moment-comments">
            <h4
              style={{
                textAlign: "center",
                borderBottom: "1px solid white",
                color: "white",
              }}
            >
              Comments
            </h4>
            {commentsData?.getMomentComments.length ? (
              <div className="user-comments">
                {commentsData?.getMomentComments?.map((comment) => (
                  <>
                    {comment && (
                      <div className="comment">
                        <span className="user-info">
                          <Avatar src={comment?.user?.avatarPhotos[0]?.url} />
                          <span>{comment?.user?.fullName}</span>
                        </span>
                        <span className="comment-desc">
                          <span>{comment?.commentDescription}</span>{" "}
                          <span className="comment-time">
                            {new Date(comment?.createdDate).toLocaleString(
                              "en-US",
                              {
                                dateStyle: "medium",
                                timeStyle: "medium",
                              }
                            )}
                          </span>
                        </span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <p className="no-comments">No comments</p>
            )}
          </div>
        )}
        <button
          style={{
            all: "unset",
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: "3",
            borderRadius: "6px",
            background: "white",
            cursor: "pointer",
            fontSize: "14px",
            padding: "6px 12px",
          }}
          onClick={() => setShowComment(!showComment)}
        >
          {showComment ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      <div
        className={
          showFullMomentImageState
            ? "full_gift_image_preview_modal show align-items-center justify-content-center"
            : "full_gift_image_preview_modal"
        }
        style={{
          width: "calc(100vw - 245px)",
          top: "65px",
          left: "240px",
          zIndex: "999",
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src="/images/close_ic.svg"
            alt="close/icon"
            className="full_gift_image_preview_modal_button"
            width={25}
            height={25}
            onClick={() => {
              setIfMomentImage(null);
              setShowFullMomentImageState(false);
            }}
          />
        </div>
        <div
          className="full_gift_image_preview_modal_image"
          data-testid="full_image_modal"
          // onClick={() => setShowFullMomentImageState(false)}
        >
          {ifMomentImage && !videoExtensions.test(ifMomentImage) ? (
            <img src={ifMomentImage} width={"55%"} height={"auto"} />
          ) : (
            <>
              {ifMomentImage && (
                <video
                  controls={true}
                  muted={true}
                  loop
                  autoPlay={true}
                  controlsList="nodownload"
                >
                  <source src={ifMomentImage} type="video/mp4" />
                </video>
              )}
            </>
          )}
        </div>
        {showComment && (
          <div className="moment-comments">
            <h4
              style={{
                textAlign: "center",
                borderBottom: "1px solid white",
                color: "white",
              }}
            >
              Comments
            </h4>
            {commentsData?.getMomentComments.length ? (
              <div className="user-comments">
                {commentsData?.getMomentComments?.map((comment) => (
                  <div className="comment">
                    <span className="user-info">
                      <Avatar src={comment?.user?.avatarPhotos[0]?.url} />
                      <span>{comment?.user?.fullName}</span>
                    </span>
                    <span className="comment-desc">
                      <span>{comment?.commentDescription}</span>{" "}
                      <span className="comment-time">
                        {new Date(comment?.createdDate).toLocaleString(
                          "en-US",
                          {
                            dateStyle: "medium",
                            timeStyle: "medium",
                          }
                        )}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-comments">No comments</p>
            )}
          </div>
        )}
        <button
          style={{
            all: "unset",
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: "3",
            borderRadius: "6px",
            background: "white",
            cursor: "pointer",
            fontSize: "14px",
            padding: "6px 12px",
          }}
          onClick={() => setShowComment(!showComment)}
        >
          {showComment ? "Hide Comments" : "Show Comments"}
        </button>
      </div>
    </>
  );
};

export default MomentsTab;
