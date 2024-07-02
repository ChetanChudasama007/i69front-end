import { Female, Male } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { updateIntrest } from "../mutation/update";

const IntrestedIn = () => {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState([]);
  const [userId, setUserId] = useState();
  const [gender, setGender] = useState([]);

  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const handleDivClick = (value) => {
    if (selectedValues.includes(value)) {
      // If the value is already selected, remove it from the array
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      // If the value is not selected, add it to the array
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleGender = (value) => {
    if (gender.includes(value)) {
      // If the value is already selected, remove it from the array
      setGender(gender.filter((item) => item !== value));
    } else {
      // If the value is not selected, add it to the array
      setGender([...gender, value]);
    }
  };
  console.log(selectedValues);

  const fetchData = async () => {
    try {
      let response = await updateIntrest({
        id: userId,
        intrestedIn: selectedValues,
      });
      console.log(response);
      if (response) {
        router.push("/tags");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#202427",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
          }}
        >
          <img
            src="/images/logo-right.jpg"
            alt=""
            style={{ height: "30px", width: "30px" }}
          />
          <Typography>INTRESTED</Typography>
          <Typography
            onClick={fetchData}
            style={{ color: "#EFD383", cursor: "pointer" }}
          >
            SAVE
          </Typography>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#2B2F32",
        }}
      >
        <Typography>
          Choose a categories which you want to be show in.
        </Typography>
      </div>

      <Box sx={{width:'100%',height:'140vh',display:'flex',background:'#373A3F',paddingTop:'20px',flexDirection:'column',alignItems:'center'}}>
          <Box onClick={()=>handleDivClick(1)} sx={{width:'70%',display:'flex',flexDirection:'column',alignItems:'center'}}>
               <Typography sx={{color:'#EFD383'}}>SERIOUS RELATIONSHIP</Typography>

               <Box sx={{width:'70%',display:'flex',justifyContent:'space-between',borderBottom:'2px solid black',paddingBottom:'20px'}}>
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(1)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(1) ? 'gray':"transparent"}}>
                     <Male sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>MAN</Typography>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(2)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(2) ? 'gray':"transparent"}}>
                     <Female sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>WOMAN</Typography>
                </Box>
               </Box>
          </Box>

          <Box onClick={()=>handleDivClick(2)} sx={{width:'70%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px'}}>
               <Typography sx={{color:'#EFD383'}}>CASUAL DATING</Typography>

               <Box sx={{width:'70%',display:'flex',justifyContent:'space-between',borderBottom:'2px solid black',paddingBottom:'20px'}}>
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(3)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(3) ? 'gray':"transparent"}}>
                     <Male sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>MAN</Typography>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(4)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(4) ? 'gray':"transparent"}}>
                     <Female sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>WOMAN</Typography>
                </Box>
               </Box>
          </Box>


          <Box onClick={()=>handleDivClick(3)} sx={{width:'70%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px'}}>
               <Typography sx={{color:'#EFD383'}}>NEW FRIENDS</Typography>

               <Box sx={{width:'70%',display:'flex',justifyContent:'space-between',borderBottom:'2px solid black',paddingBottom:'20px'}}>
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(5)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(5) ? 'gray':"transparent"}}>
                     <Male sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>MAN</Typography>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(6)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(6) ? 'gray':"transparent"}}>
                     <Female sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>WOMAN</Typography>
                </Box>
               </Box>
          </Box>


          <Box onClick={()=>handleDivClick(4)} sx={{width:'70%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px'}}>
               <Typography sx={{color:'#EFD383'}}>ROOMMATES</Typography>

               <Box sx={{width:'70%',display:'flex',justifyContent:'space-between',borderBottom:'2px solid black',paddingBottom:'20px'}}>
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(7)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(7) ? 'gray':"transparent"}}>
                     <Male sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>MAN</Typography>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(8)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(8) ? 'gray':"transparent"}}>
                     <Female sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>WOMAN</Typography>
                </Box>
               </Box>
          </Box>


          <Box onClick={()=>handleDivClick(5)} sx={{width:'70%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px'}}>
               <Typography sx={{color:'#EFD383'}}>BUSSINESS CONTACTS</Typography>

               <Box sx={{width:'70%',display:'flex',justifyContent:'space-between',borderBottom:'2px solid black',paddingBottom:'20px'}}>
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(9)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(9) ? 'gray':"transparent"}}>
                     <Male sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>MAN</Typography>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <Box onClick={()=>handleGender(10)} sx={{height:'90px',width:'90px',borderRadius:'50px',border:'2px solid #EFD383',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',background:gender.includes(10) ? 'gray':"transparent"}}>
                     <Female sx={{color:'#EFD383',fontSize:'60px'}}/>
                   </Box>
                   <Typography sx={{color:'#EFD383'}}>WOMAN</Typography>
                </Box>
               </Box>
          </Box>
      </Box>
    </>
  );
};

export default IntrestedIn;
