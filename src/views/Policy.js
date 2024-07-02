import React, { useState } from "react";
import { Box, Button, Grid, Link } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ContentCopyOutlined } from "@mui/icons-material";
import dynamic from "next/dynamic";
const I69appDataDeletionInstructions = dynamic(() => import('./i69app-data-deletion/I69appDataDeletionInstructions'))

const Policy = () => {
  const { t } = useTranslation();

  const [showDataDeletionSteps,setShowDataDeletionSteps] = useState(false)

  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ padding: 20, backgroundColor: "#1c1f2d" }}>
        <h2 style={{ marginLeft: "20px", color: 'white' }}>{t("Policy.policy")}</h2>

        <Box sx={{ flexGrow: 1 }} style={{ margin: 20 }}>
          <Grid container spacing={1} direction="row">
            <Grid item xs={12} sm={9}>
              <h6>{t("Policy.privacyPolicy")}</h6>
              <p style={{ marginBottom: "5px" }}>{t("Policy.date")}</p>
              <p>{t("Policy.policyAndTerms")}</p>
              <p>{t("Policy.trendSasu")}</p>
              <h6>{t("Policy.introduction")}</h6>
              <p style={{ marginBottom: "15px" }}>{t("Policy.mobileTrend")}</p>
              <p style={{ marginBottom: "15px" }}>{t("Policy.i69app")}</p>
              <p>{t("Policy.collected")}</p>
              <p>{t("Policy.policyExplains")}</p>
              <p style={{ marginBottom: "15px" }}>{t("Policy.realName")}</p>
              <h6> § 1. {t("Policy.myData")}</h6>
              <h6>§ 1.1 {t("Policy.downloadI69app")}</h6>
              <p>{t("Policy.storeOperator")}</p>
              <p>{t("Policy.googlePlay")}</p>
              <h6>§ 1.2 {t("Policy.installation")}</h6>
              <p>{t("Policy.accessCapabilities")}</p>
              <p>{t("Policy.operatingSystem")}</p>
              <p>{t("Policy.permissions")}</p>
              <h6>§ 2. {t("Policy.userProfile")}</h6>
              <p>{t("Policy.isixtynine")}</p>
              <p>{t("Policy.visiter")}</p>
              <p>{t("Policy.ipAddress")}</p>
              <p>{t("Policy.pushHandle")}</p>
              <p>{t("Policy.i69AppDomain")}</p>
              <p>{t("Policy.locationData")}</p>
              <p>{t("Policy.usesCookies")}</p>
              <h6>§ 3. {t("Policy.domainServices")}</h6>
              <p>{t("Policy.personalData")}</p>
              <p>{t("Policy.userProfileCreation")}</p>
              <h6>§ 3.1 {t("Policy.mandatoryDetails")}</h6>
              <p>{t("Policy.details")}</p>
              <p>{t("Profile.gender")}</p>
              <p>{t("Profile.age")}</p>
              <p>{t("Policy.userName")}</p>
              <p>{t("Policy.location")}</p>
              <p>{t("Policy.socialNetworkAccount")}</p>
              <p>{t("Policy.profilePersonalization")}</p>
              <h6>§ 3.2 {t("Policy.voluntaryData")}</h6>
              <p>{t("Policy.voluntaryDetails")}</p>
              <p>{t("Policy.delivering")}</p>
              <p>{t("Policy.userProfileVoluntary")}</p>
              <h6>§ 3.3{t("Policy.locationDatas")}</h6>
              <p>{t("Policy.locationBased")}</p>
              <p>{t("Policy.settings")}</p>
              <h6>§ 3.4 {t("Policy.ipAddresses")}</h6>
              <p>{t("Policy.testingPurposes")}</p>
              <h6>§ 3.5 {t("Policy.paymentData")}</h6>
              <p>{t("Policy.hearts")}</p>
              <h6>§ 4. {t("Policy.trackingProviders")}</h6>
              <h6>§ 4.1 {t("Policy.cookiesPolicy")}</h6>
              <p>{t("Policy.comfortably")}</p>
              <p>{t("Policy.mobileTrendSasu")}</p>
              <p>{t("Policy.analysisServices")}</p>
              <p>{t("Policy.completelyPrevented")}</p>
              <p>{t("Policy.comfort")}</p>
              <h6>§ 4.2 {t("Policy.analyticsServices")}</h6>
              <p>{t("Policy.trackingAnalytics")}</p>
              <p>{t("Policy.dataProcessing")}</p>
              <p>{t("Policy.trackingProvidersAnalysis")}</p>
              <p>{t("Policy.crashlytics")}</p>
              <p>{t("Policy.firebaseCrashlytics")}</p>
              <p>{t("Policy.expresslyAgreed")}</p>
              <p>https://firebase.google.com/support/privacy.</p>
              <h6>{t("Policy.googleAnalytics")}</h6>
              <p>{t("Policy.irelandLimited")}</p>
              <p>{t("Policy.information")}</p>
              <p>{t("Policy.usageInformation")}</p>
              <p>{t("Policy.userOption")}</p>
              <p>{t("Policy.acquisition")}</p>
              <p>{t("Policy.ourPartners")}</p>
              <p>{t("Policy.advertisingPurposes")}</p>
              <p>{t("Policy.advertisingPurposesAnd")}</p>
              <p>{t("Policy.googlePlaces")}</p>
              <p>{t("Policy.googleFirebase")}</p>
              <p>{t("Policy.characterization")}</p>
              <p>{t("Policy.googleTagManager")}</p>
              <p>{t("Policy.tagManager")}</p>
              <h6>{t("Policy.googleAdwords")}</h6>
              <p>{t("Policy.onlineAdvertising")}</p>
              <h6>{t("Policy.googleReCaptcha")}</h6>
              <p>{t("Policy.recognitionBots")}</p>
              <p>{t("Policy.facebookPixel")}</p>
              <p>{t("Policy.facebookWebsites")}</p>
              <p>{t("Policy.device")}</p>
              <p>{t("Policy.successful")}</p>
              <p>{t("Policy.facebookAnalytics")}</p>
              <p>{t("Policy.facebookPrivacyPolicy")}</p>
              <h6>§ 4.3 {t("Policy.socialMediaLinks")}</h6>
              <p>{t("Policy.networksInstagram")}</p>
              <p>{t("Policy.association")}</p>
              <p>{t("Policy.socialNetworksCollected")}</p>
              <p>{t("Policy.personalDataInformation")}</p>
              <h6>{t("Policy.facebook")}</h6>
              <p>{t("Policy.facebookPolicy")}</p>
              <h6>{t("Policy.instagram")}</h6>
              <p>{t("Policy.instagramPolicy")}</p>
              <h6>{t("Policy.youTube")}</h6>
              <p>{t("Policy.privacyPolicyGoogle")}</p>
              <h6>§ 4.4 {t("Policy.facebookConnect")}</h6>
              <p>{t("Policy.trendSasuOffers")}</p>
              <p>{t("Policy.facebookID")}</p>
              <h6>§5. {t("Policy.transmitted")}</h6>
              <p>{t("Policy.forwardPersonal")}</p>
              <h6>§ 5.1 {t("Policy.transmissionPersonalData")}</h6>
              <h6>{t("Policy.otherData")}</h6>
              <p>{t("Policy.transmitCustomer")}</p>
              <p>{t("Policy.serviceProviders")}</p>
              <p>{t("Policy.affiliatedCompanies")}</p>
              <h6>{t("Policy.otherDisclosures")}</h6>
              <p>{t("Policy.permitted")}</p>
              <p>{t("Policy.businessStructure")}</p>
              <hr style={{background: 'white'}}/>
              <Link
                component="button"
                variant="body2"
                onClick={() =>
                  // router.push(
                  //   "/i69app-data-deletion/i69app-data-deletion-instructions"
                  // )
                  setShowDataDeletionSteps(true)
                }
                legacyBehavior
              >
                {t("Policy.i69appDataDeletionInstructionURL")}
              </Link> <span onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/i69app-data-deletion/i69app-data-deletion-instructions`)
              }}><ContentCopyOutlined color="info" fontSize="12" style={{cursor:'pointer'}} /></span>
              {showDataDeletionSteps  && <I69appDataDeletionInstructions />}
            </Grid>
            <Grid className="download-btn" item xs={12} sm={2}>
              <Button
                variant="contained"
                color="secondary"
                href="https://play.google.com/store/apps/details?id=com.i69.isyxtinine&pli=1&pli=1"
                target="_blank"
              >
                {t("Home.download")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Policy;
