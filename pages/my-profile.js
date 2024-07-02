import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import nextI18nextConfig from "../next-i18next.config";
import { Authenticated } from "../src/common/middleWare";
import dynamic from "next/dynamic";
const MyProfile = dynamic(() => import('../src/views/MyProfile'))

export async function getServerSideProps({ locale }) {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ["translation"],
          nextI18nextConfig
        )),
      },
    };
  }
}
const Me = () => {
  return <MyProfile />;
};

Me.getLayout = (page) => {
  return <Authenticated>{page}</Authenticated>;
};

export default Me;
