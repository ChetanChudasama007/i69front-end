import gql from "graphql-tag"
import { client } from "../ApolloClient/client"


const unfollowUser = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
      mutation userUnfollow($userId: ID!) {
        userUnfollow(userId: $userId) {
          message
        }
      }`,
      variables: { ...data },
    })
    return respose
  } catch (error) {
    alert(error)
  }
}

export { unfollowUser }