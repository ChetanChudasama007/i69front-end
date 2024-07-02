import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps'; 
import Image from '../elements/Image';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next'; 
import { Box, Grid, Typography } from '@material-ui/core';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomdivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const { t } = useTranslation()
  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  ); 

  

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className='main-advantage'>
        <Box className="advantages">
          <Grid item className="advantage-inner-div">
            <h3 className="mt-0 mb-12 advantage-tag">
              {t('Home.advatages')}
            </h3>
            <div className="best-para-tag" style={{ width: "52%" }}>
              {t('Home.best')}
            </div>
            <p className="m-0 good-place">
              {t('Home.goodPlace')}
            </p>
            <div className='button-main'>
              <Button className='meet-btn' >
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
          <Grid item className={
            classNames(
              'split-item-image center-content-mobile reveal-from-bottom',
              imageFill && 'split-item-image-fill'
            )}
            data-reveal-container=".split-item">

            <div
              className='advantage-round-main'
            >
              <div className='dotted-bg dotted-top'>
                <Image
                  src={'/images/Dot Grid.png'}
                  alt="DotGrid"
                  width={300}
                  height={300} />

              </div>
              <div className='round-bg d-flex'>
                <div className='mainRound-container '>
                  <div className="d-flex round-content round-content round-relationship">
                    <Image
                      src={'/images/Heart.png'}
                      alt="Heart"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className='relText'> {t('Home.relationship')}</p>
                </div>

                <div className='mainRound-new-friend '>
                  <div className="d-flex round-content round-new-frinds">
                    <Image
                      src={'/images/Emoji.png'}
                      alt="Emoji"
                      width={67}
                      height={67}
                    />
                  </div>
                  <p className='newFrndText'> {t('Home.newFriend')}</p>
                </div>
                <Image
                  src={'/images/Logo69.png'}
                  className="Logo-six-nine"
                  alt="Logo69"
                  width={183}
                  height={251}
                />
                <div className='mainRound-room-mates'>
                  <div className="d-flex round-content round-room-mates">
                    <Image
                      src={'/images/Key.png'}
                      alt="Key"
                      width={110}
                      height={110}
                    />
                  </div>
                  <p className='roomText'> {t('Home.Roommates')}</p>
                </div>
                <div className='mainRound-bussiness'>

                  <div className="d-flex round-content round-bussiness">
                    <Image
                      src={'/images/Dollar.png'}
                      alt="Key"
                      width={150}
                      height={150}
                    />
                  </div>
                  <p className='bussinessText'> {t('Home.BusinessContacts')}</p>
                </div>
              </div>
              <div className='dotted-bg dotted-bottom'>
                <Image
                  className='dottBg' src={'/images/Dot Grid.png'}
                  alt="DotGrid"
                  width={300}
                  height={300} />
              </div>
            </div>
          </Grid>
        </Box>
      </div>

     
      {/* <Box className='main-container-fast-reg'>
          <Grid>
            <div className="fast-reg-div">

              <h3 className="fastregText">
                {t('Home.fastRegistration')}
              </h3>
              <h3 className="soc-net-text">
                {t('Home.socialnetwork')}
              </h3>
            </div>
            <div className="main-union-container">
             
              <div className='union-rectangle'>
                <Image
                  src={'/images/FastRegistration.svg'}
                  alt="Union Rectangle"
                  className="union-rectangle-img"
                />
                <div className="fbLogo">
                  <p className='registrationText'> {t('Home.registration')}</p>
                  <div className='social-logo-main'>
                    <p className='text-Uppecase fb-Text'> {t('Home.facebook')}</p>
                    <p className='text-Uppecase google-Text'> {t('Home.google')}</p>
                    <p className='text-Uppecase twitter-Text'> {t('Home.twitter')}</p>

                  </div>
                </div>
                <div className="second-rectangle-main">
                  <p className='registrationText'> {t('Home.communication')}</p>
                  <div className='social-logo-main'>
                    <p className='text-Uppecase'> {t('Home.message')}</p>
                    <p className='text-Uppecase'> {t('Home.gift')}</p>
                    <p className='text-Uppecase'> {t('Home.photos')}</p>
                  </div>
                </div>
              </div>

            </div>
            <div className='user-service-div'>
              <p className='user-service-txt'  >
                {t('Home.useServices')} {t('Home.createProfile')}   {t('Home.improvedCommunication')}
              </p>

            </div>
          </Grid>

        </Box> */}
      <Box className="advantages tablet-bottom-div">
        <Grid item className="advantage-inner-div">
          <div
            className='star-image'
          >
            <Box className='free-service-box'>
              <Typography variant="h6" className="m-0 free-service-txt" >
                {t('Home.freeServices')}
              </Typography>
              <Typography variant="span" className="m-0 women-service-txt">
                {t('Home.womenService')}
              </Typography>
            </Box>

            <div className="send-mail-main">
              <div className="best-para-tag"
              >
                {t('Home.offerServices')} <b>{t('Home.email')}</b>
              </div>
              <div className="best-para-tag attach-copy-main"
              >
                {t('Home.attachCopy')}
              </div>
            </div>
          </div>

        </Grid>
        <Grid item className={
          classNames(
            'split-item-image center-content-mobile reveal-from-bottom',
            imageFill && 'split-item-image-fill'
          )}
          data-reveal-container=".split-item">
          <div className='teble-device-img'>
            <Image
              src={'/images/Subtract.png'}
              alt="Features tile icon 01"
              className="blank-phone-img"
            />

            <div className='rendom-image'>
              <Image
                src={'/images/Rectangle 638.png'}
                alt="Features tile icon 01"
              // className="dispaly-img"
              />
            </div>
          </div>
        </Grid>
      </Box>
      <Grid direction="column" className="advantages filter-main-div">
        <Grid item className='filter-title-main'>
          <div className='grid-container'>
            <Typography variant='h6' className='filter-main-head' >{t('Home.filters')}</Typography>
            <Typography style={{ marginBottom: 20 }} variant='span' className='filter-desc mb-20' >{t('Home.all')}</Typography>
            <div className='sub-text-main-filter'>
              <Typography variant='span' className='filter-desc desc-remark' >{t('Home.seriousRelationship')} {t('Home.searchScreen')} {t('Home.everyone')} {t('Home.advanceFilter')} {t('Home.newFriends')} {t('Home.filtersAppearance')}</Typography>
            </div>
          </div>
        </Grid>
        {/* <Grid item className='filter-image-main' >
            <Image
              src={'/images/casual_dating.png'}
              alt="casual_dating"
             className="cross-image"
             />
            <Image
              src={'/images/new_friends.png'}
              alt="new_friends"
              className="cross-image" />
            <Image
              src={'/images/flirts.png'}
              alt="flirts"
              className="cross-image" />
            <Image
              src={'/images/room_mates.png'}
              alt="room_mates"
              className="cross-image" />
            <Image
              src={'/images/bussiness_contact.png'}
              alt="Features split 02"
              className="cross-image" />
          </Grid> */}
      </Grid>

      {/* <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <h3 className="mt-0 mb-12">
                  {t('Home.fastRegistration')}
                </h3>
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  {t('Home.socialnetwork')}
                </div>

                <p className="m-0">
                  {t('Home.useServices')}
                  {t('Home.createProfile')}
                  {t('Home.improvedCommunication')}
                </p>
                <Button variant="contained" style={{ margin: 50 }} color="secondary" href="https://play.google.com/store/apps/details?id=com.i69.isyxtinine&pli=1&pli=1" target="_blank">
                  {t('Home.download')}
                </Button>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-left',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <div>
                  <Image
                    src={'/images/search.png'}
                    alt="Features split 02"
                    width={200}
                    height={396} />
                </div>

              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div>
                <h3 className="mt-0 mb-12">
                  {t('Home.freeServices')}
                </h3>
                <p className="m-0">
                  {t('Home.offerServices')}

                  {t('Home.email')}

                  {t('Home.attachCopy')}

                </p>
                <Button variant="contained" style={{ margin: 50 }} color="secondary" href="https://play.google.com/store/apps/details?id=com.i69.isyxtinine&pli=1&pli=1" target="_blank">
                  {t('Home.download')}
                </Button>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={'/images/i69-dating.png'}
                  alt="Features split 03"
                  width={287}
                  height={593} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <h3 className="mt-0 mb-12">
                  {t('Home.filters')}
                </h3>
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  {t('Home.all')}
                </div>

                <p className="m-0">
                  {t('Home.seriousRelationship')}

                  {t('Home.searchScreen')}

                  {t('Home.everyone')}
                  {t('Home.advanceFilter')}

                  {t('Homw.newFriends')}
                  {t('Home.filtersAppearance')}
                </p>
                <Button variant="contained" style={{ margin: 50 }} color="secondary" href="https://play.google.com/store/apps/details?id=com.i69.isyxtinine&pli=1&pli=1" target="_blank">
                  {t('Home.download')}
                </Button>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={'/images/models-isixtynine.png'}
                  alt="Features split 02"
                  width={960}
                  height={959} />
              </div>
            </div>

          </div>
        </div>
      </div> */}
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;