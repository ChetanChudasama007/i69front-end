import React from 'react'
import { Box, Typography } from '@mui/material'
import { AttachMoney, Favorite, Key, NavigateNext, SentimentSatisfiedAlt } from '@mui/icons-material'
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../layouts/Navbar'))
const Appbar = dynamic(() => import('../layouts/Appbar'))

const Category = () => {
  return (
    <>
      {/* <Navbar/> */}
      <div className="login-container">
        <Box sx={{width:'100%',display:'flex',marginTop:'20px',flexDirection:'column',alignItems:'center',gap:'20px'}}>
          <Box sx={{width:'50%',height:'150px',border:'2px solid #F4D279',borderRadius:'20px',background:'#373A3F',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
          <Favorite sx={{color:'#F4D279',fontSize:'100px'}}/>
          <Typography sx={{color:'#F4D279'}}>SERIOUS RELATIONSHIP</Typography>
          <NavigateNext sx={{color:'#F4D279',fontSize:'30px'}}/>
          </Box>


          <Box sx={{width:'50%',height:'150px',border:'2px solid #F4D279',borderRadius:'20px',background:'#373A3F',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
          <Favorite sx={{color:'#F4D279',fontSize:'100px'}}/>
          <Typography sx={{color:'#F4D279'}}>CASUAL DATING</Typography>
          <NavigateNext sx={{color:'#F4D279',fontSize:'30px'}}/>
          </Box>

          <Box sx={{width:'50%',height:'150px',border:'2px solid #F4D279',borderRadius:'20px',background:'#373A3F',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
          <SentimentSatisfiedAlt sx={{color:'#F4D279',fontSize:'100px'}}/>
          <Typography sx={{color:'#F4D279'}}>NEW FRIENDS</Typography>
          <NavigateNext sx={{color:'#F4D279',fontSize:'30px'}}/>
          </Box>


          <Box sx={{width:'50%',height:'150px',border:'2px solid #F4D279',borderRadius:'20px',background:'#373A3F',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
          <Key sx={{color:'#F4D279',fontSize:'100px'}}/>
          <Typography sx={{color:'#F4D279'}}>ROOMMATES</Typography>
          <NavigateNext sx={{color:'#F4D279',fontSize:'30px'}}/>
          </Box>

          <Box sx={{width:'50%',height:'150px',border:'2px solid #F4D279',borderRadius:'20px',background:'#373A3F',display:'flex',alignItems:'center',justifyContent:'space-around',marginBottom:'100px'}}>
          <AttachMoney sx={{color:'#F4D279',fontSize:'100px'}}/>
          <Typography sx={{color:'#F4D279'}}>BUSSINESS CONTACTS</Typography>
          <NavigateNext sx={{color:'#F4D279',fontSize:'30px'}}/>
          </Box>

        </Box>
      </div>
      <Appbar/>
    </>
  )
}

export default Category
