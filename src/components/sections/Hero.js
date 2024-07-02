import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "../elements/Image";
import { Box, Button, Typography } from "@material-ui/core";
import Navbar from "../../layouts/Navbar";
import FeaturesTiles from "./FeaturesTiles";
import FeatureAdvantages from "./FeatureAdvantages";
import FeatureFreeRegistration from "./FeatureFreeRegistration";
import FeatureFreeService from "./FeatureFreeService";
import FeatureFilter from "./FeatureFilter";
import FeatureWelcome from "./FeatureWelcome";
import Header from "../layout/Header";
import { useGeolocated } from "react-geolocated";
import dynamic from "next/dynamic";
import axiosConfig from "../../common/axiosConfig";

const LocationAllowModal = dynamic(() => import("../commons/CustomModal"));

const GetLatAndLong = ({ updateLatAndLong }) => {
  const [isShownLocationAllowModal, setShownLocationAllowModal] =
    useState(false);
  const { coords, positionError } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (positionError && positionError.code === 1) {
      setShownLocationAllowModal(true);
    }
    if (coords) {
      setShownLocationAllowModal(false);
      localStorage.setItem("lat", coords.latitude);
      localStorage.setItem("long", coords.longitude);
      updateLatAndLong(coords.latitude, coords.longitude);
    }
  }, [coords, positionError]);

  const handleActionButtonForLocation = () => {
    setShownLocationAllowModal(false);
  };

  return isShownLocationAllowModal ? (
    <LocationAllowModal
      handleActionButton={handleActionButtonForLocation}
      buttonLabel="Ok"
    >
      <Typography
        style={{
          fontSize: "16px",
          color: "black",
          marginTop: "20px",
          paddingLeft: "10px",
        }}
      >
        <b> To enable location access, follow these steps: </b>
        <ol>
          <li>Open your browser settings.</li>
          <li>Navigate to site settings or privacy settings.</li>
          <li>
            Find the location permissions for this site and set it to Allow
          </li>
        </ol>
      </Typography>
    </LocationAllowModal>
  ) : (
    ""
  );
};

function Hero(props) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShownLocationAllowModal, setShownLocationAllowModal] =
    useState(false);

  // const [isShownLocationAllowModal, setShownLocationAllowModal] =
  //   useState(false);
  const [isRequiredLocation, setRequiredLocation] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const { coords, positionError } = useGeolocated({
  //   positionOptions: {
  //     enableHighAccuracy: true,
  //   },
  //   userDecisionTimeout: 5000,
  // });

  useEffect(() => {
    const getUserSetting = async () => {
      try {
        const response = await axiosConfig.get("api/", {});
        if (response && response.status === 200) {
          setShownLocationAllowModal(
            response?.data?.defaultPickers?.user_location_setting?.isRequired
              ? response?.data?.defaultPickers?.user_location_setting
                  ?.default_country_allowed
                ? false
                : true
              : !response?.data?.defaultPickers?.user_location_setting
                  ?.isRequired &&
                  !response?.data?.defaultPickers?.user_location_setting
                    ?.default_country_allowed
          );

        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getUserSetting();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
    });
  }, []);

  // useEffect(() => {
  //   if (positionError && positionError.code === 1) {
  //     setShownLocationAllowModal(true);
  //   }
  //   if (coords) {
  //     setShownLocationAllowModal(false);
  //     localStorage.setItem("lat", coords.latitude);
  //     localStorage.setItem("long", coords.longitude);
  //   }
  // }, [coords, positionError]);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const scrollBottom = window.innerHeight + window.scrollY;

    if (scrollTop >= 642 && scrollBottom <= document.body.offsetHeight - 650) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const handleActionButtonForLocation = () => {
    setRequiredLocation(true);
  };

  const updateLatAndLong = (latitudeValue, longitudeValue) => {
    setLatitude(latitudeValue);
    setLongitude(longitudeValue);
  };

  return (
    <>
      <div style={{ position: "fixed", width: "100%", zIndex: "1000" }}>
        <Header
          latValue={latitude}
          longValue={longitude}
          isShownLocationAllowModal={isShownLocationAllowModal}
        />
      </div>
      <div
        style={{
          backgroundImage: `url(/images/hero5bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="welcome-main">
            <div className="welcome-center-div">
              <div className="welcome-inner-div">
                <Typography varient="span" className="welcome-txt">
                  {t("Home.welcome")}
                </Typography>
                <Typography varient="span" className="welcome-inner-txt">
                  {t("Home.best")}
                </Typography>
                <Typography varient="span" className="dwnld-txt">
                  {t("Home.downloadAppNow")}
                </Typography>
              </div>
              <div className="app-store-google-header-badge">
                <Button
                  size="large"
                  type="submit"
                  variant="outlined"
                  color="white"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "flex-start",
                    background: "#fff",
                    minWidth: "237px",
                  }}
                  href="https://play.google.com/store/apps/details?id=com.i69.isyxtinine&pli=1"
                  target="_blank"
                >
                  <Image
                    src={"../images/googlePlay.png"}
                    className="play-store-icon"
                    alt="Google Badge"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      minwidth: "150px",
                    }}
                  >
                    <span className="m-0 get-it-txt">
                      {t("Home.availOnThe")}
                    </span>

                    <span className="m-0 googlePlayBtn">Google Play</span>
                    {/* <Typography variant="span" className="m-0 googlePlayBtn play-txt" >
                
              </Typography> */}
                  </div>
                </Button>
              </div>
            </div>
            <div className="hero-image-div">
              {/* <img
                src={'/images/welcomeUp.png'}
                alt={t('Home.search')}
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: "100%", height: "32vw", marginTop: "15%", marginBottom: "30%" }}
              /> */}

              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  height: "32vw",
                  marginTop: "30%",
                  marginBottom: "10%",
                }}
                className="hero-inner-div"
              >
                <div className="welcome-right-content">
                  <Image
                    src={"../images/nearBy.png"}
                    className="find-near-by-img"
                    alt="welcome"
                  />
                  <Typography varient="span" className="hero-header-img-txt">
                    {t("Home.findNearBy")}
                  </Typography>
                </div>
                <div className="welcome-right-content right-center">
                  <Image
                    src={"../images/meetPeople.png"}
                    className="find-near-by-img"
                    alt="welcome"
                  />
                  <Typography varient="span" className="hero-header-img-txt">
                    {t("Home.meetPeople")}
                  </Typography>
                </div>
                <div className="welcome-right-content last-right">
                  <Image
                    src={"../images/startChat.png"}
                    className="find-near-by-img"
                    alt="welcome"
                  />
                  <Typography varient="span" className="hero-header-img-txt">
                    {t("Home.startChat")}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isScrolled && (
        <div className={isScrolled ? "btn-wrapper scrolled" : "btn-wrapper"}>
          <Button
            size="large"
            type="submit"
            variant="outlined"
            color="white"
            style={{
              position: "fixed",
              bottom: "60px",
              left: "38px",
              zIndex: 99,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "flex-start",
              minWidth: "237px",
              background: "#fff",
            }}
            href="https://play.google.com/store/apps/details?id=com.i69.isyxtinine&pli=1"
            target="_blank"
          >
            <Image
              src={"../images/googlePlay.png"}
              className="play-store-icon"
              alt="Google Badge"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "150px",
              }}
            >
              <span className="m-0 get-it-txt">{t("Home.availOnThe")}</span>

              <span className="m-0 googlePlayBtn">Google Play</span>
            </div>
          </Button>
        </div>
      )}
      <FeaturesTiles />
      <FeatureAdvantages />
      <FeatureFreeRegistration />
      <FeatureFreeService />
      <FeatureFilter />
      <FeatureWelcome />
      {isRequiredLocation ? (
        <GetLatAndLong updateLatAndLong={updateLatAndLong} />
      ) : isShownLocationAllowModal ? (
        <LocationAllowModal
          handleActionButton={handleActionButtonForLocation}
          buttonLabel="Ok"
        >
          <Typography
            style={{
              fontSize: "16px",
              color: "black",
              marginTop: "20px",
              paddingLeft: "10px",
            }}
          >
            <b> To enable location access, follow these steps: </b>
            <ol>
              <li>Open your browser settings.</li>
              <li>Navigate to site settings or privacy settings.</li>
              <li>
                Find the location permissions for this site and set it to Allow
              </li>
            </ol>
          </Typography>
        </LocationAllowModal>
      ) : (
        ""
      )}
    </>
  );
}

export default Hero;
