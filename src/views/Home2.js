import Navbar from "../layouts/Navbar";
import { Box, Typography, styled } from "@mui/material";
import { useRouter } from "next/router";
import { NotificationIcon } from "../components/elements/SvgIcons";
import { useEffect, useState } from "react";
import HomeScreen from "./home/HomeScreen";
import ShareMomentScreen from "./home/ShareMomentScreen";
import ClearIcon from "@mui/icons-material/Clear";
import { gql, useLazyQuery } from "@apollo/client";

// ============= Queries =============
const USER_QUERY = gql`
  query user($id: String!) {
    user(id: $id) {
      username
      fullName
      coins
      avatarPhotos {
        url
      }
    }
  }
`;

const USER_STORY_MOMENT_LIST_QUERY = gql`
  query {
    storyMomentList {
      id
      methodName
      userCountry
      isAllowed
    }
  }
`;

// ============= Styled Components =============
export const AvatarWrapper = styled(Box)({
  margin: "5px",
  width: "fit-content",
  height: "fit-content",
  border: "1px solid #FFD778",
  borderRadius: "50%",
});

export const Avatar = styled("img")({
  height: "30px",
  width: "30px",
  maxWidth: "30px",
  maxHeight: "30px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const CircledCrossIcon = styled(ClearIcon)({
  height: "22.5px",
  width: "22.5px",
  color: "#ffffff",
  position: "absolute",
  padding: "4px",
  background: "#212427",
  border: "1px solid #ffffff",
  borderRadius: "50%",
  cursor: "pointer",
});

const Home2 = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [userId, setUserId] = useState();

  const router = useRouter();
  const [getUserData, { data, error, loading }] = useLazyQuery(USER_QUERY);

  const [getStoryMomentList, { data: userStoryMomentList }] = useLazyQuery(
    USER_STORY_MOMENT_LIST_QUERY
  );

  useEffect(() => {
    getStoryMomentList();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserData({
        variables: {
          id: userId,
        },
      });
    }
  }, [userId]);

  const ActivateShareMomentScreen = () => setCurrentScreen("shareMoment");

  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  return (
    <>
        <div className="my-profile-wrapper fixed-position">
        {/* <Navbar
          customTab={{
            name: "shareMoment",
            active: currentScreen === "shareMoment",
            callback: ActivateShareMomentScreen,
          }}
          userStoryMomentList={userStoryMomentList?.storyMomentList}
        /> */}
        {/* ================== Header ================ */}
        <Box
          className="header-control header-gold interests-header"
          sx={{ justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {currentScreen === "home" ? (
              <i
                onClick={() => router.back()}
                className="fa fa-angle-left "
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => setCurrentScreen("home")}
                className="fa fa-angle-left "
                aria-hidden="true"
              ></i>
            )}
            {currentScreen !== "shareMoment" && (
              <div className="profile_avtar">
                <img
                  src={data?.user?.avatarPhotos[0]?.url}
                  style={{ height: "45px", width: "45px", borderRadius: "50%" }}
                  alt="avatar"
                />
              </div>
            )}
            <Typography
              sx={{
                color: "#070707",
                fontSize: "22px",
                fontWeight: 700,
                fontFamily: "Open Sans",
              }}
            >
              {currentScreen !== "shareMoment"
                ? data?.user?.fullName
                : "Share a moment"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <NotificationIcon />
            <div className="profile_avtar">
              <img
              alt="Avatar"
                src="./images/i69Avatar.png"
                style={{ height: "40px", width: "40px", borderRadius: "50%" }}
              />
            </div>
          </Box>
        </Box>

        {/* ==================== Body ================== */}
        <Box className="texture-01 interested-in-container">
          {currentScreen === "home" && (
            <HomeScreen
              setCurrentScreen={setCurrentScreen}
              userData={data}
              userStoryMomentList={userStoryMomentList?.storyMomentList}
            />
          )}
          {currentScreen === "shareMoment" && (
            <ShareMomentScreen setCurrentScreen={setCurrentScreen} />
          )}
        </Box>
      </div>
    </>
  );
};

export default Home2;
