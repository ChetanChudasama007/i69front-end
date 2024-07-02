import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  message: Yup.string().required("Required Field"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    border: "1px solid #fff",
    color: "#fff",
    padding: "30px 30px 40px 30px",
    borderRadius: "4px",
    width: "500px",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "15px",
    },
  },
  customInput: {
    paddingBottom: "8px",
    "& .MuiInputBase-input": {
      // Custom input text styles
      color: "#000",
    },
    "& .MuiInputBase-root": {
      // Custom root styles
      fontSize: "16px",
      fontWeight: "bold",
    },
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      // Custom underline styles
      // borderBottom: '2px solid #f50057',
    },
  },
  customButton: {
    marginTop: theme.spacing(2),
    fontWeight: "600",
    height: "60px",
  },
  customTextArea: {
    width: "100%",
    color: "#000",
    marginBottom: "20px",
  },
}));

const ContactUs = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  let httpLink;
  if (`${process.env.NEXT_PUBLIC_APP_ENV}` === "development") {
    httpLink = process.env.NEXT_PUBLIC_STAGING;
  } else {
    httpLink = process.env.NEXT_PUBLIC_PRODUCTION;
  }
  console.log(httpLink + "api/contact-us/");
  const apiHost = httpLink + "api/contact-us/";

  const Api = Object.freeze({
    defaultHeaders: {
      "Content-Type": "application/json",
      // add any other default headers here
    },
    // add any other API-related methods here
  });

  const showMessage = (message) => {
    // Update the code here to display the message as desired
    setMessage(message);
  };

  const onSubmit = async (data) => {
    const request = new Request(apiHost, {
      method: "POST",
      headers: new Headers(Api.defaultHeaders),
      body: JSON.stringify(data),
    });

    try {
      const response = await fetch(request);
      const responseData = await response.json();
      if (responseData.success === true) {
        // Handle success case
        console.log("Request was successful");
        const isErrorSignInPage = localStorage.getItem("isErrorSignInPage");
        if (isErrorSignInPage) {
          router.push("/signin");
        } else {
          setIsSubmitted(true);
        }
      } else {
        // Handle error case or other conditions
        console.log("Request was not successful");
        showMessage(true);
      }
      // Perform further actions with the response data
      return response; // Optionally return the response object
    } catch (error) {
      showMessage(true);
      console.error("Error:", error);
      return error;
    }
  };

  return (
    <div style={{ textAlign: "center", background: "rgba(31, 36, 48, 0.80)" }}>
      <h2 style={{color: 'white'}}> {t("Home.contactUS")} </h2>
      <Grid container spacing={1} direction="row">
        <Grid item xs={12}>
          <Paper
            className={classes.root}
            variant="outlined"
            square
            elevation={3}
            // style={{  background: "url('../images/bgContact.png')", backgroundRepeat: "no-repeat" }}
          >
            {message && (
              <Typography
                style={{ color: "red", fontSize: "16px", marginTop: "8px" }}
                variant="body1"
                component="p"
              >
                {t("Home.failMesReq")}
              </Typography>
            )}
            {isSubmitted ? (
              <>
                <Typography
                  style={{
                    color: "#000",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                  variant="h3"
                  component="h2"
                >
                  {t("Home.thanksForMes")}
                </Typography>
                <Button
                  size="large"
                  className={classes.customButton}
                  onClick={() => router.push("/")}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  startIcon={<ArrowBackIcon />}
                >
                  {t("Home.backToHome")}
                </Button>
              </>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5, mt: 2.7 }}
                  />
                  <TextField
                    className={classes.customInput}
                    label={t("Home.labelName")}
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    style={{ width: "90%" }}
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <EmailIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5, mt: 2.7 }}
                  />
                  <TextField
                    label={t("Home.labelEmail")}
                    className={classes.customInput}
                    {...register("email")}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    style={{ width: "90%" }}
                  />
                </Box>

                <TextField
                  className={classes.customTextArea}
                  label={t("Home.typeYourMes")}
                  multiline
                  rows={4}
                  {...register("message")}
                  fullWidth
                  variant="outlined"
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />

                <Button
                  size="large"
                  className={classes.customButton}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                >
                  {t("Home.sendMes")}
                </Button>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUs;
