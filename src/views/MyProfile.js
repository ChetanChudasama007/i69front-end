import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import TagsData, { AccountDelete, HeightData } from "./profileData/TagsData";
import { Box, CircularProgress, Typography } from "@mui/material";
import Appbar from "../layouts/Appbar";
import { Edit } from "@material-ui/icons";
import { unfollowUser } from "../mutation/unfollowUser";
import { followUser } from "../mutation/followUser";
import {Img} from 'react-image';
import dynamic from "next/dynamic";
import moment from "moment";
const Navbar = dynamic(() => import("../layouts/Navbar"), { ssr: false });
const BalanceModal = dynamic(() => import("./userProfile/BalanceModal"));
const SubscribeModal = dynamic(() => import("./userProfile/SubscribeModal"));
const BuySubscription = dynamic(() => import("./userProfile/BuySubscription"));
const ProfileCarousel = dynamic(() =>
  import("./profileCarousel/ProfileCarousel")
);
const MomentsTab = dynamic(() => import("./profile-tabs/MomentsTab"));

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
      giftCoins
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

const CHECK_USER_SUBSCRIPTION = gql`
  query UserSubscription {
    userSubscription {
      package {
        id
        name
        description
      }
      plan {
        id
        title
        priceInCoins
        isOnDiscount
        isActive
        dicountedPriceInCoins
        createdAt
        updatedAt
      }
      isActive
      startsAt
      endsAt
      isCancelled
      cancelledAt
    }
  }
`;

export const AboutAttribute = ({ name, value }) => {
  if (!name || !value) return <></>;
  return (
    <div className="about-attribute">
      <span className="light-gold-color font-weight-bold">{name} : </span>
      <div className="profile-btn">{value}</div>
    </div>
  );
};

export const ImageIconButton = ({
  icon,
  name,
  value,
  onlyIcon = false,
  onClick,
}) => {
  return (
    <div className="icon-button" onClick={onClick}>
      <img
        src={`/images/${icon}.svg`}
        alt={icon}
        width="40px"
        height={"auto"}
      />
      {!onlyIcon && (
        <span>
          <p>{name}</p>
          <p>{value}</p>
        </span>
      )}
    </div>
  );
};

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
          onClick={handleuserUnFollow(item.id)}
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
          onClick={handleuserUnFollow(item.id)}
        >
          Following
        </Typography>
      </Box>
    </Box>
  );
};

const VisitorListItem = ({
  userData,
  item,
  type,
  handleuserFollow,
  handleuserUnFollow,
}) => {
  const router = useRouter();

  const renderID = (id) => {
    router.push(`/profile/${id}`);
  };

  const isFollowing = userData?.followingUsers?.find(
    (user) => user?.id === item?.id
  );
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
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"5px"}
        >
          <Typography
            sx={{ color: "#DEBC63", fontSize: "16px", fontWeight: 700 }}
            onClick={() => renderID(item.id)}
          >
            {item?.fullName}
          </Typography>
          <Typography
            sx={{ color: "#DEBC63", fontSize: "16px", fontWeight: 700 }}
          >
            Following - {item?.followingCount} | Followers -{" "}
            {item?.followersCount}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Typography
            sx={{ color: "#DEBC63", fontSize: "16px", fontWeight: 700 }}
          >
            {moment(
              type === "visitor" ? item?.datetime : item?.datetimeVisiting
            ).format("DD MMM, YYYY | hh:mm A")}
          </Typography>
          {isFollowing ? (
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                padding: "5px",
                color: "#DEBC63",
                backgroundColor: "#3A3A3A",
                borderRadius: "5px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleuserUnFollow(item.id)}
            >
              Following
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                padding: "5px",
                color: "#DEBC63",
                backgroundColor: "#3A3A3A",
                borderRadius: "5px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleuserFollow(item.id)}
            >
              Follow
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const MyProfile = () => {
  const [currentTab, setCurrentTab] = useState("about");
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [userId, setUserId] = useState();
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [showUserBalance, setShowUserBalance] = useState(false);

  //For testing not working changes on live
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
    if (router.asPath.includes("#buy-subcription")) {
      setOpenSubscriptionModal(true);
    }
    const test = localStorage.getItem("test");
    console.log("test", test);
    if (test) setTesting(test === "1");
  }, []);

  const router = useRouter();

  const [getUserData, { data, error, loading, refetch: refetchUserData }] =
    useLazyQuery(USER_DATA_QUERY);
  const [getAgeData, { data: ageData, error: ageError, loading: ageLoading }] =
    useLazyQuery(AGE_QUERY);
  const [getInterestedData, { data: interestedInData }] =
    useLazyQuery(INTERESTED_IN_QUERY);
  const [
    getHeightData,
    { data: heightDataLoad, error: heightError, loading: hightLoading },
  ] = useLazyQuery(TAGS_QUERY);
  const [
    getUserSubscription,
    { data: userSubscription, refetch: refetchUserSubscription },
  ] = useLazyQuery(CHECK_USER_SUBSCRIPTION);

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
    getAgeData();
    getInterestedData();
    getHeightData();
    getUserSubscription();
  }, []);

  let ages = ageData?.defaultPicker?.agePicker || [];

  const fakeArray = ["music", "movies", "sport team", "tv shows"];

  const interestedIn =
    interestedInData?.defaultPicker?.interestedIn || fakeArray;

  const userSubscriptionData = userSubscription?.userSubscription;
  console.log("userSubscriptionData", userSubscriptionData);

  // console.log(data?.user)
  let userData = data?.user;
  // console.log("userData",userData)

  let heightId = userData?.height;
  //  console.log(data)
  let heightData = heightDataLoad?.defaultPicker?.heightsPicker;
  const selectedHeight = heightData?.find((item) => item.id === heightId);

  const handleuserUnFollow = (selectedID) => async () => {
    if (window.confirm("are you sure you want to unfollow user")) {
      const response = await unfollowUser({
        userId: selectedID,
      });

      if (response) {
        console.log(response);
        refetchUserData();
      }
    }
  };

  const handleuserFollow = (selectedID) => async () => {
    const response = await followUser({
      userId: selectedID,
    });

    if (response) {
      console.log(response);
      refetchUserData();
    }
  };

  console.log("userData", userData);
  console.log("openSubscriptionModal", openSubscriptionModal);

  //Handler Functions
  const closeSubscribe = () => setOpenSubscribe(false);
  const closeUserBalance = () => setShowUserBalance(false);

  const handleBuySubscriptionModal = () => {
    console.log("handleBuySubscriptionModal");
    setOpenSubscriptionModal(true);
    closeSubscribe();
  };

  const afterSubscriptionHandler = () => {
    refetchUserData();
    refetchUserSubscription();
  };

  return (
    <div>
      <Navbar setOpenSubscriptionModal={setOpenSubscriptionModal} />
      <div
        className={`${testing ? "my-profile-wrapper-2" : "my-profile-wrapper"}`}
      >
        <div className="relative-body profile-body" style={{ zIndex: 1 }}>
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
                {userData?.fullName || ""}
              </h6>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Edit
                onClick={() => router.push("/edit")}
                style={{
                  color: "black",
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
              />
              <Img
                src="/images/logo-right.jpg"
                alt="i69"
                width={40}
                height={40}
                style={{ width: "40px", height: "auto" }}
              />
            </div>
          </div>

          <div className="row m-0 p-0 " style={{ maxHeight: "90vh" }}>
            {(loading || ageLoading) && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  height: "100vh",
                  alignItems: "center",
                  background: "transparent",
                }}
              >
                <CircularProgress />
              </div>
            )}
            <div className="user-img-parent-div col-lg-6 col-12 px-0">
              <div className="image-icons">
                <div className="top-container">
                  <ImageIconButton icon="goldenEditIcon" onlyIcon />
                  <ImageIconButton icon="goldenBell" onlyIcon />
                  <ImageIconButton icon="giftBox" onlyIcon />
                  <ImageIconButton icon="goldenHeart" onlyIcon />
                </div>
                <div className="relative">
                  <div
                    className="icon-buttons-container"
                    style={{ position: "absolute", bottom: "125px" }}
                  >
                    <ImageIconButton
                      icon="walletIcon"
                      name="wallet"
                      value={userData?.giftCoins}
                    />
                    <div className="border-line" />
                    <ImageIconButton
                      icon="coinIcon"
                      name="coin"
                      value={userData?.purchaseCoins}
                      onClick={() => setShowUserBalance(true)}
                    />
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
                    {/* <button className={userSubscriptionData?.package?.name === 'PLATINUM' ? "global-btn-4 subscribe-btn" : "global-btn-3 subscribe-btn"} */}
                    <button
                      className="global-btn-3 subscribe-btn"
                      onClick={() => setOpenSubscribe(true)}
                      style={
                        userSubscriptionData?.isActive &&
                        userSubscriptionData?.package?.id !== 2
                          ? {
                              backgroundImage: "url(/images/platinum_bg.png)",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }
                          : {}
                      }
                    >
                      {userSubscriptionData?.isActive ? (
                        userSubscriptionData?.package?.name
                      ) : (
                        <>
                          <img src="/images/bellIcon.svg" alt="bellIcon" />
                          Subscribe
                        </>
                      )}
                    </button>
                  </div>
                  <div className="country-flag-container">
                    <div
                      className="country-flag"
                      style={{ position: "absolute", bottom: "121px" }}
                    >
                      {userData?.countryFlag && (
                        <Img
                          src={userData?.countryFlag}
                          alt="flag"
                          width={63}
                          height={34}
                        />
                      )}
                      <p>
                        {" "}
                        {userData?.city}- {userData?.country}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="headline interest-sec"
                  style={{ position: "absolute", bottom: "46px" }}
                >
                  <div
                    className="global-btn-3 font-weight-light"
                    onClick={() => setCurrentTab("following")}
                  >
                    <span>Following</span>
                    <span className="font-weight-bold">
                      {userData?.followingCount}
                    </span>
                  </div>
                  <img
                    src="/images/viewIcon.svg"
                    alt="bellIcon"
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrentTab("visitors")}
                  />
                  <div
                    className="global-btn-3 font-weight-light"
                    onClick={() => setCurrentTab("followers")}
                  >
                    <span>Followers</span>
                    <span className="font-weight-bold">
                      {userData?.followersCount}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <ProfileCarousel
                  carouselData={userData?.avatarPhotos}
                  isUserProfile={false}
                />
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
                    {/* <a onClick={()=>setCurrentTab('intrests')}  className={(currentTab === 'intrests'?'nav-link active':'nav-link')} id="nav-profile-tab" data-toggle="tab" href="#intrests" role="tab"
                       aria-controls="nav-profile" aria-selected="false">INTERESTS</a> */}
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
                      href="#moment"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <span>Moments</span>
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
                      {/* <h3>About <span>{userData?.fullName}</span></h3>
                   <p>{userData?.work}</p> */}
                      {/* <button onClick={createRoomId} className="mt-3 global-btn-2"><i className="fas fa-comment-dots" aria-hidden="true"></i> <span>SEND A MESSAGE</span> </button> */}
                      <div className="user-info-text">
                        {/* <LocationComponent/> */}
                        <div
                          className="transparent-black-background"
                          style={{ padding: "9px 11px 85px 19px" }}
                        >
                          <span className="font-weight-bold">About</span>
                          <p className="">{userData?.about}</p>
                          {/* <span className="gold-color font-weight-bold">Address</span>
                           <p>{userData?.city}, {userData?.country}</p> */}
                          {/* <div style={{display: 'flex'}}>
                               <span className='lgold-color font-weight-bold'>Age : </span>
                               <p>{ages?.find(option => option?.id === userData?.age)?.value}</p>
                           </div> */}

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
                        <div
                          className="transparent-black-background mt-2"
                          style={{ padding: "18px 50px 20px 21px" }}
                        >
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
                        {/* <TagsData tags={userData?.tags}/> */}

                        <div className="user-badge">
                          {userData &&
                            userData?.sportsTeams?.map((item, index) => (
                              <button key={index} className="profile-btn">
                                {item}
                              </button>
                            ))}

                          <AccountDelete userId={userId} />
                        </div>
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
                      {/* <button onClick={createRoomId} className="mt-3 global-btn-2"><i className="fas fa-comment-dots" aria-hidden="true"></i> <span>SEND A MESSAGE</span> </button> */}
                      <div className="user-info-text mt-4">
                        <span className="gold-color font-weight-bold">
                          Intrests
                        </span>
                        <p>{userData?.about}</p>
                        <TagsData tags={userData?.tags} />

                        <span className="gold-color font-weight-bold">
                          Movies
                        </span>
                        <div className="user-badge  ">
                          {userData &&
                            userData?.movies?.map((item, index) => (
                              <button key={index} className="global-btn-3">
                                {item}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : currentTab === "followers" || currentTab === "following" ? (
              <div
                className="tab-content col-lg-6 col-12 px-0"
                id="nav-tabContent"
              >
                <nav className="about-intrest interest-sec others-profile">
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
                        handleuserUnFollow={handleuserUnFollow}
                      />
                    ))}
                  </Box>
                )}
                {currentTab === "following" && (
                  <Box sx={{ padding: "4px 6px 4px 4px" }}>
                    {userData?.followingUsers?.map((item) => (
                      <FollowingListItem
                        item={item}
                        handleuserUnFollow={handleuserUnFollow}
                      />
                    ))}
                  </Box>
                )}
              </div>
            ) : (
              <div
                className="tab-content col-lg-6 col-12 px-0"
                id="nav-tabContent"
              >
                <nav className="about-intrest interest-sec others-profile">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      onClick={() => setCurrentTab("visitors")}
                      className={
                        currentTab === "visitors"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#visitors"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      <span>Visitors</span>
                    </a>
                    <img src="/images/goldenArrowRight.svg" alt="icon" />
                    <a
                      onClick={() => setCurrentTab("visited")}
                      className={
                        currentTab === "visited"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#visited"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <span>Visited</span>
                    </a>
                  </div>
                </nav>
                {currentTab === "visitors" && (
                  <Box sx={{ padding: "4px 6px 4px 4px" }}>
                    {userData?.userVisitors?.map((item) => (
                      <VisitorListItem
                        item={item}
                        type={"visitor"}
                        handleuserFollow={handleuserFollow}
                        userData={userData}
                        handleuserUnFollow={handleuserUnFollow}
                      />
                    ))}
                  </Box>
                )}
                {currentTab === "visited" && (
                  <Box sx={{ padding: "4px 6px 4px 4px" }}>
                    {userData?.userVisiting?.map((item) => (
                      <VisitorListItem
                        item={item}
                        type={"visited"}
                        handleuserFollow={handleuserFollow}
                        userData={userData}
                        handleuserUnFollow={handleuserUnFollow}
                      />
                    ))}
                  </Box>
                )}
              </div>
            )}
            {showUserBalance && (
              <BalanceModal
                coins={userData?.purchaseCoins}
                close={closeUserBalance}
              />
            )}

            <Appbar />

            <div id="lightbox">
              <i className="fas fa-times"></i>
              <img src="" alt="" id="gal-img" />
            </div>
          </div>
        </div>
      </div>

      {openSubscribe && (
        <SubscribeModal
          data={userSubscriptionData}
          handleBuySubscriptionModal={handleBuySubscriptionModal}
          close={closeSubscribe}
        />
      )}

      {openSubscriptionModal && (
        <BuySubscription
          close={setOpenSubscriptionModal}
          currentPackage={userSubscriptionData?.package?.name}
          afterSubscriptionHandler={afterSubscriptionHandler}
        />
      )}
    </div>
  );
};

export default MyProfile;
