import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import Image from "../elements/Image";
import { useTranslation } from "react-i18next";
import { Button, Link, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeatureWelcome = ({
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
  const { locale } = useRouter();
  const [imgObj, setImgObj] = useState({});

  useEffect(() => {
    const imgObj = {
      img1: "/images/enPhone1.png",
      img2: "/images/enPhone2.png",
    }; 
    switch (locale) {
      case "ar":
        imgObj.img1="/images/arPhone1.png"
        imgObj.img2="/images/arPhone2.png"
        setImgObj(imgObj);
        break;
      case "cs":
        imgObj.img1="/images/csPhone1.png"
        imgObj.img2="/images/csPhone2.png"
        setImgObj(imgObj); 
        break;
      case "de":
        imgObj.img1="/images/dePhone1.png"
        imgObj.img2="/images/dePhone2.png"
        setImgObj(imgObj); 
        break;
      case "el":
        imgObj.img1="/images/elPhone1.png"
        imgObj.img2="/images/elPhone2.png"
        setImgObj(imgObj); 
        break;
      case "en":
        imgObj.img1="/images/enPhone1.png"
        imgObj.img2="/images/enPhone2.png"
        setImgObj(imgObj); 
        break;
      case "es":
        imgObj.img1="/images/esPhone1.png"
        imgObj.img2="/images/esPhone2.png"
        setImgObj(imgObj); 
        break;
      case "fa":
        imgObj.img1="/images/faPhone1.png"
        imgObj.img2="/images/faPhone2.png"
        setImgObj(imgObj); 
        break;
      case "fr":
        imgObj.img1="/images/frPhone1.png"
        imgObj.img2="/images/frPhone2.png"
        setImgObj(imgObj); 
        break;
      case "he":
        imgObj.img1="/images/hePhone1.png"
        imgObj.img2="/images/hePhone2.png"
        setImgObj(imgObj); 
        break;
      case "hr":
        imgObj.img1="/images/hrPhone1.png"
        imgObj.img2="/images/hrPhone2.png"
        setImgObj(imgObj); 
        break;
      case "it":
        imgObj.img1="/images/itPhone1.png"
        imgObj.img2="/images/itPhone2.png"
        setImgObj(imgObj); 
        break;
      case "iw":
        imgObj.img1="/images/iwPhone1.png"
        imgObj.img2="/images/iwPhone2.png"
        setImgObj(imgObj); 
        break;
      case "ja":
        imgObj.img1="/images/jaPhone1.png"
        imgObj.img2="/images/jaPhone2.png"
        setImgObj(imgObj); 
        break;
      case "ko":
        imgObj.img1="/images/koPhone1.png"
        imgObj.img2="/images/koPhone2.png"
        setImgObj(imgObj); 
        break;
      case "nl":
        imgObj.img1="/images/nlPhone1.png"
        imgObj.img2="/images/nlPhone2.png"
        setImgObj(imgObj); 
        break;
      case "no":
        imgObj.img1="/images/noPhone1.png"
        imgObj.img2="/images/noPhone2.png"
        setImgObj(imgObj); 
        break;
      case "pl":
        imgObj.img1="/images/plPhone1.png"
        imgObj.img2="/images/plPhone2.png"
        setImgObj(imgObj); 
        break;
      case "pt_br":
        imgObj.img1="/images/pt_brPhone1.png"
        imgObj.img2="/images/pt_brPhone2.png"
        setImgObj(imgObj); 
        break;
      case "pt_pt":
        imgObj.img1="/images/pt_ptPhone1.png"
        imgObj.img2="/images/pt_ptPhone2.png"
        setImgObj(imgObj); 
        break;
      case "ru":
        imgObj.img1="/images/ruPhone1.png"
        imgObj.img2="/images/ruPhone2.png"
        setImgObj(imgObj); 
        break;
      case "sv":
        imgObj.img1="/images/svPhone1.png"
        imgObj.img2="/images/svPhone2.png"
        setImgObj(imgObj); 
        break;
      case "sw":
        imgObj.img1="/images/swPhone1.png"
        imgObj.img2="/images/swPhone2.png"
        setImgObj(imgObj); 
        break;
      case "zh_cn":
        imgObj.img1="/images/zh_cnPhone1.png"
        imgObj.img2="/images/zh_cnPhone2.png"
        setImgObj(imgObj); 
        break;
      case "zh_tw":
        imgObj.img1="/images/zh_twPhone1.png"
        imgObj.img2="/images/zh_twPhone2.png"
        setImgObj(imgObj); 
        break;
      case "da":
        imgObj.img1="/images/daPhone1.png"
        imgObj.img2="/images/daPhone2.png"
        setImgObj(imgObj); 
        break;
      case "tl":
        imgObj.img1="/images/tlPhone1.png"
        imgObj.img2="/images/tlPhone2.png"
        setImgObj(imgObj); 
        break;
      case "fi":
        imgObj.img1="/images/fiPhone1.png"
        imgObj.img2="/images/fiPhone2.png"
        setImgObj(imgObj); 
        break;
      case "sl":
        imgObj.img1="/images/slPhone1.png"
        imgObj.img2="/images/slPhone2.png"
        setImgObj(imgObj); 
        break;
      case "am":
        imgObj.img1="/images/amPhone1.png"
        imgObj.img2="/images/amPhone2.png"
        setImgObj(imgObj); 
        break;
      case "lv":
        imgObj.img1="/images/lvPhone1.png"
        imgObj.img2="/images/lvPhone2.png"
        setImgObj(imgObj); 
        break;
      case "th":
        imgObj.img1="/images/thPhone1.png"
        imgObj.img2="/images/thPhone2.png"
        setImgObj(imgObj); 
        break;
      case "ln":
        imgObj.img1="/images/lnPhone1.png"
        imgObj.img2="/images/lnPhone2.png"
        setImgObj(imgObj); 
        break;

      default:
        setImgObj(imgObj);
        break;
    }
  }, [locale]);

  const outerClasses = classNames(
    "features-tiles section",
    topOuterDivider && "has-top-divider",
    bottomouterdivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );
  return (
    <section {...props} className={outerClasses}>
      <div
        style={{
          backgroundImage: `url(/images/welcomeBack.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          // backgroundAttachment: 'fixed'
        }}
      >
        <div
          style={{
            backgroundImage: `url(/images/weelcomebackShadow.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            // backgroundAttachment: 'fixed'
          }}
        >
          <div className="container">
            <div className="welcome-main">
              <div className="welcome-left-content">
                <div className="welcome-txt-width">
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
                <div className="app-store-google-badge">
                  <div className="app-store-inner">
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
                        textAlign: "center",
                        minWidth: "237px",
                      }}
                      href="https://play.google.com/store/apps/details?id=com.i69.isyxtinine&pli=1"
                      target="_blank"
                    >
                      <Image
                        src={"../images/appleStore.png"}
                        className="play-store-icon"
                        alt="Google Badge"
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidthwidth: "150px",
                        }}
                      >
                        <span className="m-0 get-it-txt">
                          {t("Home.availOnThe")}
                        </span>

                        <span className="m-0 googlePlayBtn">App Store</span>
                        {/* <Typography variant="span" className="m-0 googlePlayBtn play-txt" >
                
              </Typography> */}
                      </div>
                    </Button>
                  </div>
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
                      minWidth: "237px",
                      justifyContent: "flex-start",
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
                        minwidth: "150px",
                      }}
                    >
                      <span className="m-0 get-it-txt">
                        {t("Home.availOnThe")}
                      </span>

                      <span className="m-0 googlePlayBtn">Google Play</span>
                    </div>
                  </Button>
                </div>
              </div>
              <div className="welcome-mobile-div">
                <div className="welcome-relative-div">
                 
                  <img
                    src={imgObj.img1}
                    alt={t("Home.search")}
                    className="phone-img-left" 
                    width={231}
                    height={500}
                  />
                </div>
                <div className="">
                  <img
                    src={imgObj.img2}
                    alt={t("Home.search")}
                    className="phone-img-right"
                    width={231}
                    height={500}
                  />
                </div>

                {/* <span
                    className={`absolute-img-txt ${
                      locale === "en"
                        ? "relation-ship"
                        : locale === "fr"
                        ? "fr-relation"
                        : locale === "zh_cn"
                        ? "zh_cn-relation"
                        :  locale === "zh_tw"
                        ? "zh_cn-relation"
                        : locale === "sw"
                        ? "sw-relation"
                        : locale === "el"
                        ? "el-relation"
                        : locale === "ko"
                        ? "ko-relation"
                        :locale === "pl"
                        ? "pl-relation"
                        :locale === "sl"
                        ? "sl-relation"
                        :locale === "da"
                        ? "sl-relation"
                        :locale === "ru"
                        ? "ru-relation"
                        :locale === "ja"
                        ? "ja-relation"
                        :"relation-ship"
                    }`}
                  >
                    {t("Home.relationship")}
                  </span> */}
                {/* <span
                    className={`absolute-img-txt ${
                      locale === "en"
                        ? "new-friend"
                        : locale === "fr"
                        ? "fr-new-friend"
                        : locale === "zh_cn"
                        ? "zh_cn-new-friend"
                        :locale === "zh_tw"
                        ? "zh_cn-new-friend"
                        :locale === "nl"
                        ? "nl-new-friend"
                        : locale === "sw"
                        ? "sw-new-friend"
                        : locale === "el"
                        ? "el-new-friend"
                        :locale === "ko"
                        ? "ko-new-friend"
                        :locale === "pl"
                        ? "pl-new-friend"
                        :locale === "ru"
                        ? "ru-new-friend"
                        : "new-friend"
                    }`}
                  >
                    {" "}
                    {t("Home.newFriend")}
                  </span> */}
                {/* <span
                    className={`absolute-img-txt ${
                      locale === "en"
                        ? "rommate"
                        : locale === "fr"
                        ? "fr-roommate"
                        : locale === "zh_cn"
                        ? "zh_cn-rommate"
                        : locale === "zh_tw"
                        ? "zh_cn-rommate"
                        :locale === "sw"
                        ? "sw-rommate"
                        :locale === "el"
                        ? "el-rommate"
                        :locale === "ko"
                        ? "ko-rommate"
                        :locale === "pl"
                        ? "pl-rommate"
                        :locale === "da"
                        ? "da-rommate"
                        :locale === "tl"
                        ? "da-rommate"
                        :locale === "it"
                        ? "it-rommate"
                        : locale === "ru"
                        ? "ru-rommate"
                        : locale === "pt_br"
                        ? "pt_br-rommate"
                        : locale === "pt_pt"
                        ? "pt_br-rommate"
                        : locale === "es"
                        ? "pt_br-rommate"
                        :   "rommate"
                    }`}
                  >
                    {t("Home.Roommates")}
                  </span> */}
                {/* <span
                    className={`absolute-img-txt ${
                      locale === "en"
                        ? "bussiness"
                        : locale === "fr"
                        ? "fr-bussiness"
                        : locale === "zh_cn"
                        ? "zh_cn-bussiness"
                        : locale === "zh_tw"
                        ? "zh_cn-bussiness"
                        :locale === "sw"
                        ? "sw-bussiness"
                        :locale === "el"
                        ? "el-bussiness"
                        :locale === "ko"
                        ? "ko-bussiness"
                        :locale === "pl"
                        ? "pl-bussiness"
                        :locale === "da"
                        ? "da-bussiness"
                        : locale === "tl"
                        ? "da-bussiness"
                        : locale === "fi"
                        ? "fi-bussiness"
                        : locale === "ru"
                        ? "ru-bussiness"
                        : locale === "pt_br"
                        ? "pt_br-bussiness"
                        :locale === "pt_pt"
                        ? "pt_br-bussiness"
                        :locale === "es"
                        ? "es-bussiness"
                        :  "bussiness"
                    }`}
                  >
                    {t("Home.BusinessContacts")}
                  </span> */}
                {/* <span
                    className={`absolute-img-txt clcl-btn-clr ${
                      locale === "en"
                        ? "click-btn"
                        : locale === "fr"
                        ? "fr-click-btn"
                        :locale === "de"
                        ? "de-click-btn"
                        :locale === "ja"
                        ? "ja-click-btn"
                        :locale === "ru"
                        ? "ru-click-btn"
                        : "click-btn"
                    }`}
                  >
                    {t("Home.letsGoClick")} 
                  </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeatureWelcome.propTypes = propTypes;
FeatureWelcome.defaultProps = defaultProps;

export default FeatureWelcome;
