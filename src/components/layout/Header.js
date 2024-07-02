import React, { useState, useRef, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "next/link";
import Logo from "./partials/Logo";
import { useTranslation } from "react-i18next";
import "../../services/localizationService";
import I69Link from "../elements/i69Link";
import Image2 from "../elements/Image";
import DropDown from "../../assets/images/dd.png";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { logout_user } from "../../../redux/actions/user";
import { connect } from "react-redux";
import { LanguageArray } from "../../utils/SectionProps";
import { getClientIpDetails } from "../../Actions";
import { useRouter } from "next/dist/client/router";

const propTypes = {
  navposition: PropTypes.string,
  hideNav: PropTypes.bool,
  hidesignin: PropTypes.bool,
  hidesignup: PropTypes.bool,
  bottomouterdivider: PropTypes.bool,
  bottomdivider: PropTypes.bool,
  latValue: PropTypes.string,
  longValue: PropTypes.string,
  isShownLocationAllowModal: PropTypes.bool,
};

const defaultProps = {
  navposition: "",
  hideNav: false,
  hidesignin: false,
  hidesignup: false,
  bottomouterdivider: false,
  bottomdivider: false,
  latValue: "",
  longValue: "",
  isShownLocationAllowModal: false,
};

const Header = (props) => {
  const {
    className,
    navposition,
    hideNav,
    hidesignin,
    hidesignup,
    bottomouterdivider,
    bottomdivider,
    latValue,
    longValue,
    isShownLocationAllowModal,
    // ...props
  } = props;
  // redux action
  const router = useRouter();
  const { i18n, t } = useTranslation();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [language, setLanguage] = useState("En");
  const [loader, setLoader] = useState(false);
  const [isDisableLoginButton, setDisabledLoginButton] = useState(false);

  useEffect(() => {
    if (router && router.locale) {
      const finditem = LanguageArray.find(
        (item) => item.value === router.locale
      );
      if (finditem) {
        setLanguage(finditem.label);
      }
    }
  }, []);

  const handleChange = (e) => {
    setLoader(true);
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  const selectCountry = (languages) => {
    const language = languages?.split(",")[0]?.toLowerCase();
    const getLang = LanguageArray.find((lang) => lang.value === language) || {
      label: "En",
      value: "en",
    };
    if (getLang) {
      // i18n.changeLanguage(getLang.label);
      setLanguage(getLang.label);
    }
  };

  useEffect(() => {
    getClientIpDetails().then(({ data }) => {
      data && selectCountry(data.languages);
    });
  }, []);

  useEffect(() => {
    const latValueState = localStorage.getItem("lat");
    const longValueState = localStorage.getItem("long");
    if (
      isShownLocationAllowModal &&
      !latValue &&
      !longValue &&
      !latValueState &&
      !longValueState
    ) {
      setDisabledLoginButton(true);
    } else {
      setDisabledLoginButton(false);
    }
  }, [latValue, longValue, isShownLocationAllowModal]);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  // useLayoutEffect(() => {
  //   window.addEventListener('click', forceUpdate);

  //   return () => window.removeEventListener('click', forceUpdate);
  // }, []);

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const logout = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    props?.logout_user();
    setIsactive(false);
  };

  const profile = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current ||
      document.body === e.target
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomouterdivider && "has-bottom-divider",
    className
  );

  const changeLanguage = (e) => {
    window.changeLanguage(e.target.dataset.language);
    window.addEventListener("click", forceUpdate);
  };

  return (
    <header {...props} className={classes}>
      <div>
        <div
          className={classNames(
            "site-header-inner",
            bottomdivider ? "has-bottom-divider" : ""
          )}
        >
          <div className="site-header-logo">
            <Logo />
          </div>
          <div>
            {!hideNav && (
              <>
                <button
                  ref={hamburger}
                  className="header-nav-toggle"
                  onClick={isActive ? closeMenu : openMenu}
                >
                  <span className="screen-reader">{t("Home.Menu")}</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
                <nav
                  ref={nav}
                  className={classNames("header-nav", isActive && "is-active")}
                >
                  <div className="header-nav-inner">
                    <div className="header-nav-scroll">
                      <ul
                        id="menuListWrapper"
                        className={classNames(
                          "list-reset text-xs",
                          navposition && `header-nav-${navposition}`
                        )}
                        style={{ marginLeft: "0px" }}
                      >
                        <li>
                          <Box
                            sx={{
                              minWidth: 120,
                            }}
                          >
                            <FormControl
                              fullWidth
                              classes={{ root: "langBg", MuiInput: "123123" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <Image2
                                    src={"../images/language.svg"}
                                    alt="Language"
                                    style={{
                                      height: "32px",
                                      width: "32px",
                                    }}
                                  />
                                </div>
                                <div>
                                  <Select
                                    labelId="languageSelect"
                                    id="languageSelect"
                                    value={language}
                                    label="Language"
                                    onChange={handleChange}
                                    placeholder="Language"
                                    classes={{
                                      root: "input-select",
                                      MuiInput: "112313",
                                    }}
                                    style={{ padding: "0" }}
                                    MenuProps={{
                                      className: "menu-outbox",
                                      MenuListProps: {
                                        className: "213212313",
                                        disablePadding: true,
                                      },
                                    }}
                                  >
                                    <MenuItem
                                      disabled
                                      selected
                                      value="Language"
                                    >
                                      <em>Language</em>
                                    </MenuItem>
                                    {LanguageArray &&
                                      LanguageArray?.sort((a, b) =>
                                        a?.label.localeCompare(b?.label)
                                      )?.map((i, index) => (
                                        <MenuItem key={index} value={i.label}>
                                          <I69Link
                                            className="dropDownMenuWrapper"
                                            locale={i.value}
                                            href=""
                                          >
                                            <img
                                              loading="lazy"
                                              src={i.image.src}
                                              width={20}
                                              height={20}
                                              alt="flag"
                                            />
                                            <span className="imageFlage">
                                              {i.label}
                                            </span>
                                          </I69Link>
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </div>
                              </div>
                            </FormControl>
                          </Box>
                        </li>

                        <li style={{ marginTop: "20px" }}>
                          <p className="header-bold-txt" onClick={closeMenu}>
                            <Link
                              style={{ color: "white" }}
                              href="/contactUs"
                              legacyBehavior
                            >
                              <div style={{ color: "white" }}>
                                {t("Home.ContactUs")}
                              </div>
                            </Link>
                          </p>
                        </li>
                        <li style={{ marginTop: "20px" }}>
                          <p className="header-bold-txt" onClick={closeMenu}>
                            <Link href="/faq" legacyBehavior>
                              <div style={{ color: "white" }}>
                                {t("Home.FAQ")}
                              </div>
                            </Link>
                          </p>
                        </li>
                        <li style={{ marginTop: "20px" }}>
                          <p className="header-bold-txt" onClick={closeMenu}>
                            <Link href="/policy" legacyBehavior>
                              <div style={{ color: "white" }}>
                                {t("Home.Policy")}
                              </div>
                            </Link>
                          </p>
                        </li>
                        <li style={{ marginTop: "20px" }}>
                          <p className="header-bold-txt" onClick={closeMenu}>
                            <Link href="/terms" legacyBehavior>
                              <div style={{ color: "white" }}>
                                {t("Home.Terms")}
                              </div>
                            </Link>
                          </p>
                        </li>
                        <li className="nav-item py-lg-0 py-3">
                          <Link href="/signin" legacyBehavior>
                            {/* <button style={{ background: '#E2C76E', width: '100px', color: 'black', fontSize: '18px', fontWeight: '600', borderRadius: '5px' }}>{t("Home.Login")}</button> */}
                            {/* <Box sx={{ border: '3px solid #ffffff', borderRadius: '400px', width: 'fit-content' }} > */}
                            <Box
                              sx={{
                                border: "1px solid #ffffff",
                                borderRadius: "400px",
                                width: "fit-content",
                              }}
                            >
                              {/* <div className="login-header-btn-border-bg" /> */}
                              <button
                                style={{
                                  backgroundColor: "#AEA597",
                                  borderColor: "#AEA597",
                                  border: "2px solid #212529",
                                  borderRadius: "400px",
                                  width: "112px",
                                  height: "36px",
                                  position: "relative",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                }}
                                disabled={isDisableLoginButton}
                              >
                                <img
                                  src={`/images/vector2.svg`}
                                  alt=""
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    width: "100%",
                                  }}
                                />
                                <span>{t("Home.Login")}</span>
                              </button>
                            </Box>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default connect(null, { logout_user })(Header);
