import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosConfig from "../../common/axiosConfig";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  phone: Yup.string(),
  fullName: Yup.string(),
  code: Yup.number()
    .typeError("Only numeric values are allowed")
    .required("Number is required")
    .positive("Number must be positive")
    .integer("Number must be an integer"),
});

const LoginStepTwo = ({
  handleLoginSecondSuccessRes,
  email,
  emailExists,
  isSignInPhoneNumber,
  phone,
  phoneNumberExists,
}) => {
  const { t } = useTranslation();
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: email,
      phone: phone,
      code: "",
    },
  });

  const handleEmailLoginVerify = async (data) => {
    setLoading(true);
    try {
      const response = await axiosConfig.post(
        emailExists
          ? "api/user/email-login-verify/"
          : "api/user/email-signup-verify/",
        { email: data.email, code: data.code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && (response.status === 200) | (response.status === 201)) {
        setLoading(false);
        handleLoginSecondSuccessRes(response.data);
      }
    } catch (error) {
      setLoading(false);
      setApiErrorMessage(
        error.response.data.error ?? "Something went to wrong."
      );
    }
  };

  const handlePhoneNumberLoginVerify = async (data) => {
    setLoading(true);
    try {
      const response = await axiosConfig.post(
        phoneNumberExists
          ? "api/user/phone-login-verify/"
          : "api/user/phone-number-signup-verify/",
        { phone_number: data.phone, code: data.code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && (response.status === 200) | (response.status === 201)) {
        setLoading(false);
        handleLoginSecondSuccessRes(response.data);
      }
    } catch (error) {
      setLoading(false);
      setApiErrorMessage(
        error.response.data.error ?? "Something went to wrong."
      );
    }
  };

  const onSubmit = (data) => {
    if (isSignInPhoneNumber) {
      handlePhoneNumberLoginVerify(data);
    } else {
      handleEmailLoginVerify(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSignInPhoneNumber ? (
          <div className="mb-2">
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder={t("Login.loginFullName")}
              class={`form-control form-control-sm border mb-2 ${
                errors.fullName && "border-danger"
              }`}
            />
            {errors.fullName && (
              <p class="text-danger position-absolute">
                {errors.fullName.message}
              </p>
            )}
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <IntlTelInput
                  {...field}
                  preferredCountries={["us"]}
                  readOnly
                  containerClassName="intl-tel-input tel-wrapper"
                  inputClassName="form-control tel-input"
                />
              )}
            />
          </div>
        ) : (
          <>
            <input
              id="email"
              type="text"
              name="email"
              readOnly
              placeholder={t("Home.labelEmail")}
              class={`form-control form-control-sm  mb-3 border ${
                errors.email && "border-danger mb-0"
              }`}
              {...register("email")}
            />
          </>
        )}

        <input
          id="code"
          type="text"
          name="code"
          placeholder={"Code"}
          style={isSignInPhoneNumber ? { height: "47px" } : {}}
          class={`form-control form-control-sm border ${
            errors.code || apiErrorMessage ? "border-danger" : ""
          }`}
          {...register("code", {
            onBlur: () => {
              setApiErrorMessage("");
            },
            onChange: () => {
              setApiErrorMessage("");
            },
          })}
        />
        {errors.code && (
          <p class="text-danger position-absolute">{errors.code.message}</p>
        )}
        {apiErrorMessage && (
          <p className="text-danger position-absolute">{apiErrorMessage}</p>
        )}

        <button
          disabled={isLoading}
          type="submit"
          class="btn btn-primary form-control form-control-sm mt-4"
          data-mdb-ripple-init
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginStepTwo;
