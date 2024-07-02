import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import MostActiveUSer, { PopularUser, RandomUsers } from "./SearchPageData";
import Navbar from "../layouts/Navbar";
import { useRouter } from "next/router";
import InterestedInSection from "./interestedIn/InterestedInSection";
import BuySubscription from "./userProfile/BuySubscription";
import { Alert, Box } from "@mui/material";

const HIDE_INTERESTED_IN_SUBSCRIPTION_QUERY = gql`
  subscription HideInterestedInSubscription {
    hideInterestedInSubscription {
      userInterestedinRegion {
        id
        userInterestedIn {
          id
          categoryName
          createdAt
          strName
        }
      }
    }
  }
`;

export const UNLOCK_24HOURS_FOR_RANDOM_USERS_QUERY = gql`
  query randomUsers {
    randomUsers(autoDeductCoin: 5) {
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
      user {
        id
        username
        email
        avatarPhotos {
          url
        }
        fullName
        age
      }
    }
  }
`;

export const UNLOCK_24HOURS_FOR_MOST_ACTIVE_USERS_QUERY = gql`
  query mostActiveUsers {
    mostActiveUsers(autoDeductCoin: 5) {
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
      user {
        id
        username
        email
        avatarPhotos {
          url
        }
        fullName
        age
      }
    }
  }
`;

export const UNLOCK_24HOURS_FOR_POPULAR_USERS_QUERY = gql`
  query popularUsers {
    popularUsers(autoDeductCoin: 5) {
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
      user {
        id
        username
        email
        avatarPhotos {
          url
        }
        fullName
        age
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

const Search = () => {
  const [currentTab, setCurrentTab] = useState("random");
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [unlock24HoursFunError, setUnlock24HoursFunError] = useState();
  const contentRef = useRef(null);
  const backgroundContainerRef = useRef(null);
  const [dynamicHight, setDynamicHight] = useState(false);
  const [isBuySubscriptionPackage, setBuySubscriptionPackage] = useState(false);
  //For User Interests Sections
  const [interestedIn, setInterestedIn] = useState({
    relationType: "",
    gender: "",
  });
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [
    getUserSubscription,
    { data: userSubscription, refetch: refetchUserSubscription },
  ] = useLazyQuery(CHECK_USER_SUBSCRIPTION);

  const [
    getUnlockRandomUserFor24hours,
    {
      data: unlockRandomUserFor24Hours,
      errors: randomUserError,
      loading: randomUserLoader,
    },
  ] = useLazyQuery(UNLOCK_24HOURS_FOR_RANDOM_USERS_QUERY, {
    errorPolicy: "all",
  });

  const [
    getUnlockMostActiveUserFor24hours,
    {
      data: unlockMostActiveUserFor24Hours,
      errors: mostActiveUserError,
      loading: mostActiveUserLoader,
    },
  ] = useLazyQuery(UNLOCK_24HOURS_FOR_MOST_ACTIVE_USERS_QUERY, {
    errorPolicy: "all",
  });

  const [
    getUnlockPopularUserFor24hours,
    {
      data: unlockPopularUserFor24Hours,
      errors: popularUserError,
      loading: popularUserLoader,
    },
  ] = useLazyQuery(UNLOCK_24HOURS_FOR_POPULAR_USERS_QUERY, {
    errorPolicy: "all",
  });

  useEffect(() => {
    if (
      (randomUserError && randomUserError.length > 0) ||
      (mostActiveUserError && mostActiveUserError.length > 0) ||
      (popularUserError && popularUserError.length > 0)
    ) {
      setUnlock24HoursFunError(
        (randomUserError &&
          randomUserError.length > 0 &&
          randomUserError[0]?.message) ||
          (mostActiveUserError &&
            mostActiveUserError.length > 0 &&
            mostActiveUserError[0]?.message) ||
          (popularUserError &&
            popularUserError.length > 0 &&
            popularUserError[0]?.message)
      );
      setTimeout(() => {
        setUnlock24HoursFunError("");
      }, 2000);
    }
  }, [randomUserError, mostActiveUserError, popularUserError]);

  const afterSubscriptionHandler = () => {
    setBuySubscriptionPackage(true);
    refetchUserSubscription();
  };

  // Handler function for user interests
  const interestsPickerHandler = ({ relationValue, gender }) => {
    setInterestedIn((prevState) => ({
      ...prevState,
      relationType: relationValue,
      gender: gender,
    }));
  };

  // Handler function to update form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchKey(value);
  };

  const interesetedInIDData = [
    { category: "SERIOUS_RELATIONSHIP", gender: 1, value: 1 },
    { category: "SERIOUS_RELATIONSHIP", gender: 2, value: 2 },
    { category: "SERIOUS_RELATIONSHIP", gender: 3, value: 3 },
    { category: "CAUSAL_DATING", gender: 1, value: 4 },
    { category: "CAUSAL_DATING", gender: 2, value: 5 },
    { category: "CAUSAL_DATING", gender: 3, value: 6 },
    { category: "NEW_FRIENDS", gender: 1, value: 7 },
    { category: "NEW_FRIENDS", gender: 2, value: 8 },
    { category: "NEW_FRIENDS", gender: 3, value: 9 },
    { category: "ROOM_MATES", gender: 1, value: 10 },
    { category: "ROOM_MATES", gender: 2, value: 11 },
    { category: "ROOM_MATES", gender: 3, value: 12 },
    { category: "BUSINESS_CONTACTS", gender: 1, value: 13 },
    { category: "BUSINESS_CONTACTS", gender: 2, value: 14 },
    { category: "BUSINESS_CONTACTS", gender: 3, value: 15 },
  ];

  const selectedData = interesetedInIDData.filter(
    (interestedCat) =>
      interestedCat.category === interestedIn?.relationType &&
      interestedCat.gender === interestedIn?.gender
  );
  const selectedCategory = selectedData[0]?.value;
  console.log(interestedIn);

  useEffect(() => {
    getUserSubscription();
  }, []);

  const userSubscriptionData = userSubscription?.userSubscription;

  const handleSubscribeFor24Hours = () => {
    switch (currentTab) {
      case "random":
        getUnlockRandomUserFor24hours();
        return;

      case "popular":
        getUnlockPopularUserFor24hours();
        return;

      case "mostactive":
        getUnlockMostActiveUserFor24hours();
        return;

      default:
        getUnlockRandomUserFor24hours();
        return;
    }
  };

  useEffect(() => {
    if (contentRef.current && backgroundContainerRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      backgroundContainerRef.current.style.height = `${contentHeight + 400}px`;
      setDynamicHight(false);
    }
  }, [dynamicHight]);

  return (
    <>
      <div>
        {/* <Navbar /> */}
        <div className="content_wrapper">
          {interestedIn?.relationType &&
          interestedIn?.gender &&
          selectedCategory ? (
            <>
              <div className="fixed-top search_header">
                <div className="header-control header-gold-wrapper">
                  <i
                    onClick={() => router.back()}
                    className="fa fa-angle-left text-white"
                    aria-hidden="true"
                  ></i>
                  <h5 className="pgtitle">Search Results</h5>
                  <div className="search-box-wrapper">
                    <div className="search-box">
                      <i className="search-icon fa fa-search"></i>
                      <input
                        className="search-input"
                        type="text"
                        value={searchKey}
                        placeholder="Search by user's name"
                        width="100%"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="profile_avtar">
                    <img
                      src="./images/logo-right.jpg"
                      style={{ height: "30px", width: "30px" }}
                    />
                  </div>
                </div>
                <ul
                  className="nav nav-tabs search-tab"
                  id="myTab"
                  role="tablist"
                >
                  <li
                    onClick={() => setCurrentTab("random")}
                    className="nav-item navitemactive"
                    role="presentation"
                    style={{ cursor: "pointer" }}
                  >
                    <a
                      className={
                        currentTab === "random" ? "nav-link active" : "nav-link"
                      }
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      RANDOM
                    </a>
                  </li>
                  <li
                    onClick={() => setCurrentTab("popular")}
                    className="nav-item"
                    role="presentation"
                    style={{ cursor: "pointer" }}
                  >
                    <a
                      className={
                        currentTab === "popular"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id="profile-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      POPULAR
                    </a>
                  </li>
                  <li
                    onClick={() => setCurrentTab("mostactive")}
                    className="nav-item"
                    role="presentation"
                    style={{ cursor: "pointer" }}
                  >
                    <a
                      className={
                        currentTab === "mostactive"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id="contact-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      MOST ACTIVE
                    </a>
                  </li>
                </ul>
              </div>
              <div
                className="tab-content user-search-area p-2"
                ref={backgroundContainerRef}
              >
                {currentTab === "random" && (
                  <div ref={contentRef}>
                    <RandomUsers
                      searchKey={searchKey}
                      interestedInData={interestedIn}
                      selectedCategory={selectedCategory}
                      setOpenSubscriptionModal={setOpenSubscriptionModal}
                      unlockRandomUserFor24Hours={unlockRandomUserFor24Hours}
                      setDynamicHight={setDynamicHight}
                      isBuySubscriptionPackage={isBuySubscriptionPackage}
                    />
                  </div>
                )}

                {currentTab === "popular" && (
                  <div ref={contentRef}>
                    <PopularUser
                      searchKey={searchKey}
                      interestedInData={interestedIn}
                      selectedCategory={selectedCategory}
                      setOpenSubscriptionModal={setOpenSubscriptionModal}
                      unlockPopularUserFor24Hours={unlockPopularUserFor24Hours}
                      setDynamicHight={setDynamicHight}
                      isBuySubscriptionPackage={isBuySubscriptionPackage}
                    />
                  </div>
                )}

                {currentTab == "mostactive" && (
                  <div ref={contentRef}>
                    <MostActiveUSer
                      searchKey={searchKey}
                      interestedInData={interestedIn}
                      selectedCategory={selectedCategory}
                      setOpenSubscriptionModal={setOpenSubscriptionModal}
                      unlockMostActiveUserFor24Hours={
                        unlockMostActiveUserFor24Hours
                      }
                      setDynamicHight={setDynamicHight}
                      isBuySubscriptionPackage={isBuySubscriptionPackage}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <InterestedInSection
              interestsPickerHandler={interestsPickerHandler}
            />
          )}
        </div>
      </div>
      {openSubscriptionModal && (
        <BuySubscription
          close={() => setOpenSubscriptionModal(!openSubscriptionModal)}
          currentPackage={userSubscriptionData?.package?.name}
          afterSubscriptionHandler={afterSubscriptionHandler}
          handleSubscribeFor24Hours={handleSubscribeFor24Hours}
          isCallingFromSearch={true}
          unlock24HoursUsersLoading={
            randomUserLoader | mostActiveUserLoader | popularUserLoader
          }
        />
      )}
      {unlock24HoursFunError && (
        <Box
          sx={{
            width: "30%",
            display: "block",
            zIndex: 999999999999,
            top: "50%",
            left: "40%",
            position: "fixed",
          }}
        >
          <Alert severity="error">{unlock24HoursFunError}</Alert>
        </Box>
      )}
    </>
  );
};

export default Search;
