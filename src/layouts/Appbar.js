import { gql, useLazyQuery } from '@apollo/client'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { updateLocation } from '../mutation/update'
import Link from 'next/link'

const USER_QUERY = gql`
query user($id:String!){
  user(id:$id){
    username
    avatarPhotos{
      url
    } 
  }
}
`

const Appbar = () => {
    const router = useRouter();
    const [userId ,setUserId] = useState();
    useEffect(() => {
        // Retrieve userId from localStorage on component mount
        const id = localStorage.getItem('userId');
        setUserId(id || '');
      }, []);

      const [getUserData, {data,error,refetch}] = useLazyQuery(USER_QUERY);

      useEffect(() => {
        if (userId) {
          getUserData({
            variables: {
              id: userId,
            },
          });
        }
      }, [userId]);
    
      const [latitude, setLatitude] = useState(null);
      const [longitude, setLongitude] = useState(null);
     
      const[load,setLoad] = useState(false)
     
     
      // console.log(latitude)
      // console.log(longitude)
    
      let cord = [latitude,longitude]
      // console.log(cord)
    
      const getLocation = () => {
        setLoad(true);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              setLoad(false);
            },
            (error) => {
              setLoad(false);
            }
          );
        } else {
          // console.log('getcordinate is not working')
          setLoad(false);
        }
      };


      const fetchData = async () => {
        try {
          if (userId && latitude !== null && longitude !== null) {
            const response = await updateLocation({
              id: userId,
              location: [latitude, longitude]
            });
            // console.log(response);
            if (response) {
              router.push('/my-profile');
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{
       fetchData()
    },[load])

  return (
    <>
   <div className="sticky-nav">
        <Link href="/"><i className="fa fa-search active" aria-hidden="true"></i></Link>
        <Link href="/chat"><i className="fas fa-comment-dots"></i></Link>
        <Avatar onClick={getLocation} sizes='small' src={data?.user?.avatarPhotos[0]?.url} sx={{cursor:'pointer'}}/>
    </div>
    </>
  )
}

export default Appbar
