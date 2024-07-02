import { gql, useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { formatDate, formatTime } from '../../common/formatTime'

const BROADCAST_QUERY = gql`
query broadcast{
    broadcastMsgs{
      edges{
        node{
          id
          timestamp
          content
        }
      }
    }
  }
`

const Broadcast = ({ setSelectedUser, setTime }) => {

  const [getBroadCastData, { data, loading, error }] = useLazyQuery(BROADCAST_QUERY);

  useEffect(() => {
      getBroadCastData();
  }, []);

  let broadcastData = (data?.broadcastMsgs?.edges)

  const fetchId = (node) => {
    setSelectedUser(node?.id)
    setTime(node?.timestamp)
  }


  return (
    <>

      <div onClick={() => fetchId(broadcastData && broadcastData[0]?.node)} className='user-list' id='broadcastroom'>
        <small>{formatDate(broadcastData && broadcastData[0]?.node?.timestamp)}</small>

        <img className='pro_img' src='/images/logo-right.jpg' alt='logo'/>

        <div className="chat-list-text">
          <div>
            <strong>Team i69</strong>
            <span>{broadcastData && broadcastData[0]?.node?.content}</span>
          </div>
        </div>
      </div>

    </>
  )
}

export const BroadcastMsgs = ({ selectedUser }) => {
  const [getBroadCastData, { data, loading, error }] = useLazyQuery(BROADCAST_QUERY);

  useEffect(() => {
      getBroadCastData();
  }, []);

  let broadcastData = (data?.broadcastMsgs?.edges)
  // console.log(broadcastData)
  // console.log(selectedUser)
  // console.log(broadcastData && broadcastData[0]?.node?.id)
  return (
    <>
      {/* {selectedUser === broadcastData && broadcastData[0]?.node?.id && ( */}
      <div>
        {broadcastData && broadcastData.map((item, index) => (
          <div key={index} className="msg-left">
            <div className="bubble-2">
              <figure><img src='./images/author_img50x.png' alt='i69 avatar'/></figure>
              <span className="msg_txt">{item?.node?.content}</span>
            </div>
            <small className="time_lbl">{formatTime(item?.node?.timestamp)}</small>
          </div>
        ))}
      </div>

      {/* )}  */}
    </>
  )
}

export default Broadcast
