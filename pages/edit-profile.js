import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import nextI18nextConfig from "../next-i18next.config";
import { Authenticated } from "../src/common/middleWare";
import dynamic from "next/dynamic";
const EditProfile2 = dynamic(() => import("../src/views/EditProfile2"));

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
const Edit = () => {
  return <EditProfile2 isCallingRegistration={true} />;
};

Edit.getLayout = (page) => {
  return <Authenticated>{page}</Authenticated>;
};

export default Edit;
