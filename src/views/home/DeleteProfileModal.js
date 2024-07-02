import { Alert, Box, styled, Typography } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import axiosConfig from "../../common/axiosConfig";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

const ActionButtonWrapper = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  marginTop: "20px",
});

const NegativeButton = styled("button")({
  fontSize: "16px",
  marginRight: "20px",
  padding: "10px 15px",
  border: "2px solid #DEBC63",
  borderRadius: "100px",
  color: "#DEBC63",
  width: "20%",
});

const PositiveButton = styled("button")({
  fontSize: "16px",
  padding: "10px 15px",
  background: "linear-gradient(180deg, #373A3F 0%, #050304 100%)",
  border: "2px solid #DEBC63",
  borderRadius: "100px",
  color: "#DEBC63",
  width: "20%",
});

const CloseIconStyles = {
  right: 15,
  top: 15,
  height: "18px !important",
  width: "18px !important",
  background: "transparent",
  color: "#3A3A3A",
  borderColor: "#3A3A3A",
};

export const CircledCrossIcon = styled(CancelRoundedIcon)({
  position: "absolute",
  top: "5px",
  right: "10px",
  padding: "4px",
  borderRadius: "50%",
  cursor: "pointer",
});

const InnerContainer = styled(Box)({
  minWidth: "400px",
  backgroundColor: "#ffffff",
  borderRadius: "30px",
  color: "#3A3A3A",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px",
});

const ModalContainer = styled(Box)({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Text = styled(Typography)({
  fontSize: "16px",
  textAlign: "center",
  color: "#3A3A3A !important",
});

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  code: Yup.number()
    .typeError("Only numeric values are allowed")
    .required("Number is required")
    .positive("Number must be positive")
    .integer("Number must be an integer"),
});

const DELETE_PROFILE = gql`
  mutation deleteProfile($id: UUID, $verificationCode: Int) {
    deleteProfile(id: $id, verificationCode: $verificationCode) {
      result
    }
  }
`;

const DeleteProfileModal = ({
  email,
  userId,
  handleCloseButton,
  token,
  handleSuccessAction,
  phoneNumber,
}) => {
  const [isShownDeletePassword, setShownDeletePassword] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isShownSuccessAlert, setShownSuccessAlert] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const [deleteProfile] = useMutation(DELETE_PROFILE, {
    onError: (err) => {
      setLoading(false);
      setApiErrorMessage(err.message);
    },
    onCompleted: (data) => {
      setLoading(false);
      if (data.deleteProfile.result) {
        handleSuccessAction();
      }
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: email,
      phone: phoneNumber,
      code: "",
    },
  });

  const handleYesButton = async () => {
    try {
      const response = await axiosConfig.post(
        "api/user/user-verify/",
        {},
        {
          headers: {
            authorization: `Token ${token}`,
          },
        }
      );
      if (response && response.status === 200) {
        setShownDeletePassword(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await deleteProfile({
        variables: { id: userId, verificationCode: data.code },
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <ModalContainer>
        <InnerContainer sx={{ minHeight: "220px", height: "auto" }}>
          <CircledCrossIcon
            fontSize="large"
            color="warning"
            onClick={() => handleCloseButton()}
          />

          {isShownDeletePassword ? (
            <form onSubmit={handleSubmit(onSubmit)} className="pt-4 w-75">
              {phoneNumber ? (
                <div className="mb-2">
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
                    value={email}
                    placeholder={t("Home.labelEmail")}
                    class={`form-control form-control-md mb-3 border ${
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
                class={`form-control form-control-md border ${
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
                <p class="text-danger position-absolute">
                  {errors.code.message}
                </p>
              )}
              {apiErrorMessage && (
                <p className="text-danger position-absolute">
                  {apiErrorMessage}
                </p>
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
          ) : (
            <>
              <Text sx={{ fontWeight: 600, mt: 3 }}>
                Are you sure you want to delete your user account?
              </Text>

              <ActionButtonWrapper>
                <NegativeButton onClick={handleCloseButton}>
                  {" "}
                  No{" "}
                </NegativeButton>
                <PositiveButton onClick={handleYesButton}> Yes </PositiveButton>
              </ActionButtonWrapper>
            </>
          )}
        </InnerContainer>
      </ModalContainer>
      {isShownSuccessAlert && (
        <Box
          sx={{
            width: "20%",
            display: "block",
            zIndex: 1000,
            top: "50%",
            left: "50%",
            position: "fixed",
          }}
        >
          <Alert severity="success">YOU HAVE DELETED YOUR ACCOUNT</Alert>
        </Box>
      )}
    </>
  );
};

export default DeleteProfileModal;
