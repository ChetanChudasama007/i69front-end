import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import nextI18nextConfig from "../../next-i18next.config";
import dynamic from "next/dynamic";
const I69appDataDeletionInstructions = dynamic(() => import("../../src/views/i69app-data-deletion/I69appDataDeletionInstructions"), {
  ssr: false
});

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
const i69AppDataDeletion = () => {
  return <I69appDataDeletionInstructions />;
};

export default i69AppDataDeletion;
