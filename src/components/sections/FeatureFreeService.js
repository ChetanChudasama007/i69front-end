import React from "react";
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
const FeatureFreeService = ({
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
  const router = useRouter()
  const { t } = useTranslation();
  const outerClasses = classNames(
    "features-tiles section features-free-service",
    topOuterDivider && "has-top-divider",
    bottomouterdivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );  
  return (
    <section {...props} className={outerClasses}>
      <Box className="container tablet-bottom-div">
        <div className="free-service-main">
          <div className="free-service-flex">

          <div className='free-service-box'>
            <h6 className={router.locale === "de" ? "m-0 free-service-txt de-lang-txt" : "m-0 free-service-txt"} >
              {t('Home.freeServices')}
            </h6>
            <Typography variant="span" className= {router.locale === "de" ? "m-0 women-service-txt de-lang-txt" :"m-0 women-service-txt"}> 
              {t('Home.womenService')}
            </Typography>
          </div>
          </div>
          <div className="send-mail-main">
            <Typography variant="span" className="best-para-tag"
            >
              {t('Home.offerServices')} <b>{t('Home.email')}</b>
            </Typography>
            <Typography variant="span" className="best-para-tag attach-copy-main"
            >
              {t('Home.attachCopy')}
            </Typography>
          </div>
        </div>

        <div className="tablet-img-div">
          <Image
            src={'/images/tablet.png'}
            alt="Features tile icon 01"
          />
        </div>
      </Box>
    </section>
  );
};

FeatureFreeService.propTypes = propTypes;
FeatureFreeService.defaultProps = defaultProps;

export default FeatureFreeService;
