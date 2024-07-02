import React, { useEffect, useState } from "react";
import Head from "next/head";
import { set_user_value_from_localstorage } from "../../redux/actions/user";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import { Authenticated } from "../common/middleWare";
const FullScreenLoader = dynamic(() =>
  import("../components/elements/FullScreenLoader")
);

const LayoutDefault = (props) => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    let userInfo = {
      signup: localStorage.getItem("token"),
      uid: localStorage.getItem("token"),
    };
    set_user_value_from_localstorage(userInfo);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  const { children } = props;
  // redux
  const { set_user_value_from_localstorage } = props;

  const router = useRouter();

  return (
    <>
      {loader ? (
        <FullScreenLoader />
      ) : (
        <>
          <Head>
            <meta name="viewport" />
          </Head>

          <main className="site-content">
            {![
              "/landing",
              "/signin",
              "/policy",
              "/contactUs",
              "/faq",
              "/terms",
              "/signin-email",
              "/intrested",
              "/tags",
              "/about",
              "/edit-profile",
              "/welcome-page",
              "/signin-phonenumber"
            ].includes(router.pathname) && (
              <Authenticated>
                <Navbar />
              </Authenticated>
            )}
            {children}
          </main>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    signup: state.UserReducer.signup,
  };
};
export default connect(mapStateToProps, { set_user_value_from_localstorage })(
  LayoutDefault
);
