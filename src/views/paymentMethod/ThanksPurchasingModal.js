import Link from "next/link";
import { Box, Typography, styled } from "@mui/material";
import { CircledCrossIcon } from "../Home2";

const ModalContainer = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const InnerContainer = styled(Box)({
  // width: "35%",
  // height: "42%",
  minWidth: "473px",
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

const Text = styled(Typography)({
  fontSize: "16px",
  textAlign: "center",
  color: "#3A3A3A !important",
});

const CustomButton = styled("button")({
  marginTop: "12px",
  fontSize: "16px",
  padding: "10px 15px",
  background: "linear-gradient(180deg, #373A3F 0%, #050304 100%)",
  border: "2px solid #DEBC63",
  borderRadius: "100px",
  color: "#DEBC63",
  width: "70%",
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

const ThanksPurchasingModal = ({ coins, close }) => {
  return (
    <ModalContainer>
      <InnerContainer sx={{ height: "357px" }}>
        <CircledCrossIcon sx={CloseIconStyles} onClick={close} />

        <img
          src="/images/coins-2.png"
          alt="icon"
          style={{ marginTop: "16px" }}
        />

        <Text sx={{ fontWeight: 300, mt: 3 }}>Congratulations! You Ordered</Text>

        <Text sx={{ fontWeight: 700, fontSize: "24px", mt: 1 }}>{coins}</Text>

        <Text style={{ fontSize: "16px", fontWeight: 700 }}>Coins</Text>

        <Link href="buy-chat-coin" legacyBehavior>
          <CustomButton onClick={close}> Thanks For Purchasing </CustomButton>
        </Link>
      </InnerContainer>
    </ModalContainer>
  );
};
export default ThanksPurchasingModal;
