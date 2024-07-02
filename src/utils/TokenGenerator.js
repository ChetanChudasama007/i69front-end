import { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

const REFRESH_MUTATION = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

const TokenGenerator = () => {
  let router = useRouter();
  const [refreshTokenMutation, { data, loading, error }] =
    useMutation(REFRESH_MUTATION);

  useEffect(() => {
    if (data?.refreshToken?.accessToken) {
      localStorage.setItem("token", data?.refreshToken?.accessToken);
      localStorage.setItem("refresh-token", data?.refreshToken?.refreshToken);
    }
    if (error && error.message && error.message === "Refresh token expired") {
      localStorage.clear();
      router.push("/landing");
    }
  }, [data, error]);

  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        console.log("called method refreshTokenValue");
        const refreshTokenValue = localStorage.getItem("refresh-token");
        await refreshTokenMutation({
          variables: {
            refreshToken: refreshTokenValue,
          },
        });
      } catch (error) {
        console.error("Mutation error:", error);
      }
    };
    getRefreshToken(); // called once when component load
    const interval = setInterval(() => {
      getRefreshToken();
    }, 3600000); // call after one hour
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default TokenGenerator;
