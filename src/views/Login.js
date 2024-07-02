import React, { useCallback, useEffect, useRef, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { loginWithFetch } from "../mutation";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useRouter } from "next/router";
import { updateLocation } from "../mutation/update";
import { Box } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { useTranslation } from "react-i18next";
import config from "../config";
import { useMediaQuery } from "react-responsive";
import axiosConfig from "../common/axiosConfig";
// import { useGeolocated } from "react-geolocated";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";

const SignInFailedModal = dynamic(() =>
  import("../components/commons/CustomModal")
);
const FullScreenLoader = dynamic(() =>
  import("../components/elements/FullScreenLoader")
);
const Header = dynamic(() => import("../components/layout/Header"));

const USER_SIGNUP_REGION = gql`
  query picker {
    defaultPicker {
      userSignupRegion {
        id
        loginMethod
        isAllowed
      }
    }
  }
`;

const logoWrapperStyleForDesktop = {
  backgroundImage: `url(/images/loginBackground1.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  objectFit: "cover",
  minWidth: "700px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "20px",
  marginTop: "30px",
};

const logoWrapperStyleForMobile = {
  backgroundImage: `url(/images/loginBackgroundForMobile.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  objectFit: "cover",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: 0,
};

const LoginButton = ({
  title,
  Icon,
  imgIcon = false,
  bgColor,
  sx,
  onClick,
}) => {
  return (
    <Box
      sx={{
        mt: 2,
        border: "4px solid #838285",
        borderRadius: "400px",
        width: "fit-content",
        ...sx,
      }}
      onClick={onClick}
    >
      <button
        className="login-button"
        style={{ backgroundColor: bgColor, borderColor: bgColor }}
      >
        <img
          src={`/images/vector1.svg`}
          style={{ position: "absolute", top: 0, width: "100%" }}
        />
        {/* <img src='/images/i69app-logo-only.png' style={{ height: '30px', width: '30px', marginLeft: '15px' }} /> */}
        {imgIcon ? (
          <img
            src={`/images/${Icon}`}
            alt="i69-icon"
            style={{ height: "30px", width: "30px", marginLeft: "15px" }}
          />
        ) : (
          <Icon sx={{ ml: "15px" }} />
        )}
        <img
          src="/images/verticalGradiantBorderLine.svg"
          style={{ height: "48px", width: "20px" }}
        />
        <span>{title}</span>
      </button>
    </Box>
  );
};

const Login = () => {
  const [auth, setAuth] = useState(null);
  const [reload, setReload] = useState(false);
  const [token, setToken] = useState("");
  const [provider, setProvider] = useState("facebook.com");
  const [response, setResponse] = useState(null);
  const [userId, setUserId] = useState();
  const [intrest, setIntrest] = useState();
  const { i18n, t } = useTranslation();
  const isMobileVersion = useMediaQuery({ query: "(max-width: 767px)" });
  const [isLoading, setLoading] = useState(false);
  const [getUserSignUpRegion, { data, error, loading }] =
    useLazyQuery(USER_SIGNUP_REGION);
  const [userSignupMethodList, setUserSignupMethodList] = useState([]);
  const googleButtonContainerRef = useRef(null);
  const [isShownSignInErrorModal, setShownSignInErrorModal] = useState(false);
  const [isSdkLoaded, setSdkLoaded] = useState(true);
  const [redraw, setRedraw] = useState(1);

  // const { coords } = useGeolocated({
  //   positionOptions: {
  //     enableHighAccuracy: true,
  //   },
  //   userDecisionTimeout: 5000,
  // });

  useEffect(() => {
    // getLocation();
    getUserSignUpRegion();
    const isErrorSignInPage = localStorage.getItem("isErrorSignInPage");
    if (isErrorSignInPage) {
      setShownSignInErrorModal(isErrorSignInPage);
    }
  }, []);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  React.useEffect(() => {
    if (!isSdkLoaded && redraw) {
      (async () => {
        try {
          window?.fbAsyncInit?.();
        } catch (e) {
          console.log("error in facebook load", e);
        }
        setRedraw(getRandomInt(1, 1000));
      })();
    }
  }, [isSdkLoaded, redraw]);

  console.log("userSignupRegion", data?.defaultPicker?.userSignupRegion);

  const handleSuccess = (credentialResponse) => {
    console.log("credentialResponse value", credentialResponse);
    setProvider("google.com");
    setToken(credentialResponse && credentialResponse?.credential);
  };

  const handleError = (error) => {
    console.error("Login Failed:", error);
  };

  const handleCustomButtonClick = () => {
    if (googleButtonContainerRef.current) {
      const googleButton =
        googleButtonContainerRef.current.querySelector('div[role="button"]');
      if (googleButton) {
        googleButton.click();
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (googleButtonContainerRef.current) {
        const googleButton =
          googleButtonContainerRef.current.querySelector('div[role="button"]');
        if (googleButton) {
          clearInterval(intervalId);
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const router = useRouter();
  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoading(true);
    const latValue = localStorage.getItem("lat");
    const longValue = localStorage.getItem("long");
    axiosConfig
      .get(`api/user/user-signup-method/`, {
        params: {
          lat: latValue ? latValue : null,
          long: longValue ? longValue : null,
        },
      })
      .then((response) => {
        if (response && response.status === 200) {
          setLoading(false);
          setUserSignupMethodList(
            response?.data?.data?.sort((a, b) =>
              a?.login_method.localeCompare(b?.login_method)
            )
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }, []);

  const getLocation = () => {
    setLoad(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoad(false);
        },
        (error) => {
          console.log(error);
          setLoad(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoad(false);
    }
  };

  const fetchLocation = async () => {
    try {
      if (userId && latitude !== null && longitude !== null) {
        const response = await updateLocation({
          id: userId,
          location: [latitude, longitude],
        });
        if (response) {
          setIntrest(response?.data?.updateProfile?.interestedIn);
          console.log(response, "location api");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await loginWithFetch({
          accessToken: token,
          accessVerifier: "",
          provider: provider,
        });

        // Handle the response here
        console.log(token);
        console.log(provider);
        console.log("Response from loginWithFetch:", result?.data);
        if (
          result &&
          token &&
          result?.data?.socialAuth?.token &&
          result?.data?.socialAuth?.id
        ) {
          localStorage.setItem("token", result?.data?.socialAuth?.token);
          localStorage.setItem(
            "refresh-token",
            result?.data?.socialAuth?.refreshToken
          );
          localStorage.setItem("userId", result?.data?.socialAuth?.id);
          getLocation();
          if (result?.data?.socialAuth?.isNew) router.push("/intrested");
          else router.push("/");
        } else {
          alert("You are no authorized ! Retry");
          console.log(error);
        }
      } catch (error) {
        // Handle errors
        console.error("Error during loginWithFetch:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, loginWithFetch]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchLocation();
    }
  }, [load, token, loginWithFetch]);

  const responseFacebook = (response) => {
    console.log("facebook response.");
    console.log(response);
    setToken(response && response?.accessToken);
    setProvider(response && "facebook.com");
    console.log(provider, "provider");
    setResponse(response);
    localStorage.setItem("facebook-token", response?.accessToken);
  };

  const handleEmailLoginButton = () => {
    router.push("/signin-email");
  };

  const handlePhoneNumberLoginButton = () => {
    router.push("/signin-phonenumber");
  }

  const getSignUpButton = useCallback(() => {
    if (userSignupMethodList && userSignupMethodList.length === 0) return;
    return userSignupMethodList
      .filter((x) => x.is_allowed)
      .map((item) => {
        switch (item.login_method) {
          case "Google":
            return (
              <>
                <LoginButton
                  Icon={GoogleIcon}
                  title={t("Login.loginGoogle")}
                  bgColor="#D54831"
                  onClick={handleCustomButtonClick}
                />
                <div ref={googleButtonContainerRef} style={{ display: "none" }}>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </div>
              </>
            );
          case "Facebook":
            return (
              <FacebookLogin
                appId={config.facebookAppId}
                autoLoad={false}
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                fields="name,email,picture"
                render={(renderProps) => {
                  setSdkLoaded(renderProps.isSdkLoaded);
                  if (!renderProps.isSdkLoaded) return <div>Loading...</div>;
                  else {
                    return (
                      <LoginButton
                        Icon={FacebookRoundedIcon}
                        title={t("Login.loginFacebook")}
                        bgColor="#243488"
                        onClick={renderProps.onClick}
                      />
                    );
                  }
                }}
              />
            );
          case "Email":
            return (
              <LoginButton
                onClick={() => handleEmailLoginButton()}
                Icon="i69app-logo-only.svg"
                imgIcon
                title={t("Login.loginEmail")}
                bgColor="#0060AC"
              />
            );

          case "PhoneNumber":
            return (
              <LoginButton
                onClick={() => handlePhoneNumberLoginButton()}
                Icon="i69app-logo-only.svg"
                imgIcon
                title={t("Login.loginPhoneNumber")}
                bgColor="#0060AC"
              />
            );

          default:
            return null;
        }
      });
  }, [userSignupMethodList]);

  const handleSignInErrorButton = () => {
    setShownSignInErrorModal(false);
    router.push("/contactUs");
    localStorage.setItem("isErrorSignInPage", true);
  };

  return isLoading ? (
    <FullScreenLoader />
  ) : (
    <>
      <main>
        <div style={{ position: "fixed", width: "100%", zIndex: "1000" }}>
          <Header />
        </div>
        <div
          style={{
            backgroundImage: `url(/images/hero5bg.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 101%",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ p: isMobileVersion ? 0 : 2 }}>
            <Box
              sx={
                isMobileVersion
                  ? logoWrapperStyleForMobile
                  : logoWrapperStyleForDesktop
              }
            >
              {isMobileVersion ? (
                <>
                  <img
                    src="/images/mobileLogo.png"
                    alt=""
                    style={{ width: "70%", height: "40%", marginTop: "8%" }}
                  />
                  <img src="/images/mobileText.svg" alt="" />
                </>
              ) : (
                <img
                  src="/images/i69app-logo-large.png"
                  alt=""
                  style={{ height: "210px", marginTop: "50px" }}
                />
              )}
              <Box sx={isMobileVersion ? { mb: 1, height: "50%" } : { mt: 2 }}>
                {getSignUpButton()}
              </Box>
              <p className="login-footer-text">
                {t("Login.footerCopyright")}
                <a href="">{t("Terms.termsAndConditions")}</a>
                {t("Home.and")}
                <a href="">{t("Policy.privacyPolicy")}</a>
              </p>
            </Box>
          </Box>
        </div>
      </main>
      {isShownSignInErrorModal && (
        <SignInFailedModal
          handleActionButton={handleSignInErrorButton}
          buttonLabel={"Ok"}
        >
          <Typography
            style={{
              fontSize: "16px",
              textAlign: "center",
              color: "black",
              marginTop: "24px",
            }}
          >
            Sign In Failed! You have deleted your profile. Please contact us to
            re-join.
          </Typography>
        </SignInFailedModal>
      )}
    </>
  );
};

export default Login;
