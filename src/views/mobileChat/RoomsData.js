import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const ROOMS_QUERY = gql`
  query room($id: ID) {
    room(id: $id) {
      messageSet {
        edges {
          node {
            content
            timestamp
          }
        }
      }
      target {
        fullName
      }
      userId {
        fullName
      }
    }
  }
`;

const RoomsData = () => {
  const [room, setRoom] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const roomId = localStorage.getItem("roomId");
      setRoom(roomId);
    }
    refetch();
  }, [room]);

  const [getRoomsData, { data, refetch }] =
    useLazyQuery(ROOMS_QUERY);

  useEffect(() => {
    if (room) {
      getRoomsData({
        variables: {
          id: room,
        },
      });
    }
  }, [room]);

  return (
    <>
      <div style={{ lineHeight: "30px", color: "black" }}>
        <h4 style={{ color: "black" }}>{data?.room?.target?.fullName}</h4>
      </div>
    </>
  );
};

export default RoomsData;
