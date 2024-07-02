import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosConfig from "../../common/axiosConfig";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
const SignInFailedModal = dynamic(() =>
  import("../../components/commons/CustomModal")
);

const validationSchemaForEmail = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

const validationSchemaForPhone = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 characters")
    .test("isValidPhone", "Phone number is invalid", function (value) {
      return this.parent.isValidPhone;
    }),
});

const LoginStepOne = ({
  handleLoginOneSuccessRes,
  checkEmailExists,
  emailExists,
  isCheckEmailLoading,
  isDeletedProfile,
  isSignInPhoneNumber,
  phoneNumberExists,
  checkPhoneNumberExists,
  isCheckPhoneNumberLoading,
}) => {
  const { t } = useTranslation();
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isShownSignInErrorModal, setShownSignInErrorModal] = useState(false);
  const router = useRouter();
  const [localPhoneNumber, setLocalPhoneNumber] = useState("");

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(
      isSignInPhoneNumber ? validationSchemaForPhone : validationSchemaForEmail
    ),
    defaultValues: isSignInPhoneNumber
      ? { phone: "" }
      : {
          email: "",
        },
  });

  const handlePhoneChange = (isValid, value, countryData, number, id) => {
    setValue("phone", value, { shouldValidate: true });
    setValue("isValidPhone", isValid, { shouldValidate: true });
    if (!isValid || value.replace(/\D/g, "").length < 10) {
      setError("phone", {
        type: "manual",
        message: !isValid
          ? "Phone number is invalid"
          : "Phone number must be at least 10 characters",
      });
    } else {
      clearErrors("phone");
    }
  };

  const handleBlurForPhoneNumber = (
    isValid,
    value,
    countryData,
    number,
    id
  ) => {
    setApiErrorMessage("");
    setLocalPhoneNumber(`+${number.replace(/\D/g, "")}`);
    checkPhoneNumberExists(`+${number.replace(/\D/g, "")}`);
  };

  const handleSignInErrorButton = () => {
    setShownSignInErrorModal(false);
    router.push("/contactUs");
    localStorage.setItem("isErrorSignInPage", true);
  };

  const handleEmailLoginApi = async (data) => {
    setLoading(true);
    try {
      const response = await axiosConfig.post(
        emailExists ? "api/user/email-login/" : "api/user/email-signup/",
        { email: data.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.status === 200) {
        handleLoginOneSuccessRes(data.email, response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setApiErrorMessage(
        error.response.data.error ?? "Something went to wrong."
      );
    }
  };

  const handlePhoneNumberApi = async (data) => {
    setLoading(true);
    try {
      const response = await axiosConfig.post(
        phoneNumberExists
          ? "api/user/phone-number-login/"
          : "api/user/phone-number-signup/",
        { phone_number: localPhoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.status === 200) {
        handleLoginOneSuccessRes(localPhoneNumber, response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setApiErrorMessage(
        error.response.data.error ?? "Something went to wrong."
      );
    }
  };

  const onSubmit = (data) => {
    if (isDeletedProfile) {
      setShownSignInErrorModal(true);
      return;
    }
    if (isSignInPhoneNumber) {
      handlePhoneNumberApi(data);
    } else {
      handleEmailLoginApi(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSignInPhoneNumber ? (
          <>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <IntlTelInput
                    {...field}
                    preferredCountries={["us"]}
                    onPhoneNumberChange={handlePhoneChange}
                    onPhoneNumberBlur={handleBlurForPhoneNumber}
                    onChange={() => setApiErrorMessage("")}
                    containerClassName="intl-tel-input tel-wrapper"
                    inputClassName="form-control tel-input"
                  />
                  {(!getValues("phone") || errors.phone) && (
                    <p class="text-danger position-absolute">
                      {errors.phone?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </>
        ) : (
          <>
            <input
              id="email"
              type="text"
              name="email"
              placeholder={t("Home.labelEmail")}
              class={`form-control form-control-sm border ${
                errors.email && "border-danger"
              }`}
              {...register("email", {
                onBlur: (e) => {
                  setApiErrorMessage("");
                  checkEmailExists(e.target.value);
                },
                onChange: (e) => setApiErrorMessage(""),
              })}
            />
            {errors.email && (
              <p class="text-danger position-absolute">
                {errors.email.message}
              </p>
            )}
          </>
        )}

        {apiErrorMessage && (
          <p class="text-danger position-absolute">{apiErrorMessage}</p>
        )}
        <button
          disabled={
            isLoading || isCheckEmailLoading || isCheckPhoneNumberLoading
          }
          type="submit"
          class="btn btn-primary form-control form-control-sm mt-4"
          data-mdb-ripple-init
        >
          {isSignInPhoneNumber
            ? phoneNumberExists
              ? `Next`
              : `Sign up`
            : emailExists
            ? `Next`
            : `Sign up`}
        </button>
      </form>
      {isShownSignInErrorModal && (
        <SignInFailedModal
          handleActionButton={handleSignInErrorButton}
          buttonLabel={"Ok"}
        >
          <Typography
            style={{
              fontSize: "16px",
              textAlign: "center",
              color: "black",
              marginTop: "24px",
            }}
          >
            Sign In Failed! You have deleted your profile. Please contact us to
            re-join.
          </Typography>
        </SignInFailedModal>
      )}
    </>
  );
};

export default LoginStepOne;
