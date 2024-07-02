import gql from "graphql-tag"
import { client } from "../ApolloClient/client"


const createChat = async (data) => {
  try {
    const respose = await client.mutate({
      mutation: gql`
      mutation createChat($userName:String!){
        createChat(userName:$userName){
          room{
            id
            name
            unread
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

export { createChat }