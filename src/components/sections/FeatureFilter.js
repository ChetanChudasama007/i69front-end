import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeatureFilter = ({
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
  const outerClasses = classNames(
    "features-tiles section features-filter",
    topOuterDivider && "has-top-divider",
    bottomouterdivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );
  useEffect(() => {
    const imgObj = {
      img1: "/images/enCasualDate.png",
      img2: "/images/enNewFriend.png",
      img3: "/images/enSeriousRelation.png",
      img4: "/images/enRoommates.png",
      img5: "/images/enBussinessContacts.png",
    };
    switch (locale) {
      case "ar":
        imgObj.img1 = "/images/arCasualDate.png";
        imgObj.img2 = "/images/arNewFriend.png";
        imgObj.img3 = "/images/arSeriousRelation.png";
        imgObj.img4 = "/images/arRoommates.png";
        imgObj.img5 = "/images/arBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "cs":
        imgObj.img1 = "/images/csCasualDate.png";
        imgObj.img2 = "/images/csNewFriend.png";
        imgObj.img3 = "/images/csSeriousRelation.png";
        imgObj.img4 = "/images/csRoommates.png";
        imgObj.img5 = "/images/csBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "de":
        imgObj.img1 = "/images/deCasualDate.png";
        imgObj.img2 = "/images/deNewFriend.png";
        imgObj.img3 = "/images/deSeriousRelation.png";
        imgObj.img4 = "/images/deRoommates.png";
        imgObj.img5 = "/images/deBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "el":
        imgObj.img1 = "/images/elCasualDate.png";
        imgObj.img2 = "/images/elNewFriend.png";
        imgObj.img3 = "/images/elSeriousRelation.png";
        imgObj.img4 = "/images/elRoommates.png";
        imgObj.img5 = "/images/elBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "en":
        imgObj.img1 = "/images/enCasualDate.png";
        imgObj.img2 = "/images/enNewFriend.png";
        imgObj.img3 = "/images/enSeriousRelation.png";
        imgObj.img4 = "/images/enRoommates.png";
        imgObj.img5 = "/images/enBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "es":
        imgObj.img1 = "/images/esCasualDate.png";
        imgObj.img2 = "/images/esNewFriend.png";
        imgObj.img3 = "/images/esSeriousRelation.png";
        imgObj.img4 = "/images/esRoommates.png";
        imgObj.img5 = "/images/esBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "fa":
        imgObj.img1 = "/images/faCasualDate.png";
        imgObj.img2 = "/images/faNewFriend.png";
        imgObj.img3 = "/images/faSeriousRelation.png";
        imgObj.img4 = "/images/faRoommates.png";
        imgObj.img5 = "/images/faBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "fr":
        imgObj.img1 = "/images/frCasualDate.png";
        imgObj.img2 = "/images/frNewFriend.png";
        imgObj.img3 = "/images/frSeriousRelation.png";
        imgObj.img4 = "/images/frRoommates.png";
        imgObj.img5 = "/images/frBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "he":
        imgObj.img1 = "/images/heCasualDate.png";
        imgObj.img2 = "/images/heNewFriend.png";
        imgObj.img3 = "/images/heSeriousRelation.png";
        imgObj.img4 = "/images/heRoommates.png";
        imgObj.img5 = "/images/heBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "hr":
        imgObj.img1 = "/images/hrCasualDate.png";
        imgObj.img2 = "/images/hrNewFriend.png";
        imgObj.img3 = "/images/hrSeriousRelation.png";
        imgObj.img4 = "/images/hrRoommates.png";
        imgObj.img5 = "/images/hrBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "it":
        imgObj.img1 = "/images/itCasualDate.png";
        imgObj.img2 = "/images/itNewFriend.png";
        imgObj.img3 = "/images/itSeriousRelation.png";
        imgObj.img4 = "/images/itRoommates.png";
        imgObj.img5 = "/images/itBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "iw":
        imgObj.img1 = "/images/iwCasualDate.png";
        imgObj.img2 = "/images/iwNewFriend.png";
        imgObj.img3 = "/images/iwSeriousRelation.png";
        imgObj.img4 = "/images/iwRoommates.png";
        imgObj.img5 = "/images/iwBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "ja":
        imgObj.img1 = "/images/jaCasualDate.png";
        imgObj.img2 = "/images/jaNewFriend.png";
        imgObj.img3 = "/images/jaSeriousRelation.png";
        imgObj.img4 = "/images/jaRoommates.png";
        imgObj.img5 = "/images/jaBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "ko":
        imgObj.img1 = "/images/koCasualDate.png";
        imgObj.img2 = "/images/koNewFriend.png";
        imgObj.img3 = "/images/koSeriousRelation.png";
        imgObj.img4 = "/images/koRoommates.png";
        imgObj.img5 = "/images/koBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "nl":
        imgObj.img1 = "/images/nlCasualDate.png";
        imgObj.img2 = "/images/nlNewFriend.png";
        imgObj.img3 = "/images/nlSeriousRelation.png";
        imgObj.img4 = "/images/nlRoommates.png";
        imgObj.img5 = "/images/nlBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "no":
        imgObj.img1 = "/images/noCasualDate.png";
        imgObj.img2 = "/images/noNewFriend.png";
        imgObj.img3 = "/images/noSeriousRelation.png";
        imgObj.img4 = "/images/noRoommates.png";
        imgObj.img5 = "/images/noBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "pl":
        imgObj.img1 = "/images/plCasualDate.png";
        imgObj.img2 = "/images/plNewFriend.png";
        imgObj.img3 = "/images/plSeriousRelation.png";
        imgObj.img4 = "/images/plRoommates.png";
        imgObj.img5 = "/images/plBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "pt_br":
        imgObj.img1 = "/images/pt_brCasualDate.png";
        imgObj.img2 = "/images/pt_brNewFriend.png";
        imgObj.img3 = "/images/pt_brSeriousRelation.png";
        imgObj.img4 = "/images/pt_brRoommates.png";
        imgObj.img5 = "/images/pt_brBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "pt_pt":
        imgObj.img1 = "/images/pt_ptCasualDate.png";
        imgObj.img2 = "/images/pt_ptNewFriend.png";
        imgObj.img3 = "/images/pt_ptSeriousRelation.png";
        imgObj.img4 = "/images/pt_ptRoommates.png";
        imgObj.img5 = "/images/pt_ptBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "ru":
        imgObj.img1 = "/images/ruCasualDate.png";
        imgObj.img2 = "/images/ruNewFriend.png";
        imgObj.img3 = "/images/ruSeriousRelation.png";
        imgObj.img4 = "/images/ruRoommates.png";
        imgObj.img5 = "/images/ruBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "sv":
        imgObj.img1 = "/images/svCasualDate.png";
        imgObj.img2 = "/images/svNewFriend.png";
        imgObj.img3 = "/images/svSeriousRelation.png";
        imgObj.img4 = "/images/svRoommates.png";
        imgObj.img5 = "/images/svBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "sw":
        imgObj.img1 = "/images/swCasualDate.png";
        imgObj.img2 = "/images/swNewFriend.png";
        imgObj.img3 = "/images/swSeriousRelation.png";
        imgObj.img4 = "/images/swRoommates.png";
        imgObj.img5 = "/images/swBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "zh_cn":
        imgObj.img1 = "/images/zh_cnCasualDate.png";
        imgObj.img2 = "/images/zh_cnNewFriend.png";
        imgObj.img3 = "/images/zh_cnSeriousRelation.png";
        imgObj.img4 = "/images/zh_cnRoommates.png";
        imgObj.img5 = "/images/zh_cnBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "zh_tw":
        imgObj.img1 = "/images/zh_twCasualDating.png";
        imgObj.img2 = "/images/zh_twNewFriend.png";
        imgObj.img3 = "/images/zh_twSeriousRelation.png";
        imgObj.img4 = "/images/zh_twRoommates.png";
        imgObj.img5 = "/images/zh_twBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "da":
        imgObj.img1 = "/images/daCasualDate.png";
        imgObj.img2 = "/images/daNewFriend.png";
        imgObj.img3 = "/images/daSeriousRelation.png";
        imgObj.img4 = "/images/daRoommates.png";
        imgObj.img5 = "/images/daBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "tl":
        imgObj.img1 = "/images/tlCasualDate.png";
        imgObj.img2 = "/images/tlNewFriend.png";
        imgObj.img3 = "/images/tlSeriousRelation.png";
        imgObj.img4 = "/images/tlRoommates.png";
        imgObj.img5 = "/images/tlBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "fi":
        imgObj.img1 = "/images/fiCasualDate.png";
        imgObj.img2 = "/images/fiNewFriend.png";
        imgObj.img3 = "/images/fiSeriousRelation.png";
        imgObj.img4 = "/images/fiRoommates.png";
        imgObj.img5 = "/images/fiBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "sl":
        imgObj.img1 = "/images/slCasualDate.png";
        imgObj.img2 = "/images/slNewFriend.png";
        imgObj.img3 = "/images/slSeriousRelation.png";
        imgObj.img4 = "/images/slRoommates.png";
        imgObj.img5 = "/images/slBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "am":
        imgObj.img1 = "/images/amCasualDating.png";
        imgObj.img2 = "/images/amNewFriend.png";
        imgObj.img3 = "/images/amSeriousRelation.png";
        imgObj.img4 = "/images/amRoommates.png";
        imgObj.img5 = "/images/amBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "lv":
        imgObj.img1 = "/images/lvCasualDate.png";
        imgObj.img2 = "/images/lvNewFriend.png";
        imgObj.img3 = "/images/lvSeriousRelation.png";
        imgObj.img4 = "/images/lvRoommates.png";
        imgObj.img5 = "/images/lvBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "th":
        imgObj.img1 = "/images/thCasualDate.png";
        imgObj.img2 = "/images/thNewFriend.png";
        imgObj.img3 = "/images/thSeriousRelation.png";
        imgObj.img4 = "/images/thRoommates.png";
        imgObj.img5 = "/images/thBussinessContacts.png";
        setImgObj(imgObj);
        break;
      case "ln":
        imgObj.img1 = "/images/lnCasualDate.png";
        imgObj.img2 = "/images/lnNewFriend.png";
        imgObj.img3 = "/images/lnSeriousRelation.png";
        imgObj.img4 = "/images/lnRoommates.png";
        imgObj.img5 = "/images/lnBussinessContacts.png";
        setImgObj(imgObj);
        break;

      default:
        setImgObj(imgObj);
        break;
    }
  }, [locale]);
  return (
    <section {...props} className={outerClasses}>
      <Box className="container filter-bottom-div">
        <Grid direction="column" className="advantages filter-main-div">
          <Grid item className="filter-title-main">
            <div className="grid-container">
              <Typography variant="h6" className="filter-main-head">
                {t("Home.filters")}
              </Typography>
              <Typography
                style={{ marginBottom: 20 }}
                variant="span"
                className="filter-desc mb-20"
              >
                {t("Home.all")}
              </Typography>
              <div className="sub-text-main-filter">
                <Typography variant="span" className="filter-desc desc-remark">
                  {t("Home.seriousRelationship")} {t("Home.searchScreen")}{" "}
                  {t("Home.everyone")} {t("Home.advanceFilter")}{" "}
                  {t("Home.newFriends")} {t("Home.filtersAppearance")}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item className="filter-image-main">
            <div className="image-tag-text">
              <Image
                src={imgObj?.img1}
                alt="casual_dating"
                className="cross-image"
              />
            </div>
            <div className="image-tag-text">
              <Image
                src={imgObj?.img2}
                alt="new_friends"
                className="cross-image"
              />
            </div>
            <div className="image-tag-text">
              <Image src={imgObj?.img3} alt="flirts" className="cross-image" />
            </div>
            <div className="image-tag-text">
              <Image
                src={imgObj?.img4}
                alt="room_mates"
                className="cross-image"
              />
            </div>
            <div className="image-tag-text">
              <Image
                src={imgObj?.img5}
                alt="Features split 02"
                className="cross-image"
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

FeatureFilter.propTypes = propTypes;
FeatureFilter.defaultProps = defaultProps;

export default FeatureFilter;
