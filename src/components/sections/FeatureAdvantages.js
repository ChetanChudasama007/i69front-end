import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import { useTranslation } from "react-i18next";
import { Box, Grid, Button,Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeatureAdvantages = ({
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
  const router = useRouter();
  const { t } = useTranslation();
  const outerClasses = classNames(
    "features-tiles section features-advantages",
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
      <div className='container main-advantage'>
        <Box className="advantages">
          <Grid item className="advantage-inner-div">
            <h3 className="mt-0 mb-12 advantage-tag">
              {t('Home.advatages')}
            </h3>
            <div className="best-para-tag" >
              {t('Home.best')}
            </div>
            <p className="m-0 good-place">
              {t('Home.goodPlace')}
            </p>
            <div className='button-main'>
              <Button className={router.locale === "de" ? 'meet-btn soulmate-btn de-soulmate-btn':'meet-btn soulmate-btn'} >
                {t('Home.Soulmate')}
              </Button>
              <Button className='meet-btn'>
                {t('Home.Friends')}
              </Button>
              <div className='subMeet-btn'>
                <Button className='meet-btn'>
                  {t('Home.Roommates')}
                </Button>
              </div>
              <Button className='meet-btn'>
                {t('Home.BusinessContacts')}
              </Button>
            </div>
          </Grid>
          <Grid item className="a"
            data-reveal-container=".split-item">

            <div
              className='advantage-round-main'
            >
              <div className='dotted-bg dotted-top'>
                <Image
                  src={'/images/Dot Grid.png'}
                  alt="DotGrid"
                  className='dottBg' />

              </div>
              <div className='round-bg d-flex'>
                <div className='mainRound-container '>
                  <div className="d-flex round-content round-relationship">
                    <Image
                      src={'/images/Heart.png'}
                      alt="Heart"
                      className="heart-img"
                    />
                  </div>
                  <Typography varient="span" className='relText'> {t('Home.relationship')}</Typography>
                </div>

                <div className={router.locale === "ln" ? 'ln-mainRound-new-friend':'mainRound-new-friend'}>
                  <div className="d-flex round-content round-new-frinds">
                    <Image
                      src={'/images/Emoji.png'}
                      alt="Emoji"
                      className="emoji-img"
                    />
                  </div>
                  <Typography varient="span" className='relText'> {t('Home.newFriend')}</Typography>
                </div>
                <Image
                  src={'/images/Logo69.png'}
                  className="Logo-six-nine"
                  alt="Logo69" 
                />
                <div className={router.locale === "ln" ? 'ln-mainRound-room-mates':'mainRound-room-mates'}>
                  <div className="d-flex round-content round-room-mates">
                    <Image
                      src={'/images/Key.png'}
                      alt="Key"
                      className="roommate-img"
                    />
                  </div>
                  <Typography varient="span" className={router.locale === "ln" ? 'ln-relText':'relText'}> {t('Home.Roommates')}</Typography>
                </div>
                <div className='mainRound-bussiness'>

                  <div className="d-flex round-content round-bussiness">
                    <Image
                      src={'/images/Dollar.png'}
                      alt="Key"
                      className='dollar-img'
                    />
                  </div>
                  <Typography varient="span" className='relText business-background'> {t('Home.BusinessContacts')}</Typography>
                </div>
              </div>
              <div className='dotted-bg dotted-bottom'>
                <Image
                  className='dottBg' src={'/images/Dot Grid.png'}
                  alt="DotGrid"
                   />
              </div>
            </div>
          </Grid>
        </Box>
      </div>
    </section>
  );
};

FeatureAdvantages.propTypes = propTypes;
FeatureAdvantages.defaultProps = defaultProps;

export default FeatureAdvantages;
