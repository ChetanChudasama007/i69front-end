import React from 'react';
import classNames from 'classnames';
import { useTranslation } from "react-i18next";
// import { Link } from 'react-router-dom';
import Link from "next/link";

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  const { t } = useTranslation();

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li className="link-tag">
          <Link href="/" legacyBehavior><a>
            {t("Home.Home")}
          </a>
          </Link>
        </li>
        <li className="link-tag">
          <Link href="/faq" legacyBehavior>
            <a>
              {t("Home.FAQ")}
            </a>
          </Link>
        </li>
        <li className="link-tag">
          <Link href="/policy" legacyBehavior>
            <a>
              {t("Home.Policy")}
            </a>
          </Link>
        </li>
        <li className="link-tag">
          <Link href="/terms" legacyBehavior>
            <a>

              {t("Home.Terms")}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;