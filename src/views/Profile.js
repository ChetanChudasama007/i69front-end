import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import TagsData, {
  EthinicityData,
  HeightData,
  PoliticData,
} from "./profileData/TagsData";
import { createChat } from "../mutation/createChat";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AboutAttribute, ImageIconButton } from "./MyProfile";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { followUser } from "../mutation/followUser";
import { unfollowUser } from "../mutation/unfollowUser";
import dynamic from "next/dynamic";
const MomentsTab = dynamic(() => import("./profile-tabs/MomentsTab"));
const Appbar = dynamic(() => import("../layouts/Appbar"));
const Navbar = dynamic(() => import("../layouts/Navbar"));
const ProfileCarousel = dynamic(() =>
  import("./profileCarousel/ProfileCarousel")
);
import { client } from "../ApolloClient/client";

const USER_DATA_QUERY = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      fullName
      email
      username
      age
      address
      politics
      coins
      purchaseCoins
      height
      religion
      education
      country
      countryFlag
      followersCount
      distance
      tags
      about
      interestedIn
      gender
      ethinicity
      music
      tvShows
      sportsTeams
      movies
      work
      city
      location
      avatarIndex
      about
      planname
      avatarPhotos {
        id
        url
        user
        type
      }
      userAttrTranslation {
        id
        name
      }

      isConnected
      followersCount
      followingCount
      followerUsers {
        username
        firstName
        lastName
        fullName

        id
        email
        isConnected
        avatarPhotos {
          id
          url
          user
        }
      }
      followingUsers {
        username
        firstName
        lastName
        fullName
        id
        email
        isConnected
        avatarPhotos {
          id
          url
          user
        }
      }

      userVisitorsCount
      userVisitingCount
      userVisitors {
        username
        firstName
        lastName
        fullName
        id
        email
        datetime
        followersCount
        followingCount
        isConnected
        avatarPhotos {
          id
          url
          user
        }
      }
      userVisiting {
        username
        id
        email
        datetimeVisiting
        followersCount
        followingCount
        firstName
        lastName
        fullName
        isConnected
        avatarPhotos {
          id
          url
          user
        }
      }
    }
  }
`;

const AGE_QUERY = gql`
  query picker {
    defaultPicker {
      agePicker {
        id
        value
      }
    }
  }
`;

const INTERESTED_IN_QUERY = gql`
  query picker {
    defaultPicker {
      interestedInPicker {
        id
        value
      }
    }
  }
`;

const TAGS_QUERY = gql`
  query defaultPicker {
    defaultPicker {
      politicsPicker {
        id
        value
      }
      tagsPicker {
        id
        value
      }
      ethnicityPicker {
        id
        value
      }
      heightsPicker {
        id
        value
      }
    }
  }
`;

// const MAIN_TAB_1,ABOUT_TAB = 'about';
// const MAIN_TAB_2,FEED_TAB = 'feed';
// const MAIN_TAB_3,MOMENTS_TAB = 'moments';
// const OtherTab1,FOLLOWERS_TAB = 'Followers';
// const OtherTab1,FOLLOWING_TAB = 'Following';

// const MainTabs = ['about', 'feed', 'moments'];
// const FollowersTabs=['followers','following'];

const FollowerListItem = ({ item, handleuserUnFollow }) => {
  const router = useRouter();

  const renderID = (id) => {
    router.push(`/profile/${id}`);
  };
  return (
    <Box
      className="transparent-black-background"
      sx={{ mb: 1, display: "flex", gap: 2 }}
      key={item}
    >
      <img
        src={item?.avatarPhotos[0]?.url}
        alt="model-img"
        style={{ width: "61px", height: "68px", borderRadius: "5px" }}
        onClick={() => renderID(item.id)}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#DEBC63", fontSize: "16px", fontWeight: 700 }}
            onClick={() => renderID(item.id)}
          >
            {item?.fullName}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            padding: "5px",
            color: "#DEBC63",
            backgroundColor: "#3A3A3A",
            borderRadius: "5px",
          }}
          onClick={() => handleuserUnFollow(item.id)}
        >
          Following
        </Typography>
      </Box>
    </Box>
  );
};

const FollowingListItem = ({ item, handleuserUnFollow }) => {
  const router = useRouter();

  const renderID = (id) => {
    router.push(`/profile/${id}`);
  };
  return (
    <Box
      className="transparent-black-background"
      sx={{ mb: 1, display: "flex", gap: 2 }}
      key={item}
    >
      <img
        src={item?.avatarPhotos[0]?.url}
        alt="model-img"
        style={{ width: "61px", height: "68px", borderRadius: "5px" }}
        onClick={() => renderID(item.id)}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#DEBC63", fontSize: "16px", fontWeight: 700 }}
            onClick={() => renderID(item.id)}
          >
            {item?.fullName}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            padding: "5px",
            color: "#DEBC63",
            backgroundColor: "#3A3A3A",
            borderRadius: "5px",
          }}
          onClick={() => handleuserUnFollow(item.id)}
        >
          Following
        </Typography>
      </Box>
    </Box>
  );
};

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("about");

  const router = useRouter();

  const [getUserData, { data, error, loading, refetch }] =
    useLazyQuery(USER_DATA_QUERY);
  const [getAgeData, { data: ageData, error: ageError, loading: ageLoading }] =
    useLazyQuery(AGE_QUERY);
  const [getInterestedData, { data: interestedInData }] =
    useLazyQuery(INTERESTED_IN_QUERY);
  const [
    getTagsData,
    { data: heightDataLoad, error: heightError, loading: hightLoading },
  ] = useLazyQuery(TAGS_QUERY);

  useEffect(() => {
    if (router.query.profileId) {
      getUserData({
        variables: {
          id: router.query.profileId,
        },
      });
    }
  }, [router.query.profileId]);

  useEffect(() => {
    getAgeData();
    getInterestedData();
    getTagsData();
  }, []);

  let ages = ageData?.defaultPicker?.agePicker || [];

  const fakeArray = ["music", "movies", "sport team", "tv shows"];
  const interestedIn =
    interestedInData?.defaultPicker?.interestedIn || fakeArray;

  if (loading || ageLoading || hightLoading)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  // console.log(data?.user)
  console.log("ages", ages);
  let userData = data?.user;
  console.log("userData", userData);
  let userId = userData?.username;
  console.log("userId", userId);

  let heightId = userData?.height;
  //  console.log(data)
  let heightData = heightDataLoad?.defaultPicker?.heightsPicker;
  const selectedHeight = heightData?.find((item) => item.id === heightId);

  const createRoomId = async () => {
    try {
      const response = await createChat({
        userName: userId,
      });

      if (response) {
        let roomId = response?.data?.createChat?.room?.id;
        console.log(roomId);
        localStorage.setItem("roomId", roomId);
        router.push("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleuserFollow = (selectedID) => async () => {
    const response = await followUser({
      userId: selectedID,
    });

    if (response) {
      console.log(response);
      refetch();
    }
  };

  const handleuserUnFollow = (selectedID) => async () => {
    const response = await unfollowUser({
      userId: selectedID,
    });

    if (response) {
      console.log(response);
      refetch();
    }
  };

  const confirmUnfollow = (userId) => {
    let text = "Are you sure you want to unFollow user ?";
    if (window.confirm(text) == true) {
      handleuserUnFollow(userId);
    } else {
    }
  };

  const handleRequestPrivateAccess = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await client.mutate({
      mutation: gql`
        mutation requestUserPrivatePhotos($receiverId: String!) {
          requestUserPrivatePhotos(receiverId: $receiverId) {
            msg
            success
            __typename
          }
        }
      `,
      variables: {
        receiverId: userData?.id,
      },
    });

    if(response?.data?.requestUserPrivatePhotos?.success){
      localStorage.setItem(`requested_${userData.id}`,true)
      // alert('Access Requested')
    }
    console.log(response, "Request Response");
  };

  const handleRequestCancel = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await client.mutate({
      mutation: gql`
        mutation cancelPrivatePhotoRequest($receiverId: String!) {
            cancelPrivatePhotoRequest(
              userId: $receiverId
            ) {
              message
              success
            }
        }
      `,
      variables: {
        receiverId: userData?.id,
      },
    });

    if(response?.data?.cancelPrivatePhotoRequest?.success){
      localStorage.removeItem(`requested_${userData.id}`)
    }
  };

  console.log(userData?.avatarPhotos, "User images");

  return (
    <div>
      {/* <Navbar /> */}
      <div className="my-profile-wrapper">
        <div className="relative-body profile-body">
          <div
            className="header-control h-c-g"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <i
              onClick={() => router.back()}
              className="fa fa-angle-left gold-icon"
              aria-hidden="true"
            ></i>
            <div style={{ flex: 1, alignItems: "center" }}>
              <h6
                style={{
                  width: "100%",
                  color: "black",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                {userData?.fullName}
              </h6>
            </div>

            <img src="/images/logo-right.jpg" />
          </div>

          <div className="row m-0 p-0 " style={{ maxHeight: "90vh" }}>
            <div className="user-img-parent-div col-lg-6 col-12 px-0">
              {/* <div className="image-icons">
                <div className="top-container">
                  <ImageIconButton icon="infoIcon" onlyIcon />
                  <ImageIconButton icon="goldenBell" onlyIcon />
                  <ImageIconButton icon="giftBox" onlyIcon />
                  <ImageIconButton icon="goldenHeart" onlyIcon />
                </div>
                <div className="relative">
                  <div
                    className="icon-buttons-container"
                    style={{ position: "absolute", bottom: "125px" }}
                  >
                    <div className="global-btn-4 subscribe-btn">
                      <img src="/images/platinumAvatarIcon.svg" alt="icon" />
                      Platinum
                    </div>
                    <div
                      className="global-btn-3 subscribe-btn"
                      onClick={createRoomId}
                    >
                      Chat
                    </div>
                    <ImageIconButton icon="locationIcon" value="2345KM" />
                    <div className="border-line" />
                    <ImageIconButton
                      icon="ageIcon"
                      value={
                        ages?.find((option) => option?.id === userData?.age)
                          ?.value
                      }
                    />
                    <div className="border-line" />
                    <ImageIconButton
                      icon="heightIcon"
                      value={selectedHeight?.value + "cm"}
                    />
                  </div>
                  <div className="country-flag-container">
                    <div
                      className="country-flag"
                      style={{ position: "absolute", bottom: "121px" }}
                    >
                      <img
                        src={userData?.countryFlag}
                        alt="flag"
                        width="63px"
                        height="34px"
                      />
                      <p>
                        {" "}
                        {userData?.city}- {userData?.country}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="headline mt-4">
                  <button
                    className="profile-btn followers-btn"
                    onClick={() => setCurrentTab("following")}
                  >
                    <span>Following</span>
                    <span className="font-weight-bold">
                      {userData?.followingCount}
                    </span>
                  </button>
                  {userData?.isConnected ? (
                    <img src="/images/viewIcon.svg" alt="bellIcon" />
                  ) : (
                    <button
                      className="profile-btn followers-btn"
                      style={{ width: "95px" }}
                      onClick={handleuserFollow(userData?.id)}
                    >
                      <AddCircleIcon
                        sx={{ color: "#3A3A3A", height: "18px", width: "18px" }}
                      />
                      <span>Follow</span>
                    </button>
                  )}
                  <button
                    className="profile-btn followers-btn"
                    onClick={() => setCurrentTab("followers")}
                  >
                    <span>Followers</span>
                    <span className="font-weight-bold">
                      {userData?.followersCount}
                    </span>
                  </button>
                </div>
              
              </div> */}
              <ProfileCarousel
                  userData={userData}
                  carouselData={userData?.avatarPhotos}
                  isUserProfile={true}
                  onRequestAccess={handleRequestPrivateAccess}
                  onRequestCancel={handleRequestCancel}
                >
                  <div className="top-container" style={{position:'absolute', top:'20px', right:'30px'}}>
                  <ImageIconButton icon="infoIcon" onlyIcon />
                  <ImageIconButton icon="goldenBell" onlyIcon />
                  <ImageIconButton icon="giftBox" onlyIcon />
                  <ImageIconButton icon="goldenHeart" onlyIcon />
                </div>
                <div className="relative">
                  <div
                    className="icon-buttons-container"
                    style={{ position: "absolute", bottom: "125px", left:'20px' }}
                  >
                    <div className="global-btn-4 subscribe-btn">
                      <img src="/images/platinumAvatarIcon.svg" alt="icon" />
                      Platinum
                    </div>
                    <div
                      className="global-btn-3 subscribe-btn"
                      onClick={createRoomId}
                    >
                      Chat
                    </div>
                    <ImageIconButton icon="locationIcon" value="2345KM" />
                    <div className="border-line" />
                    <ImageIconButton
                      icon="ageIcon"
                      value={
                        ages?.find((option) => option?.id === userData?.age)
                          ?.value
                      }
                    />
                    <div className="border-line" />
                    <ImageIconButton
                      icon="heightIcon"
                      value={selectedHeight?.value + "cm"}
                    />
                  </div>
                  <div className="country-flag-container">
                    <div
                      className="country-flag"
                      style={{ position: "absolute", bottom: "121px", right:'30px' }}
                    >
                      <img
                        src={userData?.countryFlag}
                        alt="flag"
                        width="63px"
                        height="34px"
                      />
                      <p>
                        {" "}
                        {userData?.city}- {userData?.country}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="headline mt-4">
                  <button
                    className="profile-btn followers-btn"
                    onClick={() => setCurrentTab("following")}
                  >
                    <span>Following</span>
                    <span className="font-weight-bold">
                      {userData?.followingCount}
                    </span>
                  </button>
                  {userData?.isConnected ? (
                    <img src="/images/viewIcon.svg" alt="bellIcon" />
                  ) : (
                    <button
                      className="profile-btn followers-btn"
                      style={{ width: "95px" }}
                      onClick={handleuserFollow(userData?.id)}
                    >
                      <AddCircleIcon
                        sx={{ color: "#3A3A3A", height: "18px", width: "18px" }}
                      />
                      <span>Follow</span>
                    </button>
                  )}
                  <button
                    className="profile-btn followers-btn"
                    onClick={() => setCurrentTab("followers")}
                  >
                    <span>Followers</span>
                    <span className="font-weight-bold">
                      {userData?.followersCount}
                    </span>
                  </button>
                </div>
                </ProfileCarousel>
              <div>
                
              </div>
            </div>
            {currentTab === "about" ||
            currentTab === "feed" ||
            currentTab === "moments" ? (
              <div
                className="tab-content col-lg-6 col-12 px-0"
                id="nav-tabContent"
              >
                <nav className="about-intrest">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      onClick={() => setCurrentTab("about")}
                      className={
                        currentTab === "about" ? "nav-link active" : "nav-link"
                      }
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#about"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      <span>About</span>
                    </a>
                    <img src="/images/goldenArrowRight.svg" alt="icon" />
                    <a
                      onClick={() => setCurrentTab("feed")}
                      className={
                        currentTab === "feed" ? "nav-link active" : "nav-link"
                      }
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#feed"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <span>Feed</span>
                    </a>
                    <img src="/images/goldenArrowRight.svg" alt="icon" />
                    <a
                      onClick={() => setCurrentTab("moments")}
                      className={
                        currentTab === "moments"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#moments"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Moments
                    </a>
                  </div>
                </nav>

                {currentTab === "about" && (
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="about-tab">
                      {/* <button onClick={createRoomId} className="mt-3 global-btn-2"><i className="fas fa-comment-dots" aria-hidden="true"></i> <span>SEND A MESSAGE</span> </button> */}
                      <div className="user-info-text">
                        <div className="transparent-black-background">
                          <span className="font-weight-bold">About</span>
                          <p className="">{userData?.about}</p>

                          <AboutAttribute
                            name="Age"
                            value={
                              ages?.find(
                                (option) => option?.id === userData?.age
                              )?.value
                            }
                          />

                          <HeightData height={userData?.height} />

                          <AboutAttribute name="Work" value={userData?.work} />

                          <AboutAttribute
                            name="Education"
                            value={userData?.education}
                          />
                          <span className="font-weight-bold text-uppercase mt-2">
                            looking for
                          </span>
                          <AboutAttribute
                            name="ROOMMATES with a"
                            value="women"
                          />

                          <AboutAttribute
                            name="NEW FRIENDS with a"
                            value="women"
                          />
                        </div>
                        <div className="transparent-black-background mt-2">
                          <span className="font-weight-bold text-uppercase mt-4 mb-1">
                            interest
                          </span>
                          <div className="interests-container">
                            {interestedIn?.map((interest, index) => (
                              <div
                                className="profile-btn"
                                key={interest + index}
                              >
                                {interest}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* <TagsData tags={userData?.tags} />
                    <PoliticData politics={userData?.politics} />
                    <EthinicityData ethenic={userData?.ethinicity} /> */}
                      </div>
                    </div>
                  </div>
                )}
                {currentTab === "intrests" && (
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="about-tab">
                      <h3>
                        {userData?.fullName} ,{" "}
                        {
                          ages?.find((option) => option?.id === userData?.age)
                            ?.value
                        }
                      </h3>
                      <p>{userData?.work}</p>
                      <button
                        onClick={createRoomId}
                        className="mt-3 global-btn-2"
                      >
                        <i
                          className="fas fa-comment-dots"
                          aria-hidden="true"
                        ></i>{" "}
                        <span>SEND A MESSAGE</span>{" "}
                      </button>
                      <div className="user-info-text mt-4">
                        <span className="gold-color font-weight-bold">
                          Intrests
                        </span>
                        <p>{userData?.about}</p>
                        <TagsData tags={userData?.tags} />
                        <PoliticData politics={userData?.politics} />
                        <EthinicityData ethenic={userData?.ethinicity} />
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTE: MomentsTab is using common component from HomeScreen for consistency */}

                {/*  =================== Moments Tab =================== */}
                {currentTab === "moments" && (
                  <MomentsTab userData={data} screenType={currentTab} />
                )}

                {/*  ===================== Feed Tab ===================== */}
                {currentTab === "feed" && (
                  <MomentsTab userData={data} screenType={currentTab} />
                )}

                {/*  ========================================================================= */}
              </div>
            ) : (
              <div
                className="tab-content col-lg-6 col-12 px-0"
                id="nav-tabContent"
              >
                <nav className="about-intrest others-profile">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      onClick={() => setCurrentTab("followers")}
                      className={
                        currentTab === "followers"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#followers"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      <span>Followers</span>
                    </a>
                    <img src="/images/goldenArrowRight.svg" alt="icon" />
                    <a
                      onClick={() => setCurrentTab("following")}
                      className={
                        currentTab === "following"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#following"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <span>Following</span>
                    </a>
                  </div>
                </nav>
                {currentTab === "followers" && (
                  <Box sx={{ padding: "4px 6px 4px 4px" }}>
                    {userData?.followerUsers?.map((item) => (
                      <FollowerListItem
                        item={item}
                        handleuserUnFollow={confirmUnfollow}
                      />
                    ))}
                  </Box>
                )}
                {currentTab === "following" && (
                  <Box sx={{ padding: "4px 6px 4px 4px" }}>
                    {userData?.followingUsers?.map((item) => (
                      <FollowingListItem
                        item={item}
                        handleuserUnFollow={confirmUnfollow}
                      />
                    ))}
                  </Box>
                )}
              </div>
            )}

            <Appbar />

            <div id="lightbox">
              <i className="fas fa-times"></i>
              <img src="" alt="" id="gal-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
