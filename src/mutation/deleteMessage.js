import gql from "graphql-tag"
import { client } from "../ApolloClient/client"


const deleteMessage = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
      mutation DeleteRoom($chat:Int!)
      {
          deleteRoom(chatId: $chat)
          {
              message
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

export { deleteMessage }