import { AttachMoney, Favorite, Key, SentimentSatisfiedAlt } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { updateLocation } from '../mutation/update'

const Welcome = () => {
    const  router = useRouter();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const[load,setLoad] = useState(false)
    const [userId ,setUserId] = useState();
    console.log(userId)
    useEffect(() => {
      // Retrieve userId from localStorage on component mount
      const id = localStorage.getItem('userId');
      setUserId(id || '');
    }, []);
    console.log(latitude)
    console.log(longitude)
  
    let cord = [latitude,longitude]
    console.log(cord)
  
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
            setError(error.message);
            setLoad(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
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
            console.log(response);
            if (response) {
              router.push('/search');
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
       <div className="login-container">
       <div className="div-curve">
            <img src="images/login-bg-3.png" alt="" className="overlay "/>
            <h2 className="font-weight-bold">Welcome To</h2>
            <img src="images/logo-black.png" className="logo" alt=""/>
            
        </div>

        <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px'}}>
            <Typography>You can use iSixtyNine to search for !</Typography>
        </Box>


        <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px'}}>
        <Box sx={{width:'80%',display:'flex',justifyContent:'space-between'}}>
            <Box sx={{width:'20%',height:'200px',border:'1px solid #F4D279',borderRadius:'20px',background:'rgba(0,0,0,0.2)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <Box sx={{height:'120px',width:'120px',border:'1px solid #F4D279',borderRadius:'70px',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
                     <SentimentSatisfiedAlt sx={{color:'#F4D279',fontSize:'100px'}}/>
                 </Box>
                 <Typography sx={{color:'#F4D279'}}>NEW FRIENDS</Typography>
            </Box>


            <Box sx={{width:'20%',height:'200px',border:'1px solid #F4D279',borderRadius:'20px',background:'rgba(0,0,0,0.2)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <Box sx={{height:'120px',width:'120px',border:'1px solid #F4D279',borderRadius:'70px',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
                     <Favorite sx={{color:'#F4D279',fontSize:'100px'}}/>
                 </Box>
                 <Typography sx={{color:'#F4D279'}}>RELATIONSHIP</Typography>
            </Box>


            <Box sx={{width:'20%',height:'200px',border:'1px solid #F4D279',borderRadius:'20px',background:'rgba(0,0,0,0.2)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <Box sx={{height:'120px',width:'120px',border:'1px solid #F4D279',borderRadius:'70px',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
                     <Key sx={{color:'#F4D279',fontSize:'100px'}}/>
                 </Box>
                 <Typography sx={{color:'#F4D279'}}>ROOMMATES</Typography>
            </Box>


            <Box sx={{width:'20%',height:'200px',border:'1px solid #F4D279',borderRadius:'20px',background:'rgba(0,0,0,0.2)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                 <Box sx={{height:'120px',width:'120px',border:'1px solid #F4D279',borderRadius:'70px',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
                     <AttachMoney sx={{color:'#F4D279',fontSize:'100px'}}/>
                 </Box>
                 <Typography sx={{color:'#F4D279',textAlign:'center'}}>BUSSINESS CONTACTS</Typography>
            </Box>
        </Box>
        </Box>


        <Box sx={{width:'100%',display:'flex',justifyContent:'center',marginTop:'40px',paddingBottom:'50px'}}>
            <Box onClick={getLocation} sx={{width:'20%',height:'50px',background:'#F4D279',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'20px',cursor:'pointer'}}>
                <Typography sx={{color:'black'}}>Click here to Start!</Typography>
            </Box>
        </Box>
       </div>
    </>
  )
}

export default Welcome
