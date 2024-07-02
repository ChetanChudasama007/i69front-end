import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@material-ui/core";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeatureFreeRegistration = ({
  className,
  topOuterDivider,
  bottomouterdivider,
  topDivider,
  bottomdivider,
  hasBgColor,
  invertColor,
  pushLeft,
  imageFill,
  ...props
}) => {
  const { t } = useTranslation();
  const outerClasses = classNames(
    "features-tiles section features-register",
    topOuterDivider && "has-top-divider",
    bottomouterdivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );
  const innerClasses = classNames(
    "features-tiles-inner section-inner pt-0",
    topDivider && "has-top-divider",
    bottomdivider ? "has-bottom-divider" : ""
  );

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  const sectionHeader = {
    title: t("Home.peopleSearch"),
    paragraph: t("Home.distance"),
  };
  const nearbyData = [
    {
      title: t("Home.nearBy"),
      desc: t("Home.meetAndChat"),
    },
    {
      title: t("Home.location"),
      desc: t("Home.realtimeLocation"),
    },
    {
      title: t("Home.allOver"),
      desc: t("Home.socialisez"),
    },
  ];
  return (
    <section {...props} className={outerClasses}>
      <Box className="container free-registration-main">
        <div className="fast-reg-div">
          <h3 className="fastregText">{t("Home.fastRegistration")}</h3>
          <h3 className="soc-net-text">{t("Home.socialnetwork")}</h3>
        </div>
        <div className="free-registration-inner">
          <div className="user-service-div">
            <p className="user-service-txt">
              {t("Home.useServices")} {t("Home.createProfile")}{" "}
              {t("Home.improvedCommunication")}
            </p>
          </div>
          <div className="left-dot-grid">
            <Image
              src={"/images/Dot Grid.png"}
              alt="DotGrid"
              className="dot-grid-img"
            />
          </div>
          <div className="left-containt">
            <div className="social-media-div">
              <p className="social-text"> {t("Home.registration")}</p>
              <div className="social-content">
                <div>
                  <Image
                    src={"/images/FB.png"}
                    alt="Union Rectangle"
                    className="fb-logo-rectangle"
                  />
                  <p className="text-Uppecase fb-Text"> {t("Home.facebook")}</p>
                </div>
                <div>
                  <Image
                    src={"/images/Google.png"}
                    alt="Union Rectangle"
                    className="fb-logo-rectangle"
                  />
                  <p className="text-Uppecase google-Text"> 
                    {t("Home.google")}
                  </p>
                </div>
                <div>
                  <Image
                    src={"/images/Twitter.png"}
                    alt="Union Rectangle"
                    className="fb-logo-rectangle"
                  />
                  <p className="text-Uppecase twitter-Text"> 
                    {t("Home.twitter")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="right-containt">
            <div className="social-media-div">
              <p className="social-text"> {t("Home.communication")}</p>
              <div className="social-content">
                <div>
                  <Image
                    src={"/images/chat_icon.png"}
                    alt="Union Rectangle"
                    className="fb-logo-rectangle"
                  />
                  <p className="text-Uppecase "> {t("Home.message")}</p>
                </div>
                <div>
                  <Image
                    src={"/images/3d_Gift.png"}
                    alt="Union Rectangle"
                    className="fb-logo-rectangle"
                  />
                  <p className="text-Uppecase"> {t("Home.gift")}</p>
                </div>
                <div>
                  <Image
                    src={"/images/image.png"}
                    alt="Union Rectangle"
                    className="fb-logo-rectangle"
                  />
                  <p className="text-Uppecase"> {t("Home.photos")}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="blank-position-div" />  */}
          <div className="center-dot-grid">
            <Image
              src={"/images/Dot Grid.png"}
              alt="DotGrid"
              className="dot-grid-img"
            />
          </div>
          <div className="right-dot-grid"> 
            <Image
              src={"/images/Dot Grid.png"}
              alt="DotGrid"
              className="dot-grid-img"
            />
          </div>
        </div>
      </Box>
    </section>
  );
};

FeatureFreeRegistration.propTypes = propTypes;
FeatureFreeRegistration.defaultProps = defaultProps;

export default FeatureFreeRegistration;
