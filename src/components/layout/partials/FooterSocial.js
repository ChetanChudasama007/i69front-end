import React from 'react';
import classNames from 'classnames';
import Image from '../../elements/Image';

const FooterSocial = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-social social-icon-footer',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <a href="https://www.facebook.com/i69.Social/?modal=admin_todo_tour">
            <Image
              src={'/images/flat_facebook.png'}
              alt="Open"
              className="social-media-icon" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/Treasur02293879">
            <Image
              src={'/images/flat_twitter.png'}
              alt="Open"
              className="social-media-icon" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCgGyWsGMOqXITHlJfUQQg6g?view_as=subscriber">
            <Image
              src={'/images/flat_youtube.png'}
              alt="Open"
              className="social-media-icon" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/i69social/">
            <Image
              src={'/images/flat_instagram.png'}
              alt="Open"
              className="social-media-icon" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FooterSocial;