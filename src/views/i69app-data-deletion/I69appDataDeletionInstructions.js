import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const I69appDataDeletionInstructions = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: "#1c1f2d", height: "100vh", padding: "40px"  }}>
      <h2 style={{ color:'white' }}>
        {t("I69APP-DATA-DELETION.i69appDataDeletionInstructionURL")}
      </h2>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} sm={9} style={{color:'white'}}>
            <p style={{ marginBottom: "15px" }}>
              {t("I69APP-DATA-DELETION.i69appDataDeletionDescription")}
            </p>

            <h6>
              {" "}
              1.
              {t("I69APP-DATA-DELETION.i69appStepOne")}
            </h6>

            <h6>
              2.
              {t("I69APP-DATA-DELETION.i69appStepTwo")}
            </h6>

            <h6> 3.{t("I69APP-DATA-DELETION.i69appStepThree")}</h6>

            <h6>
              {" "}
              4.
              {t("I69APP-DATA-DELETION.i69appStepFour")}
            </h6>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default I69appDataDeletionInstructions;
