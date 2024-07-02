import gql from "graphql-tag"
import { client } from "../ApolloClient/client"


const followUser = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
      mutation UserFollow($userId: ID!) {
        userFollow(userId: $userId) {
          profileFollow {
            id
            follower {
              id
              username
              email
            }
            following {
              id
              username
              email
            }
            createdAt
          }
        }
      }`,
      variables: { ...data },
    })
    return respose
  } catch (error) {
    alert(error)
  }
}

export { followUser }