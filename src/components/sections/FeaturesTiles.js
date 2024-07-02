import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeaturesTiles = ({
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
      img1: "/images/enmobileDevice.png",
    };
    switch (locale) {
      case "ar":
        imgObj.img1 = "/images/ammobileDevice.png";
        setImgObj(imgObj);
        break;
      case "cs":
        imgObj.img1 = "/images/csmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "de":
        imgObj.img1 = "/images/demobileDevice.png";
        setImgObj(imgObj);
        break;
      case "el":
        imgObj.img1 = "/images/elmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "en":
        imgObj.img1 = "/images/enmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "es":
        imgObj.img1 = "/images/esmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "fa":
        imgObj.img1 = "/images/famobileDevice.png";
        setImgObj(imgObj);
        break;
      case "fr":
        imgObj.img1 = "/images/frmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "he":
        imgObj.img1 = "/images/hemobileDevice.png";
        setImgObj(imgObj);
        break;
      case "hr":
        imgObj.img1 = "/images/hrmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "it":
        imgObj.img1 = "/images/itmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "iw":
        imgObj.img1 = "/images/iwmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "ja":
        imgObj.img1 = "/images/jamobileDevice.png";
        setImgObj(imgObj);
        break;
      case "ko":
        imgObj.img1 = "/images/komobileDevice.png";
        setImgObj(imgObj);
        break;
      case "nl":
        imgObj.img1 = "/images/nlmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "no":
        imgObj.img1 = "/images/nomobileDevice.png";
        setImgObj(imgObj);
        break;
      case "pl":
        imgObj.img1 = "/images/plmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "pt_br":
        imgObj.img1 = "/images/pt_brmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "pt_pt":
        imgObj.img1 = "/images/pt_ptmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "ru":
        imgObj.img1 = "/images/rumobileDevice.png";
        setImgObj(imgObj);
        break;
      case "sv":
        imgObj.img1 = "/images/svmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "sw":
        imgObj.img1 = "/images/swmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "zh_cn":
        imgObj.img1 = "/images/zh_cnmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "zh_tw":
        imgObj.img1 = "/images/zh_twmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "da":
        imgObj.img1 = "/images/damobileDevice.png";
        setImgObj(imgObj);
        break;
      case "tl":
        imgObj.img1 = "/images/tlmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "fi":
        imgObj.img1 = "/images/fimobileDevice.png";
        setImgObj(imgObj);
        break;
      case "sl":
        imgObj.img1 = "/images/slmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "am":
        imgObj.img1 = "/images/armobileDevice.png";
        setImgObj(imgObj);
        break;
      case "lv":
        imgObj.img1 = "/images/lvmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "th":
        imgObj.img1 = "/images/thmobileDevice.png";
        setImgObj(imgObj);
        break;
      case "ln":
        imgObj.img1 = "/images/lnmobileDevice.png";
        setImgObj(imgObj);
        break;

      default:
        setImgObj(imgObj);
        break;
    }
  }, [locale]);
  const outerClasses = classNames(
    "features-tiles section search-people-section",
    topOuterDivider && "has-top-divider",
    bottomouterdivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
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
      desc: t("Home.socialize"),
    },
  ];
  return (
    <section {...props} className={outerClasses}>
      <div className="container search-people-main-div">
        <div>
          {/* <SectionHeader data={sectionHeader} className="center-content" /> */}
          <Grid className="search-people-div">
            <Grid direction="column" className="search-people-div">
              <div className="search-ppl-div-inr">
                <p className="search-by-people">{sectionHeader.title}</p>
                <p className="search-nearby-distance">
                  {sectionHeader.paragraph}
                </p>
              </div>
              {nearbyData?.map((item) => (
                <div className="search-near-txt">
                  <p className="search-nearby">{item.title}</p>
                  <p className="search-description">{item.desc}</p>
                </div>
              ))}
            </Grid>

            <Grid
              item
              className="tablet-image-grid"
              data-reveal-container=".split-item"
            >
              <div className="teble-device-img">
                <Image
                  src={imgObj?.img1}
                  // src={'/images/demo444.png'}
                  alt="Features tile icon 01"
                  className="mobile-nearby"
                />
                {/* <Image
                  src={'/images/Rectangle638.png'}
                  alt="Features tile icon 01"
                // className="dispaly-img"
                /> */}
                {/* <div className='rendom-image'>
              </div> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;
