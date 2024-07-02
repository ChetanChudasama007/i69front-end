import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const USER_QUERY = gql`
  query user($id: String!) {
    user(id: $id) {
      username
      fullName
      interestedIn
      tags
    }
  }
`;

export const WelcomeAuth = (props) => {
  const { children } = props;
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [userId, setUserId] = useState();

  const [getUserData, { data, error, refetch, loading }] =
    useLazyQuery(USER_QUERY);

  useEffect(() => {
    if (userId) {
      getUserData({
        variables: {
          id: userId,
        },
      });
    }
  }, [userId]);

  let userData = data?.user;
  console.log(userData, "userdaya");

  useEffect(() => {
    console.log(data, "welcome auth");
    setLoad(true);
    const id = localStorage.getItem("userId");
    setUserId(id || ""); // Assuming you're storing the token in localStorage
    console.log(userData, "data");
    console.log(id, "id");
    console.log(userId, "userid");
    if (id && data && userData) {
      setLoad(true);
      refetch();
      if (
        userData?.interestedIn?.length === 0 ||
        userData?.tags?.length === 0
      ) {
        router.push("/intrested");
        console.log("intrested");
        setLoad(false);
      } else if (
        userData?.interestedIn?.length > 0 ||
        userData?.tags?.length > 0
      ) {
        router.push("/welcome-page");
        console.log("welcome");
        setLoad(false);
      } else {
        setLoad(true);
      }
    } else {
      if (userId) {
        refetch();  
      }
      setLoad(true);
    }
  }, [router.isReady, load, loading, userData]);

  if (loading) return null;

  return <>{children}</>;
};
