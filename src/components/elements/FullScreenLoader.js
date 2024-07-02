import React from "react";
import { CircularProgress } from "@material-ui/core";

const FullScreenLoader = () => {
  return (
    <div
      style={{
        background: "#1c1f2d",
        color: "#fff",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default FullScreenLoader;
