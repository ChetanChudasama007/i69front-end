import gql from "graphql-tag"
import { client } from "../ApolloClient/client"


const sendGift = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
      mutation giftPurchase($giftId: ID!, $receiverId: ID!, $senderId: ID!) {
        giftPurchase(giftId: $giftId, receiverId: $receiverId, senderId: $senderId) {
          giftPurchase {
            id
            gift {
              id
            }
            receiver {
              id
            }
            purchasedOn
            user {
              id
            }
          }
        }
      }
      `,
      variables: { ...data },
    })
    return respose
  } catch (error) {
    alert(error)
  }
}

export { sendGift }