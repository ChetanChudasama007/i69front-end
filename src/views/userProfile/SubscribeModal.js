import { Box, Typography, styled } from "@mui/material";
import { CircledCrossIcon } from "../Home2";
import moment from "moment";
import { Button } from "react-bootstrap";

// ============= Styled Components =============
export const ModalContainer = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const InnerContainer = styled(Box)({
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

export const Text = styled(Typography)({
  fontSize: "16px",
  textAlign: "center",
  color: "#3A3A3A !important",
});

export const CustomButton = styled("button")({
  marginTop: "12px",
  fontSize: "16px",
  padding: "10px 15px",
  background: "linear-gradient(180deg, #373A3F 0%, #050304 100%)",
  border: "2px solid #DEBC63",
  borderRadius: "100px",
  color: "#DEBC63",
  width: "70%",
});

export const CloseIconStyles = {
  right: 15,
  top: 15,
  height: "18px !important",
  width: "18px !important",
  background: "transparent",
  color: "#3A3A3A",
  borderColor: "#3A3A3A",
};

// ================= MAIN =================
const SubscribeModal = ({ data, handleBuySubscriptionModal, close }) => {
  console.log("Subscribe Open", data);
  // const [haveSubscription, setHaveSubscription] = useState(false);
  const haveSubscription = data?.isActive;

  const formatDate = (date) => moment(date).format("YYYY/MM/DD");
  const remainingDaysFinder = (endDate) => {
    const today = moment(moment().format("YYYY-MM-DD"));
    const end = moment(moment(endDate).format("YYYY-MM-DD"));
    const difference = end.diff(today, "days");
    const result = `(${difference} Day${difference > 1 ? 's': ''} Left)`;
    return result;
  };

  return (
    <ModalContainer>
      <InnerContainer sx={{ height: haveSubscription ? "357px" : "292px" }}>
        <CircledCrossIcon
          sx={CloseIconStyles}
          onClick={() => {
            close();
            console.log("Subscribe Closed");
          }}
        />
        <img
          src={`/images/${
            haveSubscription ? "user-subs-icon" : "notification-add-icon"
          }.svg`}
          alt="icon"
          style={{ marginTop: "16px" }}
        />

        {haveSubscription ? (
          <>
            <Text sx={{ fontWeight: 300, mt: 1 }}>Active Subscription</Text>

            <Text sx={{ fontWeight: 600 }}>{data?.package?.name}</Text>

            <Text sx={{ fontWeight: 600 }}>
              {data?.plan?.priceInCoins}{" "}
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                i69COINS
              </span>
            </Text>

            {data?.isOnDiscount && (
              <Text sx={{ fontWeight: 400 }}>
                Congratulations you saved 70%
              </Text>
            )}

            <Text sx={{ fontWeight: 400, marginTop: "16px" }}>
              {formatDate(data?.startsAt)} - {formatDate(data?.endsAt)}
            </Text>

            <Text sx={{ fontWeight: 400 }}>
              {remainingDaysFinder(data?.endsAt)}
            </Text>
            {data?.package?.id !== 3 && (
              <Button onClick={handleBuySubscriptionModal} className="mt-2"> Upgrade </Button>
            )}
          </>
        ) : (
          <>
            <Text sx={{ fontWeight: 300, mt: 2, mb: 4 }}>
              {" "}
              No Active Subscription{" "}
            </Text>
            <CustomButton onClick={handleBuySubscriptionModal}>
              {" "}
              Buy Subscription{" "}
            </CustomButton>
          </>
        )}
      </InnerContainer>
    </ModalContainer>
  );
};

export default SubscribeModal;
