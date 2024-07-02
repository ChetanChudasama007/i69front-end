import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import { useRouter } from 'next/router'
import { sendMessege } from '../mutation/sendMessege'
import { gql, useLazyQuery } from '@apollo/client'
import IncomingChat from './mobileChat/IncomingChat'
import { formatDate, formatTime } from '../common/formatTime'
import RoomsData from './mobileChat/RoomsData'
import Appbar from '../layouts/Appbar'

const MESSEGES_QUERY= gql`
query messages($id:ID){
    messages(id:$id){
      edges{
        node{
            id
          content
          messageType
          timestamp
          userId{
            id
            username
            avatarPhotos{
              url
            }
          }
          roomId{
            id
            name
            userId{
              id
              username
              avatarPhotos{
                url
              }
            }
          }
        }
      }
    }
  }
`


const MobileChat = () => {
   const router = useRouter();
    const [message, setMessage] = useState('');
    const [roomsAllData,setRoomsAllData] = useState()
    const roomIdAsInt = Number(router.query.mobilechat);

    
  const [getMessageData, { data, error, loading, refetch }] =
  useLazyQuery(MESSEGES_QUERY);
   
  useEffect(() => {
    if (roomIdAsInt) {
      getMessageData({
        variables: { id: roomIdAsInt },
      });
    }
  }, [roomIdAsInt]);

   useEffect(()=>{
    refetch()
   },[message,roomIdAsInt,data,loading])
   
   let messegeData = (data?.messages?.edges)
  

    const handleMessageChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleSendMessage = async() => {
      const response = await sendMessege({
        roomId:roomIdAsInt,
        messegeStr:message
      })
     
      if(response){
        setMessage('');
        refetch();
          
      }
      
    
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    };

    const sortMessgeData = messegeData && messegeData.sort((a, b) => new Date(a?.node?.timestamp) - new Date(b?.node?.timestamp));
    //   console.log(sortMessgeData);
      const outgoingMessages = sortMessgeData && sortMessgeData.filter(message => message?.node?.userId?.id === localStorage.getItem('userId'))
      .sort((a, b) => new Date(a?.node?.timestamp) - new Date(b?.node?.timestamp));
    //   console.log(outgoingMessages);
      const incomingMessages = sortMessgeData && sortMessgeData.filter(message => message?.node?.userId?.id !== localStorage.getItem('userId'))
      .sort((a, b) => new Date(a?.node?.timestamp) - new Date(b?.node?.timestamp));
    
  return (
    <>
     <div className="relative-body" style={{background: "#1F2326" }}>
    <Navbar/>
    


    <div className="row m-0">
    
        <div className="col-12 chat-area px-0">
            <div className="header-control header-control-msg h-c-g col-12" style={{justifyContent:'space-between'}}>
                <i onClick={()=>router.back()} className="fa fa-angle-left gold-icon" aria-hidden="true"></i>
                <RoomsData/>
                
                <img src="/images/logo-right.jpg" alt='logo'/>
            </div>
                 <div onClick={()=>router.push('/buy-chat-coin')} className="coin-area" style={{cursor:'pointer'}}>
                        <img src="/images/coin.PNG" alt=""/>
                        <span>{roomsAllData?.userId?.coins}</span>
                        <small className="pb-1">COINS LEFT</small>
                    </div>

            <div className="scr-cht src-chat-mobile">
                <div className="chat-time">{formatDate(messegeData && messegeData[0]?.node?.timestamp)}</div>

                <IncomingChat roomId={roomIdAsInt} incomingMessages={incomingMessages}/>
               
                {outgoingMessages && outgoingMessages.length>0 && outgoingMessages.map((item,index)=>(
                <div key={index} className="msg-right">
                    <div className="bubble-1">
                        <span className="text-left ">{item?.node?.content}</span>
                        <small className="text-right w-100">{formatTime(item?.node?.timestamp)}</small>
                    </div>
                </div>
               ))}
                
               
                </div>

                <div className="chat-send-area-two">
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    <div className="send">
           <input 
              type="text" 
               placeholder="Enter a message"
               value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyPress}
      />
      <i className="fas fa-arrow-up" onClick={handleSendMessage}></i>
    </div>
                </div>
           
        </div>
    </div>
   <Appbar/>

</div>
    </>
  )
}

export default MobileChat
