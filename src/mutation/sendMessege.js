import gql from "graphql-tag"
import { client } from "../ApolloClient/client"


const sendMessege = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
      mutation sendMessege($roomId:Int!,$messegeStr:String!,$messageType:String!){
        sendMessage(roomId:$roomId,messageStr:$messegeStr,messageStrType:$messageType){
          message{
            content
            roomId {
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

export { sendMessege }