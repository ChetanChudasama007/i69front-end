import { gql } from "@apollo/client";

export const RANDOM_USERS_QUERY = gql`
  query randomUsers {
    randomUsers() {
      user {
        username
        email
        avatarPhotos {
          url
        }
      }
    }
  }
`;