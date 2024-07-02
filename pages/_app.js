import React, { useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";
import "../src/assets/scss/style.scss";
import "../styles/globals.css";
import "../styles/responsive.css";
import ReactGA from "react-ga";
import { ReduxWrapper } from "../redux/store";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/ApolloClient/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../src/config";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
const FacebookSessionChecker = dynamic(() =>
  import("../src/utils/FacebookSessionChecker")
);
const TokenGenerator = dynamic(() => import("../src/utils/TokenGenerator"));
const LayoutDefault = dynamic(() => import("../src/layouts/LayoutDefault"));
const ScrollReveal = dynamic(() => import("../src/utils/ScrollReveal"));

ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const MyApp = ({ Component, pageProps }) => {
  const childRef = useRef();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>i69 App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="description" content="i69 App" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.1.1/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.10.0/css/lightgallery.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
      </Head>
      <React.StrictMode>
        <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FacebookSessionChecker />
              <TokenGenerator />
              <Script
                strategy="lazyOnload"
                src="https://connect.facebook.net/en_US/sdk.js"
                onLoad={() => {
                  window.fbAsyncInit = function () {
                    window.FB.init({
                      appId: config.facebookAppId,
                      cookie: true,
                      xfbml: true,
                      version: "v12.0",
                    });
                  };
                }}
              />
              <ScrollReveal
                ref={childRef}
                children={() => (
                  <LayoutDefault>
                    <GoogleOAuthProvider clientId={config?.googleClientId}>
                      {getLayout(<Component {...pageProps} />)}
                    </GoogleOAuthProvider>
                  </LayoutDefault>
                )}
              />
            </LocalizationProvider>
        </ApolloProvider>
      </React.StrictMode>
    </>
  );
};

export default ReduxWrapper.withRedux(appWithTranslation(MyApp));
