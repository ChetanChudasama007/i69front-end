import { gql, useLazyQuery } from "@apollo/client";
import { Close } from "@material-ui/icons";
import {
  Box,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const PayWithGoogle = dynamic(() => import('./PayWithGoogle'))

const GET_PAYMENTS_METHODS = gql`
  query GetPaymentMethods {
    getPaymentMethods {
      paymentMethod
      isAllowed
    }
  }
`;

// const CHARGE_PAYMENT = gql`
//   mutation ChargePayment(
//     $amount: Float!
//     $chargingToken: String!
//     $description: String!
//   ) {
//     chargePayment(
//       amount: $amount
//       chargingToken: $chargingToken
//       description: $description
//     ) {
//       chargingToken
//       id
//       success
//     }
//   }
// `;

// ============ Icon Images ============
const paymentMethodsImages = {
  "Google Pay": "./images/GPay.png",
  Google:
    "https://cdn.iconscout.com/icon/free/png-256/free-google-486-1175309.png",
  Stripe:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
  Paypal:
    "https://w7.pngwing.com/pngs/297/453/png-transparent-computer-icons-logo-paypal-paypal-blue-angle-rectangle-thumbnail.png",
  Boku: "https://download.logo.wine/logo/Boku%2C_Inc./Boku%2C_Inc.-Logo.wine.png",
  InApp:
    "https://download.logo.wine/logo/Boku%2C_Inc./Boku%2C_Inc.-Logo.wine.png",
};

const MethodsDialog = ({ handleThanksPurchasingModal, setOpen, coinPrice, coinsCount, setMessage }) => {
  // const uniqueId = uuidv4();

  const [getPaymentsMethodData, { data: paymentMethodsData }] = useLazyQuery(GET_PAYMENTS_METHODS);

  useEffect(() => {
    getPaymentsMethodData();
  }, []);


  const paymentMethods = paymentMethodsData?.getPaymentMethods;

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [value, setValue] = useState("");

  const handleChangeMethod = (index, selected) => {
    setSelectedMethod(index);
    setValue(selected);
  };

  console.log(paymentMethods, "paymentMethods");
  console.log(selectedMethod, "selectedMethod");
  console.log(coinPrice, "coinPrice");

  return (
    <>
      {/* {alert && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            zIndex: 1000,
            top: "0px",
            position: "absolute",
          }}
        >
          <Alert severity="success">Your payment is successfully done !</Alert>
        </Box>
      )} */}
      <Box
        sx={{
          width: { xs: "300px", sm: "380px" },
          height: "550px",
          padding: "20px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h7" sx={{ color: "black", fontWeight: 600 }}>
            Select Payment Method
          </Typography>
          <Close
            onClick={handleClose}
            style={{ fontSize: "18px", cursor: "pointer" }}
          />
        </Box>

        {paymentMethods
          ?.filter((item) => item.isAllowed)
          .map((item, index) => (
            <Box
              key={index}
              sx={{
                height: "60px",
                width: "100%",
                border: "1px solid rgba(0,0,0,0.2)",
                marginTop: "20px",
                borderRadius: "10px",
                boxShadow: "-1px 0px 0.5rem 1px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginLeft: "20px",
                }}
              >
                <img
                  src={paymentMethodsImages[item.paymentMethod]}
                  style={{
                    height:
                      item.paymentMethod === "Google Pay"
                        ? "60px"
                        : "40px",
                    width:
                      item.paymentMethod === "Google Pay"
                        ? "60px"
                        : "40px",
                    objectFit: "contain",
                  }}
                />
                <Typography sx={{ color: "black" }}>
                  {item?.paymentMethod}
                </Typography>
              </Box>

              <FormControlLabel
                control={
                  <Radio
                    sx={{ fontSize: "15px", marginTop: "5px" }}
                    size="small"
                  />
                }
                sx={{ display: "flex", alignItems: "center" }}
                checked={selectedMethod === index}
                onChange={() => handleChangeMethod(index, item?.paymentMethod)}
              />
            </Box>
          ))}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          {value === "Google Pay" ? (
            <PayWithGoogle
              coinPrice={coinPrice}
              coinsCount={coinsCount}
              handleThanksPurchasingModal={handleThanksPurchasingModal}
              setMessage={setMessage}
            />
          ) : (
            <button
              className="global-btn-3"
              style={{ borderRadius: "10px", width: "100%" }}
              disabled={true}
            >
              Proceed to Payment
            </button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MethodsDialog;
