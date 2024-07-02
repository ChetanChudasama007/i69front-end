import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useRef, useState } from "react";

const GoggleUser = ({ setToken, setProviderId }) => {
  const googleLoginRef = useRef(null);
  const isMountedRef = useRef(true);
  const [user, setUser] = useState(null);

  // const handleButtonClick = () => {
  //   console.log("googleLoginRef", googleLoginRef);
  //   if (googleLoginRef.current) {
  //     googleLoginRef.current.onClick();
  //   }
  // };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <>
      {/* <button onClick={handleButtonClick}>LOGIN WITH GOOGLE</button> */}
      {user ? null : (
        <GoogleLogin
          ref={googleLoginRef}
          onSuccess={(credentialResponse) => {
            if (isMountedRef.current) {
              setProviderId("google.com");
              setUser(credentialResponse);
              console.log(credentialResponse);
              setToken(credentialResponse && credentialResponse?.credential);
            }
          }}
          onError={() => {
            if (isMountedRef.current) {
              console.log("Login Failed");
            }
          }}
          text="LOGIN WITH GOOGLE"
          logo_alignment="center"
          type="standard"
          width="100%"
          containerProps={{
            style: {
              width: "100%",
              background: "black",
              color: "white",
              zIndex: 100,
              height: "50px",
              borderRadius: "40px",
              marginTop: "22px",
              height: "58px",
              borderRadius: "400px",
              position: "relative",
              opacity: 0,
              // maxWidth: '340px',
              // display: 'none',
            },
          }}

          // render={({ onClick }) => null}
          // render={renderProps => {
          //  console.log('renderProps',renderProps);
          //  <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          //     <FaGoogle /> Login with Google
          //   </button>
          // }}
        />
      )}
    </>
  );
};

export default GoggleUser;
