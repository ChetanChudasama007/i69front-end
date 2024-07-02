import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '../elements/Image';
import FooterNav from './partials/FooterNav';
import FooterSocial from './partials/FooterSocial';
import { useTranslation } from 'react-i18next';

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool
}

const defaultProps = {
  topOuterDivider: false,
  topDivider: false
}

const Footer = ({
  className,
  topOuterDivider,
  topDivider,
  ...props
}) => {
  const { t } = useTranslation();

  const classes = classNames(
    'site-footer center-content-mobile footer-main-class',
    topOuterDivider && 'has-top-divider',
    className
  );

  return (
    <footer
      {...props}
      className={classes}
      style={{position:"relative",zIndex:2}}
    >
      {/* <div className="container">
        <div className={
          classNames(
            'site-footer-inner',
            topDivider && 'has-top-divider'
          )}>
          <div className="footer-top space-between text-xxs">
            <Logo />

          </div>
          <div className="footer-bottom space-between text-xxs invert-order-desktop">
          </div>
        </div>
      </div> */}
      <div className="footer-main-div">

        {/* <FooterSocial /> */}

        {/* <div className="footer-logo-div">
          <Image
            src={'/images/footerLogo.png'}
            alt="Features tile icon 01"
            className="footer-logo-img"
          />
          <div className="footer-copyright">{t("Home.footerCopyright")} </div>
        </div> */}

        {/* <FooterNav /> */}


      </div>

    </footer>
  );
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;