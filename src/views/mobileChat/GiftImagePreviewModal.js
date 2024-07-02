import Link from "next/link";
import { Box, Typography, styled } from "@mui/material";
import { CircledCrossIcon } from "../Home2";

const ModalContainer = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100vh",
  top: 'auto',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.3)",
});
const InnerContainer = styled(Box)({
  width: "57%",
  height: "auto",
  maxHeight: "900px",
  position: "relative",
  borderRadius: "30px",
  color: "#3A3A3A",
  padding: "1rem 2rem",
  backgroundColor: "#ffffff",
  display: 'inline-block'
});
const ModelContent = styled(Box)({
  display: "grid",
  gap: "0.8rem",
});
const PriceContent = styled(Box)({
  display: "grid",
  gap: "0.5",
});
const ImageContent = styled(Box)({
  gap: "0.7rem",
  display: "grid",
  alignItems: "center",
  justifyItems: "center",
});
const Text = styled(Typography)({
  fontSize: "16px",
  color: "#3A3A3A !important",
});

const SendButton = styled("button")({
  marginTop: "12px",
  fontSize: "16px",
  padding: "10px 15px",
  background: "linear-gradient(180deg, #373A3F 0%, #050304 100%)",
  border: "2px solid #DEBC63",
  borderRadius: "100px",
  color: "#DEBC63",
  width: "50%",
});
const ButtonContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

export default function GiftImagePreviewModal({
  data,
  close,
  handleSend,
  user,
}) {
  return (
    <ModalContainer>
      <InnerContainer>
        <CircledCrossIcon sx={CloseIconStyles} onClick={() => close(false)} />
        <ModelContent>
          <ImageContent>
            <Text
              sx={{
                fontWeight: 700,
                fontSize: "1.3rem",
                textTransform: "uppercase",
              }}
            >
              {data?.giftName}
            </Text>
            <img
              src={data?.url}
              alt="icon"
              style={{
                width: "500px",
                height: "500px",
                objectFit: "cover",
                borderRadius: "1.5rem",
              }}
            />
          </ImageContent>
          <PriceContent>
            <Text
              sx={{
                fontWeight: 700,
                fontSize: "1.3rem",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              Price: {data?.cost}{" "}
              <Text
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                Coins
              </Text>
            </Text>

            <Text style={{ fontSize: "14px", fontWeight: 300 }}>
              Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is
              simply dummy text of the printing Lorem Ipsum is simply dummy text
              of the printing
            </Text>
          </PriceContent>

          <Link href="buy-chat-coin" legacyBehavior>
            <ButtonContainer>
              <SendButton onClick={handleSend}>Send Gift To {user}</SendButton>
            </ButtonContainer>
          </Link>
        </ModelContent>
      </InnerContainer>
    </ModalContainer>
  );
}
