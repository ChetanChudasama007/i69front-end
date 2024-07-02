import { CircledCrossIcon } from "../Home2";
import { Box, styled, Typography } from "@mui/material";

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
  width: "30%",
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

const UnlockProfileModal = ({
  handleYesButtonPressed,
  handleCloseButton,
}) => {
  return (
    <ModalContainer>
      <InnerContainer sx={{ height: "180px" }}>
        <CircledCrossIcon
          sx={CloseIconStyles}
          onClick={() => handleCloseButton()}
        />

        {/* <CancelRoundedIcon fontSize="large" color="warning" /> */}

        <Text sx={{ fontWeight: 600, mt: 3 }}>
          Unlock this function to view more profile 
        </Text>

        <ActionButtonWrapper>
          <NegativeButton onClick={handleCloseButton}> Cancel  </NegativeButton>
          <PositiveButton onClick={handleYesButtonPressed}>
            {" "}
            Ok{" "}
          </PositiveButton>
        </ActionButtonWrapper>
      </InnerContainer>
    </ModalContainer>
  );
};

export default UnlockProfileModal;
