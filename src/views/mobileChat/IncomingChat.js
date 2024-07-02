import { gql, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { formatTime } from '../../common/formatTime';

const NEW_MESSEGE = gql`
subscription onNewMessege($roomId:Int!,$token:String){
    onNewMessage(roomId:$roomId,token:$token){
        message{
            content
            timestamp
          }
        
    }
  }
`

const IncomingChat = ({roomId,incomingMessages}) => {
  const roomIdAsInt = Number(roomId);
    const [getToken,setGetToken] = useState();
    useEffect(() => {
      // Retrieve token from localStorage on component mount
      const token = localStorage.getItem('token');
      setGetToken(token || '');
    }, []);


 const {data,error,loading}= useSubscription(NEW_MESSEGE,{
    variables:{
        roomId:roomIdAsInt,
        token:getToken
    }
 })




//  useEffect(()=>{

//     console.log(data)
  
//  },[data])

 const { content, timestamp } = data?.onNewMessage?.message || {};


 

  return (
    <>

    {incomingMessages && incomingMessages.length>0 && incomingMessages.map((item,index)=>(
       <div key={index} className="msg-left">
                    
                    <div className="bubble-2">
                        <span className="text-left ">{item?.node?.content}</span>
                        <small className="text-right w-100">{formatTime(item?.node?.timestamp)}</small>
                    </div>
                </div>
    ))}
    </>
  )
}

export default IncomingChat
