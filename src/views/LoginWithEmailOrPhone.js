import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Snackbar } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import config from "../config";
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";
import { loginWithFetch } from "../mutation";
import axiosConfig from "../common/axiosConfig";
import { GoogleLogin } from "@react-oauth/google";
import { updateLocation } from "../mutation/update";
import dynamic from "next/dynamic";
const LoginStepOne = dynamic(() => import("./login/LoginStepOne"));
const LoginStepTwo = dynamic(() => import("./login/LoginStepTwo"));
const Header = dynamic(() => import("../components/layout/Header"));

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
  paddingBottom: "10px",
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

const loginWrapperContainerDesktop = {
  backgroundImage: `url(/images/hero5bg.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 101%",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loginWrapperContainerMobile = {
  backgroundImage: `url(/images/hero5bg.png)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 101%",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
  display: "block",
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

const LoginWithEmailOrPhone = () => {
  const { t } = useTranslation();
  const isMobileVersion = useMediaQuery({ query: "(max-width: 767px)" });
  const [currentLoginStep, setCurrentLoginStep] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isShownSnackbar, setShownSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();
  const [token, setToken] = useState("");
  const [provider, setProvider] = useState("facebook.com");
  const [response, setResponse] = useState(null);
  const [userId, setUserId] = useState();
  const [intrest, setIntrest] = useState();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [load, setLoad] = useState(false);
  const [userSignupMethodList, setUserSignupMethodList] = useState([]);
  const googleButtonContainerRef = useRef(null);
  const [emailExists, setEmailExists] = useState(true);
  const [isDeletedProfile, setDeletedProfile] = useState(false);
  const [isCheckEmailLoading, setCheckEmailLoading] = useState(false);
  const [isCheckPhoneNumberLoading, setCheckPhoneNumberLoading] =
    useState(false);
  const isSignInPhoneNumber = router.asPath.includes("signin-phonenumber");
  const [phoneNumberExists, setPhoneNumberExists] = useState(true);

  const handleSuccess = (credentialResponse) => {
    console.log("credentialResponse", credentialResponse);
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

  const handleLoginOneSuccessRes = (emailOrPhone, data) => {
    if (isSignInPhoneNumber) {
      setPhone(emailOrPhone);
    } else {
      setEmail(emailOrPhone);
    }
    setCurrentLoginStep(currentLoginStep + 1);
    setShownSnackbar(true);
    setSnackbarMessage(data?.message);
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
    const latValue = localStorage.getItem("lat");
    const longValue = localStorage.getItem("long");
    axiosConfig
      .get(`api/user/user-signup-method/`, {
        params: {
          lat: latValue,
          long: longValue,
        },
      })
      .then((response) => {
        if (response && response.status === 200) {
          setUserSignupMethodList(
            response?.data?.data?.sort((a, b) =>
              a.login_method.localeCompare(b.login_method)
            )
          );
        }
      })
      .catch((error) => {
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
      return;
    }
    getLocation();
  }, [load, token]);

  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const handleLoginSecondSuccessRes = (value) => {
    localStorage.setItem("token", value?.key);
    localStorage.setItem("userId", value?.user?.id);
    setUserId(value?.user?.id);
    getLocation();
    localStorage.setItem("refresh-token", value?.refresh_token);
    if (!value.user.interested_in) {
      router.push("/intrested");
    } else {
      router.push("/");
    }
  };

  const checkEmailExists = async (email) => {
    if (!email) {
      setEmailExists(true);
      return;
    }
    setCheckEmailLoading(true);
    try {
      const response = await axiosConfig.post("api/user/check-email/", {
        email,
      });
      if (response && response.status === 200) {
        setEmailExists(response?.data?.isEmailExists);
        setDeletedProfile(response?.data?.isDeletedProfile);
      }
      setCheckEmailLoading(false);
    } catch (error) {
      setEmailExists(true);
      console.log("error", error);
      setCheckEmailLoading(false);
    }
  };

  const checkPhoneNumberExists = async (phoneNumber) => {
    if (!phoneNumber) {
      setPhoneNumberExists(true);
      return;
    }
    setCheckPhoneNumberLoading(true);
    try {
      const response = await axiosConfig.post("api/user/check-phone-number/", {
        phone_number: phoneNumber,
      });
      if (response && response.status === 200) {
        setPhoneNumberExists(response?.data?.isPhoneNumberExist);
        setDeletedProfile(response?.data?.isDeletedProfile);
      }
      setCheckPhoneNumberLoading(false);
    } catch (error) {
      setPhoneNumberExists(true);
      console.log("error", error);
      setCheckPhoneNumberLoading(false);
    }
  };

  const getFormContent = useCallback(() => {
    switch (currentLoginStep) {
      case 0:
        return (
          <LoginStepOne
            emailExists={emailExists}
            isDeletedProfile={isDeletedProfile}
            handleLoginOneSuccessRes={handleLoginOneSuccessRes}
            checkEmailExists={checkEmailExists}
            isCheckEmailLoading={isCheckEmailLoading}
            isSignInPhoneNumber={isSignInPhoneNumber}
            phoneNumberExists={phoneNumberExists}
            checkPhoneNumberExists={checkPhoneNumberExists}
            isCheckPhoneNumberLoading={isCheckPhoneNumberLoading}
          />
        );
      case 1:
        return (
          <LoginStepTwo
            handleLoginSecondSuccessRes={handleLoginSecondSuccessRes}
            email={email}
            emailExists={emailExists}
            phone={phone}
            phoneNumberExists={phoneNumberExists}
            isSignInPhoneNumber={isSignInPhoneNumber}
          />
        );
      default:
        return "";
    }
  }, [
    currentLoginStep,
    emailExists,
    email,
    isCheckEmailLoading,
    isCheckPhoneNumberLoading,
    phoneNumberExists,
    phone,
  ]);

  const responseFacebook = (response) => {
    console.log("facebook response.");
    console.log(response);
    setToken(response && response?.accessToken);
    setProvider(response && "facebook.com");
    console.log(provider, "provider");
    setResponse(response);
    localStorage.setItem("facebook-token", response?.accessToken);
  };

  return (
    <>
      <main>
        <div style={{ position: "fixed", width: "100%", zIndex: "1000" }}>
          <Header />
        </div>
        <div
          style={
            isMobileVersion
              ? loginWrapperContainerMobile
              : loginWrapperContainerDesktop
          }
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
              <Box
                sx={
                  isMobileVersion
                    ? { mb: 1, mt: 1, height: "20%", width: "90%" }
                    : { mt: 0, width: "50%" }
                }
              >
                {getFormContent()}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <a
                    href="/forgot"
                    style={{
                      color: "#2072c7",
                      fontSize: "14px",
                      cursor: "pointer",
                      marginTop: "10px",
                      fontWeight: 700,
                    }}
                  >
                    (Forgot password)
                  </a>
                </div>
              </Box>
              <div className="or-seperator">
                <i>OR</i>
              </div>
              {userSignupMethodList &&
                userSignupMethodList.length > 0 &&
                userSignupMethodList
                  .filter((x) => x.is_allowed)
                  .map((item) => {
                    if (item?.login_method === "Google") {
                      return (
                        <>
                          <LoginButton
                            Icon={GoogleIcon}
                            title={t("Login.loginGoogle")}
                            bgColor="#D54831"
                            sx={{ position: "relative" }}
                            onClick={handleCustomButtonClick}
                          />
                          <div
                            ref={googleButtonContainerRef}
                            style={{ display: "none" }}
                          >
                            <GoogleLogin
                              onSuccess={handleSuccess}
                              onError={handleError}
                            />
                          </div>
                        </>
                      );
                    } else if (item?.login_method === "Facebook") {
                      return (
                        <FacebookLogin
                          appId={config.facebookAppId}
                          autoLoad={false}
                          callback={responseFacebook}
                          cssClass="my-facebook-button-class"
                          fields="name,email,picture"
                          render={(renderProps) => (
                            <LoginButton
                              Icon={FacebookRoundedIcon}
                              title={t("Login.loginFacebook")}
                              bgColor="#243488"
                              onClick={renderProps.onClick}
                            />
                          )}
                        />
                      );
                    } else {
                      // other cases
                    }
                  })}
            </Box>
          </Box>
        </div>
      </main>
      <Snackbar
        open={isShownSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        onClose={() => setShownSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default LoginWithEmailOrPhone;
