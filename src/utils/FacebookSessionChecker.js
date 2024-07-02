import { useEffect } from "react";
import HMACObj from "hmac-obj";
import axios from "axios";
import config from "../config";
import { useRouter } from "next/router";
import { FACEBOOK_TOKEN_CHECKER_API_KEY } from "../common/constant";
import { generateAppsecretProof } from "../common/utils";

const FacebookSessionChecker = () => {
  let router = useRouter();

  useEffect(() => {
    // Schedule session validity check every 24 hours
    const intervalId = setInterval(async () => {
      try {
        const facebookToken = localStorage.getItem("facebook-token");
        if (!facebookToken) {
          return;
        }
        const appsecretKey = await generateAppsecretProof(facebookToken);
        const response = await axios.get(FACEBOOK_TOKEN_CHECKER_API_KEY, {
          params: {
            input_token: facebookToken,
            access_token: facebookToken,
            appsecret_proof: appsecretKey,
          },
        });

        if (!response.data.data.is_valid) {
          router.push("/signin"); // redirect to the login page
          localStorage.removeItem("token", "");
        }
      } catch (error) {
        console.error("Error checking session validity:", error);
      }
    }, 24 * 60 * 60 * 1000); // Schedule session validity check every 24 hours

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default FacebookSessionChecker;
