import { Box, styled, Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

const ActionButtonWrapper = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginTop: "20px",
});

const ActionButton = styled("button")({
  fontSize: "16px",
  padding: "10px 15px",
  background: "linear-gradient(180deg, #373A3F 0%, #050304 100%)",
  border: "2px solid #DEBC63",
  borderRadius: "100px",
  color: "#DEBC63",
  textAlign: "center",
  width: "50%",
});

const InnerContainer = styled(Box)({
  minWidth: "350px",
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

const CustomModal = ({ handleActionButton, children, buttonLabel }) => {
  return (
    <ModalContainer>
      <InnerContainer sx={{ height: "auto" }}>
        <ErrorOutlineRoundedIcon fontSize="large" color="error" />
        {children}
        <ActionButtonWrapper>
          <ActionButton onClick={handleActionButton}>
            {" "}
            {buttonLabel}{" "}
          </ActionButton>
        </ActionButtonWrapper>
      </InnerContainer>
    </ModalContainer>
  );
};

export default CustomModal;
