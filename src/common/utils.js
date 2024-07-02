import HMACObj from "hmac-obj";
import config from "../config";
import { USER_NAME_ELLIPSIS } from "./constant";

export const googlePlayStoreImage = () => {};

export const generateAppsecretProof = async (token) => {
  const appsecret_proof = await HMACObj.new(
    config.facebooksecreateKey,
    token,
    "SHA-256"
  );
  if (appsecret_proof) {
    return appsecret_proof.hexdigest();
  }
  return "";
};

export const getEllipsisText = (text) => {
  return text.length > USER_NAME_ELLIPSIS
    ? text.substring(0, USER_NAME_ELLIPSIS - 3) + "..."
    : text;
};

export const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position", position);
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("long", position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};
