import { gql, useLazyQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
const UnlockProfileModal = dynamic(() => import('./search/UnlockProfileModal'))

const MOST_ACTIVE_USERS_QUERY = gql`
  query mostActiveUsers(
    $searchKey: String!
    $interestedIn: Int!
    $gender: Int!
  ) {
    mostActiveUsers(
      searchKey: $searchKey
      interestedIn: $interestedIn
      gender: $gender
    ) {
      user {
        id
        username
        fullName
        email
        userLanguageCode
        purchaseCoins
        giftCoins
        isOnline
        gender
        age
        height
        about
        avatarIndex
        location
        familyPlans
        religion
        politics
        photosQuota
        avatarPhotos {
          id
          url
          type
        }
      }
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
    }
  }
`;

const POPULAR_USERS_QUERY = gql`
  query popularUsers($searchKey: String!, $interestedIn: Int!, $gender: Int!) {
    popularUsers(
      searchKey: $searchKey
      interestedIn: $interestedIn
      gender: $gender
    ) {
      user {
        id
        username
        fullName
        email
        userLanguageCode
        purchaseCoins
        giftCoins
        isOnline
        gender
        age
        height
        about
        avatarIndex
        location
        familyPlans
        religion
        politics
        photosQuota
        avatarPhotos {
          id
          url
          type
        }
      }
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
    }
  }
`;

const RANDOM_USERS_QUERY = gql`
  query randomUsers($searchKey: String!, $interestedIn: Int!, $gender: Int!) {
    randomUsers(
      searchKey: $searchKey
      interestedIn: $interestedIn
      gender: $gender
    ) {
      user {
        id
        username
        fullName
        email
        userLanguageCode
        purchaseCoins
        giftCoins
        isOnline
        gender
        age
        height
        about
        avatarIndex
        location
        familyPlans
        religion
        politics
        photosQuota
        avatarPhotos {
          id
          url
          type
        }
      }
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
    }
  }
`;

const SEARCH_RANDOM_USERS_QUERY = gql`
  query randomUsers($searchKey: String!) {
    randomUsers(searchKey: $searchKey) {
      user {
        id
        username
        fullName
        email
        userLanguageCode
        purchaseCoins
        giftCoins
        isOnline
        gender
        age
        height
        about
        avatarIndex
        location
        familyPlans
        religion
        politics
        photosQuota
        avatarPhotos {
          id
          url
          type
        }
      }
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
    }
  }
`;

const SEARCH_POPULAR_USERS_QUERY = gql`
  query popularUsers($searchKey: String!) {
    popularUsers(searchKey: $searchKey) {
      user {
        id
        username
        fullName
        email
        userLanguageCode
        purchaseCoins
        giftCoins
        isOnline
        gender
        age
        height
        about
        avatarIndex
        location
        familyPlans
        religion
        politics
        photosQuota
        avatarPhotos {
          id
          url
          type
        }
      }
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
      }
    }
  }
`;

const SEARCH_MOST_ACTIVE_USERS_QUERY = gql`
  query mostActiveUsers($searchKey: String!) {
    mostActiveUsers(searchKey: $searchKey) {
      user {
        id
        username
        fullName
        email
        userLanguageCode
        purchaseCoins
        giftCoins
        isOnline
        gender
        age
        height
        about
        avatarIndex
        location
        familyPlans
        religion
        politics
        photosQuota
        avatarPhotos {
          id
          url
          type
        }
      }
      myPermission {
        hasPermission
        coinsToUnlock
        freeUserLimit
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

const MostActiveUSer = ({
  searchKey,
  interestedInData,
  selectedCategory,
  setOpenSubscriptionModal,
  unlockMostActiveUserFor24Hours,
  setDynamicHight,
  isBuySubscriptionPackage
}) => {
  console.log("searchKey", searchKey);
  console.log("interestedInData", interestedInData);
  const [isShownUnlockProfile, setShownUnlockProfile] = useState(false);

  const handleYesButtonPressed = () => {
    setShownUnlockProfile(false);
    setOpenSubscriptionModal(true);
  };

  const [getActiveOrSearchUserData, { data, error, loading, refetch }] =
    useLazyQuery(
      searchKey === ""
        ? MOST_ACTIVE_USERS_QUERY
        : SEARCH_MOST_ACTIVE_USERS_QUERY,
      {
        fetchPolicy: "network-only",
      }
    );

  const [getAgeData, { data: ageData, error: ageError, loading: ageLoading }] =
    useLazyQuery(AGE_QUERY);

  useEffect(() => {
    getAgeData();
  }, []);

  useEffect(() => {
    if (unlockMostActiveUserFor24Hours?.mostActiveUsers | isBuySubscriptionPackage) {
      setOpenSubscriptionModal(false);
      refetch();
    }
    getActiveOrSearchUserData({
      variables: {
        searchKey: searchKey,
        interestedIn: selectedCategory,
        gender: interestedInData.gender,
      },
    });
  }, [
    searchKey,
    interestedInData,
    selectedCategory,
    unlockMostActiveUserFor24Hours,
    isBuySubscriptionPackage
  ]);

  const router = useRouter();
  if (loading || ageLoading)
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
  let ages = ageData?.defaultPicker?.agePicker || [];
  console.log(error);
  let mostActiveData = data?.mostActiveUsers?.user;
  let mostActiveDataPermission = data?.mostActiveUsers?.myPermission;
  console.log(
    "mostActiveDataPermission?.hasPermission",
    mostActiveDataPermission?.hasPermission
  );
  let visibleUserData = mostActiveDataPermission?.hasPermission
    ? mostActiveData
    : mostActiveData?.slice(0, mostActiveDataPermission?.freeUserLimit);
  if (loading || ageLoading)
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

  const mostActiveId = (id) => {
    router.push(`/profile/${id}`);
  };

  if (mostActiveData?.length > 0) {
    setDynamicHight(true);
  }

  return (
    <>
      <div>
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="list_grid">
            {mostActiveData &&
              mostActiveData.length > 0 &&
              visibleUserData.map((item, index) => (
                <div key={index} className="search-items-wrapper">
                  <div
                    onClick={() => mostActiveId(item?.id)}
                    className="search-items"
                  >
                    {item?.avatarPhotos.length > 0 ? (
                      <img
                        src={item?.avatarPhotos[0]?.url}
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <img
                        src="./images/demo-user.jpg"
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                  <div className="dtl">
                    <div className="name">
                      <div className="user-name-label">{item?.fullName}</div>
                    </div>
                    <span>
                      {ages?.find((option) => option?.id === item?.age)?.value}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {!mostActiveDataPermission?.hasPermission &&
            mostActiveData?.length >
              mostActiveDataPermission?.freeUserLimit && (
              <>
                <div className="unblock_form">
                  <p>
                    <strong>Unlock</strong> to view More profile
                  </p>
                  <button className="btn_gradient" onClick={() => setShownUnlockProfile(true)}>
                    <img src="./images/unlock_bell.svg" alt="" /> Unlock
                  </button>
                </div>
                <div className="list_grid locked">
                  {mostActiveData &&
                    mostActiveData.length > 0 &&
                    mostActiveData
                      .slice(
                        mostActiveDataPermission?.freeUserLimit,
                        mostActiveData.length
                      )
                      .map((item, index) => (
                        <div key={index} className="search-items-wrapper">
                          <div
                            onClick={() => setShownUnlockProfile(true)}
                            className="search-items"
                          >
                            {item?.avatarPhotos.length > 0 ? (
                              <img
                                src={item?.avatarPhotos[0]?.url}
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            ) : (
                              <img
                                src="./images/demo-user.jpg"
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            )}
                            <div className="locker-wrapper">
                              <div className="lock_ic">
                                <img src="./images/lock_circle60x.png" alt="" />
                              </div>
                            </div>
                          </div>
                          <div className="dtl">
                            <div className="name">
                              <div className="user-name-label">
                                {item?.fullName}
                              </div>
                            </div>
                            <span>
                              {
                                ages?.find((option) => option?.id === item?.age)
                                  ?.value
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                </div>
              </>
            )}
        </div>
      </div>
      {isShownUnlockProfile && (
        <UnlockProfileModal
          handleYesButtonPressed={handleYesButtonPressed}
          handleCloseButton={() => setShownUnlockProfile(false)}
        />
      )}
    </>
  );
};

export const PopularUser = ({
  searchKey,
  interestedInData,
  selectedCategory,
  setOpenSubscriptionModal,
  unlockPopularUserFor24Hours,
  isBuySubscriptionPackage,
  setDynamicHight,
}) => {
  const router = useRouter();
  const [isShownUnlockProfile, setShownUnlockProfile] = useState(false);

  const [getPopularOrSearchUserData, { data, error, loading, refetch }] =
    useLazyQuery(
      searchKey === "" ? POPULAR_USERS_QUERY : SEARCH_POPULAR_USERS_QUERY,
      {
        fetchPolicy: "network-only",
      }
    );

  useEffect(() => {
    if (unlockPopularUserFor24Hours?.popularUsers | isBuySubscriptionPackage) {
      setOpenSubscriptionModal(false);
      refetch();
    }
    getPopularOrSearchUserData({
      variables: {
        searchKey: searchKey,
        interestedIn: selectedCategory,
        gender: interestedInData.gender,
      },
    });
  }, [
    searchKey,
    selectedCategory,
    interestedInData,
    unlockPopularUserFor24Hours,
    isBuySubscriptionPackage
  ]);

  const [getAgeData, { data: ageData, error: ageError, loading: ageLoading }] =
    useLazyQuery(AGE_QUERY);

  useEffect(() => {
    getAgeData();
  }, []);

  const handleYesButtonPressed = () => {
    setShownUnlockProfile(false);
    setOpenSubscriptionModal(true);
  };

  if (loading || ageLoading)
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
  let ages = ageData?.defaultPicker?.agePicker || [];
  console.log(error);
  let popularData = data?.popularUsers?.user;
  let popularDataPermission = data?.popularUsers?.myPermission;
  let visibleUserData = popularDataPermission?.hasPermission
    ? popularData
    : popularData?.slice(0, popularDataPermission?.freeUserLimit);
  const popularId = (id) => {
    router.push(`/profile/${id}`);
  };

  if (popularData?.length > 0) {
    setDynamicHight(true);
  }

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div className="list_grid">
          {popularData &&
            popularData.length > 0 &&
            visibleUserData.map((item, index) => (
              <div key={index} className="search-items-wrapper">
                <div
                  onClick={() => popularId(item?.id)}
                  className="search-items"
                >
                  {item?.avatarPhotos.length > 0 ? (
                    <img
                      src={item?.avatarPhotos[0]?.url}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <img
                      src="./images/demo-user.jpg"
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
                <div className="dtl">
                  <div className="name">
                    <div className="user-name-label">{item?.fullName}</div>
                  </div>
                  <span>
                    {ages?.find((option) => option?.id === item?.age)?.value}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {!popularDataPermission?.hasPermission &&
          popularData?.length > popularDataPermission?.freeUserLimit && (
            <>
              <div className="unblock_form">
                <p>
                  <strong>Unlock</strong> to view More profile
                </p>
                <button className="btn_gradient" onClick={() => setShownUnlockProfile(true)}>
                  <img src="./images/unlock_bell.svg" alt="" /> Unlock
                </button>
              </div>
              <div className="list_grid locked">
                {popularData &&
                  popularData.length > 0 &&
                  popularData
                    .slice(
                      popularDataPermission?.freeUserLimit,
                      popularData.length
                    )
                    .map((item, index) => (
                      <div key={index} className="search-items-wrapper">
                        <div
                          onClick={() => setShownUnlockProfile(true)}
                          className="search-items"
                        >
                          {item?.avatarPhotos.length > 0 ? (
                            <img
                              src={item?.avatarPhotos[0]?.url}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            <img
                              src="./images/demo-user.jpg"
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          )}
                          <div className="locker-wrapper">
                            <div className="lock_ic">
                              <img src="./images/lock_circle60x.png" alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="dtl">
                          <div className="name">
                            <div className="user-name-label">
                              {item?.fullName}
                            </div>
                          </div>
                          <span>
                            {
                              ages?.find((option) => option?.id === item?.age)
                                ?.value
                            }
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </>
          )}
      </div>
      {isShownUnlockProfile && (
        <UnlockProfileModal
          handleYesButtonPressed={handleYesButtonPressed}
          handleCloseButton={() => setShownUnlockProfile(false)}
        />
      )}
    </>
  );
};

export const RandomUsers = ({
  searchKey,
  interestedInData,
  selectedCategory,
  setOpenSubscriptionModal,
  unlockRandomUserFor24Hours,
  setDynamicHight,
  isBuySubscriptionPackage
}) => {
  const router = useRouter();
  const [getAgeData, { data, error, loading }] = useLazyQuery(AGE_QUERY);
  const [isShownUnlockProfile, setShownUnlockProfile] = useState(false);

  useEffect(() => {
    getAgeData();
  }, []);

  const [
    getRandomOrSearchUserData,
    { data: userData, error: userError, refetch, loading: userLoading },
  ] = useLazyQuery(
    searchKey === "" ? RANDOM_USERS_QUERY : SEARCH_RANDOM_USERS_QUERY,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (unlockRandomUserFor24Hours?.randomUsers | isBuySubscriptionPackage) {
      setOpenSubscriptionModal(false);
      refetch();
    }
    getRandomOrSearchUserData({
      variables: {
        searchKey: searchKey,
        interestedIn: selectedCategory,
        gender: interestedInData.gender,
      },
    });
  }, [
    searchKey,
    selectedCategory,
    interestedInData,
    unlockRandomUserFor24Hours,
    isBuySubscriptionPackage
  ]);

  if (userLoading || loading)
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
  let ages = data?.defaultPicker?.agePicker || [];

  let randomData = userData?.randomUsers?.user;
  let randomDataPermission = userData?.randomUsers?.myPermission;
  console.log(error);

  let visibleUserData = randomDataPermission?.hasPermission
    ? randomData
    : randomData?.slice(0, randomDataPermission?.freeUserLimit);

  const randomId = (id) => {
    router.push(`/profile/${id}`);
  };

  const handleYesButtonPressed = () => {
    setShownUnlockProfile(false);
    setOpenSubscriptionModal(true);
  };

  if (randomData?.length > 0) {
    setDynamicHight(true);
  }

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div className="list_grid">
          {randomData &&
            randomData.length > 0 &&
            visibleUserData.map((item, index) => (
              <div key={index} className="search-items-wrapper">
                <div
                  className="search-items"
                  onClick={() => randomId(item?.id)}
                >
                  {item?.avatarPhotos.length > 0 ? (
                    <img src={item?.avatarPhotos[0]?.url} alt="" />
                  ) : (
                    <img src="./images/demo-user.jpg" alt="" />
                  )}
                </div>
                <div className="dtl">
                  <div className="name">
                    <div className="user-name-label">{item?.fullName}</div>
                  </div>
                  <span>
                    {ages?.find((option) => option?.id === item?.age)?.value}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {!randomDataPermission?.hasPermission &&
          randomData?.length > randomDataPermission?.freeUserLimit && (
            <>
              <div className="unblock_form">
                <p>
                  <strong>Unlock</strong> to view More profile
                </p>
                <button className="btn_gradient" onClick={() => setShownUnlockProfile(true)}>
                  <img src="./images/unlock_bell.svg" alt="" /> Unlock
                </button>
              </div>
              <div className="list_grid locked">
                {randomData &&
                  randomData.length > 0 &&
                  randomData
                    .slice(
                      randomDataPermission?.freeUserLimit,
                      randomData.length
                    )
                    .map((item, index) => (
                      <div key={index} className="search-items-wrapper">
                        <div
                          onClick={() => setShownUnlockProfile(true)}
                          className="search-items"
                        >
                          {item?.avatarPhotos.length > 0 ? (
                            <img
                              src={item?.avatarPhotos[0]?.url}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            <img
                              src="./images/demo-user.jpg"
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          )}
                          <div className="locker-wrapper">
                            <div className="lock_ic">
                              <img src="./images/lock_circle60x.png" alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="dtl">
                          <div className="name">
                            <div className="user-name-label">
                              {item?.fullName}
                            </div>
                          </div>
                          <span>
                            {
                              ages?.find((option) => option?.id === item?.age)
                                ?.value
                            }
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </>
          )}
      </div>
      {isShownUnlockProfile && (
        <UnlockProfileModal
          handleYesButtonPressed={handleYesButtonPressed}
          handleCloseButton={() => setShownUnlockProfile(false)}
        />
      )}
    </>
  );
};

export default MostActiveUSer;
