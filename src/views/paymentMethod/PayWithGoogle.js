import { gql, useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import GooglePayButton from "@google-pay/button-react";
import { useEffect, useState } from "react";

const GOOGLE_CREATE_ORDER_MUTATION = gql`
  mutation googleCreateOrder(
    $amount: Float!
    $currency: String
    $orderId: String!
    $status: String!
  ) {
    googleCreateOrder(
      amount: $amount
      currency: $currency
      orderId: $orderId
      status: $status
    ) {
      status
      statusCode
    }
  }
`;

const PURCHASE_COIN_MUTATION = gql`
  mutation purchaseCoin(
    $coins: Int
    $currency: String!
    $id: String
    $money: Float
    $paymentId: String
    $paymentMethod: String
  ) {
    purchaseCoin(
      coins: $coins
      currency: $currency
      id: $id
      money: $money
      paymentId: $paymentId
      paymentMethod: $paymentMethod
    ) {
      id
      coins
      success
    }
  }
`;

const PayWithGoogle = ({
  coinPrice,
  coinsCount,
  handleThanksPurchasingModal,
  setMessage,
}) => {
  const uniqueId = uuidv4();
  console.log("uniqueId", uniqueId);
  const [googleCreateOrderMutation, { data, loading, error }] = useMutation(
    GOOGLE_CREATE_ORDER_MUTATION
  );
  const [purchaseCoinMutation] = useMutation(PURCHASE_COIN_MUTATION);

  const [userId, setUserId] = useState();

  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    environment: "TEST",
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: [
            "MASTERCARD",
            "VISA",
            "AMEX",
            "DISCOVER",
            "INTERAC",
            "JCB",
          ],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "BCR2DN4TXW7IVB3J",
      merchantName: "Jimmy",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US",
    },
  };

  const handlePay = async () => {
    try {
      const { data } = await googleCreateOrderMutation({
        variables: {
          amount: coinPrice,
          currency: "USD",
          orderId: uniqueId,
          status: "success",
        },
      });
      if (data?.googleCreateOrder?.statusCode === 200) {
        const response = await purchaseCoinMutation({
          variables: {
            coins: coinsCount,
            currency: "USD",
            id: userId,
            money: coinPrice,
            paymentId: uniqueId,
            paymentMethod: "Google Pay",
          },
        });
        if (response?.data?.purchaseCoin.success) {
          handleThanksPurchasingModal(true);
        }
      }
    } catch (error) {
      console.error("Error while performing mutation:", error);
    }
  };

  return (
    <>
      <button
        disabled={loading}
        onClick={handlePay}
        className="global-btn-3"
        style={{ borderRadius: "10px", width: "100%", position: "relative" }}
      >
        Proceed to Payment
      </button>
      <GooglePayButton
        environment="TEST"
        buttonColor="black"
        buttonType="plain"
        buttonSizeMode="fill"
        paymentRequest={paymentRequest}
        onLoadPaymentData={(paymentRequest) => {
          console.log("onLoadPaymentData Success line 157", paymentRequest);
        }}
        onError={(error) => {
          console.log("error line 160", error);
        }}
        onCancel={(reason) => {
          console.log("reason line 163", reason);
        }}
        onClick={(event) => {
          console.log("line 166 onclick method", event);
        }}
        onReadyToPayChange={(result) => {
          console.log("result line 169", result);
        }}
        style={{
          position: "absolute",
          bottom: "3vh",
          width: "90%",
          opacity: 0,
        }}
      />
    </>
  );
};

export default PayWithGoogle;
