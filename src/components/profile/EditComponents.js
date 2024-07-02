import { gql, useLazyQuery } from '@apollo/client'
import { Add } from '@mui/icons-material'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const GENDER_QUERY = gql`
query picker {
    defaultPicker{
      genderPicker{
        id
        value
      }
    }
  }
`

const AGE_QUERY = gql`
query picker {
  defaultPicker{
    agePicker{
      id
      value
    }
  }
}
`
const LANGUAGE_QUERY = gql`
query picker {
  defaultPicker{
    languagePicker{
      id
      value
    }
  }
}
`
const HEIGHT_QUERY = gql`
query picker {
  defaultPicker{
    heightsPicker{
      id
      value
    }
  }
}
`

const FAMILY_QUERY = gql`
query picker {
  defaultPicker{
    familyPicker{
      id
      value
    }
  }
}
`

const Gender = ({setGender,user}) => {
    const [getGenderData, {data,error,loading}] = useLazyQuery(GENDER_QUERY);

    useEffect(() => {
        getGenderData();
    }, []);

    
    let genderData = (data?.defaultPicker?.genderPicker)
    const selectedOption = genderData?.find(option => option?.id === user?.gender);
   
  return (
    <>
       <Box sx={{marginTop:'20px'}}>
           <Typography sx={{color:'#E6C66C'}}>Gender</Typography>
           <Autocomplete
           fullWidth
           options={genderData}
           getOptionLabel={(item) => String(item?.value) || ''}
        //    value={selectedOption || null}
           onChange={(event, newValue) => setGender(newValue)}
      disablePortal
      id="combo-box-demo"
      
      renderInput={(params) => <TextField {...params}  variant='standard' fullWidth  />}
    />

           </Box>
    </>
  )
}

export const Languages = ({setLang,user}) => {
  const [getLanguageData, {data,error,loading}] = useLazyQuery(LANGUAGE_QUERY);

    useEffect(() => {
      getLanguageData();
    }, []);

  let langData = (data?.defaultPicker?.languagePicker)
  const selectedOption = langData?.find(option => option?.id === 1);
  console.log(selectedOption,'lang')
return (
  <>
     <Box sx={{marginTop:'20px'}}>
         <Typography sx={{color:'#E6C66C'}}>Language</Typography>
         <Autocomplete
         fullWidth
         options={langData}
         getOptionLabel={(item) => String(item?.value) || ''}
        //  value={selectedOption || null}
         onChange={(event, newValue) => setLang(newValue)}
    disablePortal
    id="combo-box-demo"
    
    renderInput={(params) => <TextField {...params}  variant='standard' fullWidth  />}
  />
    </Box>
  </>
  )
}

export const Ages = ({ setAge, age,user }) => {
  const [getAgeData, {data,error,loading}] = useLazyQuery(AGE_QUERY);

    useEffect(() => {
      getAgeData();
    }, []);

  let ageData = data?.defaultPicker?.agePicker || [];

const selectedOption = ageData?.find(option => option?.value === user?.age);
console.log(user?.age)
console.log(selectedOption,'age')
  return (
    <>
      <Box sx={{ marginTop: '20px' }}>
        <Typography sx={{ color: '#E6C66C' }}>Age</Typography>
        <Autocomplete
          fullWidth
          options={ageData}
          getOptionLabel={(item) => String(item?.value) || ''}
        //   value={selectedOption||null}
          onChange={(event, newValue) => setAge(newValue ? newValue?.value : null)}
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField
              {...params}
             
              variant="standard"
              fullWidth
              
            />
          )}
        />
      </Box>
    </>
  );
};


export const Heights = ({setHeight,user}) => {
  const [getHeightData, {data,error,loading}] = useLazyQuery(HEIGHT_QUERY);

    useEffect(() => {
      getHeightData();
    }, []);

  let heightData = (data?.defaultPicker?.heightsPicker)
  const selectedOption = heightData?.find(option => option?.id === user?.height);
return (
  <>
     <Box sx={{marginTop:'20px'}}>
         <Typography sx={{color:'#E6C66C'}}>Height</Typography>
         <Autocomplete
         fullWidth
         options={heightData}
         getOptionLabel={(item) => String(item?.value) || ''}
        //  value={selectedOption||null}
         onChange={(event, newValue) => setHeight(newValue)}
    disablePortal
    id="combo-box-demo"
    
    renderInput={(params) => <TextField {...params}  variant='standard' fullWidth  />}
  />

         </Box>
  </>
  )
}


export const FamilyPlans = ({setFamily,user}) => {
  const [getFamilyData, {data,error,loading}] = useLazyQuery(FAMILY_QUERY);

  useEffect(() => {
    getFamilyData();
  }, []);

  let familyData = (data?.defaultPicker?.familyPicker)
  const selectedOption = familyData?.find(option => option?.id === user?.familyPlans);
return (
  <>
     <Box sx={{marginTop:'20px'}}>
         <Typography sx={{color:'#E6C66C'}}>FamilyPlan</Typography>
         <Autocomplete
         fullWidth
         options={familyData}
         getOptionLabel={(item) => String(item?.value) || ''}
        //  value={selectedOption || null}
         onChange={(event, newValue) => setFamily(newValue)}
         disablePortal
         id="combo-box-demo"
    
    renderInput={(params) => <TextField {...params} variant='standard' fullWidth  />}
  />
    </Box>
  </>
  )
}


export const Music = ({setMusic}) => {
  const [musicList, setMusicList] = useState([]); // State to hold the list of music items
  const [newMusic, setNewMusic] = useState(''); // State to hold the value of the new music input field

  const handleAddMusic = () => {
    if (newMusic.trim() !== '') { // Check if the input is not empty
      setMusicList([...musicList, newMusic]);
      setMusic([...musicList,newMusic]); // Add the new music to the list
      setNewMusic(''); // Clear the input field
    }
   
  };
  return(
    <>
 <Box sx={{marginTop:'20px'}}>
            <Typography sx={{color:'#E6C66C'}}>Music</Typography>
           {musicList.length>0 && 
            <Box sx={{width:'100%',display:'flex',gap:'10px'}}>
              {musicList && musicList.length>0 && musicList.map((item,index)=>(

            <Typography key={index} sx={{color:'white'}}>{item}</Typography>
              ))}
            </Box>
           }
            <TextField
        variant='standard'
        fullWidth
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{
          style: { color: 'white' },
          startAdornment: (
            <Add
              sx={{
                border: '2px solid black',
                background: '#E6C66C',
                color: 'black',
                borderRadius: '50px',
                cursor: 'pointer'
              }}
              onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
            />
          )
        }}
        value={newMusic}
        onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
      />
           </Box>
    </>
  )
}



export const Movies = ({setMovies}) => {
  const [musicList, setMusicList] = useState([]); // State to hold the list of music items
  const [newMusic, setNewMusic] = useState(''); // State to hold the value of the new music input field

  const handleAddMusic = () => {
    if (newMusic.trim() !== '') { // Check if the input is not empty
      setMusicList([...musicList, newMusic]);
      setMovies([...musicList, newMusic]) // Add the new music to the list
      setNewMusic(''); // Clear the input field
    }
  
  };
  return(
    <>
 <Box sx={{marginTop:'20px'}}>
            <Typography sx={{color:'#E6C66C'}}>Movies</Typography>
           {musicList.length>0 && 
            <Box sx={{width:'100%',display:'flex',gap:'10px'}}>
              {musicList && musicList.length>0 && musicList.map((item,index)=>(

            <Typography key={index} sx={{color:'white'}}>{item}</Typography>
              ))}
            </Box>
           }
            <TextField
        variant='standard'
        fullWidth
        InputLabelProps={{ style: { color: 'black' } }}
        InputProps={{
          style: { color: 'black' },
          startAdornment: (
            <Add
              sx={{
                border: '2px solid black',
                background: '#E6C66C',
                color: 'black',
                borderRadius: '50px',
                cursor: 'pointer'
              }}
              onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
            />
          )
        }}
        value={newMusic}
        onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
      />
           </Box>
    </>
  )
}


export const Tvshows = ({setTvshows}) => {
  const [musicList, setMusicList] = useState([]); // State to hold the list of music items
  const [newMusic, setNewMusic] = useState(''); // State to hold the value of the new music input field

  const handleAddMusic = () => {
    if (newMusic.trim() !== '') { // Check if the input is not empty
      setMusicList([...musicList, newMusic]);
      setTvshows([...musicList, newMusic]) // Add the new music to the list
      setNewMusic(''); // Clear the input field
    }
    
  };
  return(
    <>
 <Box sx={{marginTop:'20px'}}>
            <Typography sx={{color:'#E6C66C'}}>TV Shows</Typography>
           {musicList.length>0 && 
            <Box sx={{width:'100%',display:'flex',gap:'10px'}}>
              {musicList && musicList.length>0 && musicList.map((item,index)=>(

            <Typography key={index} sx={{color:'black'}}>{item}</Typography>
              ))}
            </Box>
           }
            <TextField
        variant='standard'
        fullWidth
        InputLabelProps={{ style: { color: 'black' } }}
        InputProps={{
          style: { color: 'white' },
          startAdornment: (
            <Add
              sx={{
                border: '2px solid black',
                background: '#E6C66C',
                color: 'black',
                borderRadius: '50px',
                cursor: 'pointer'
              }}
              onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
            />
          )
        }}
        value={newMusic}
        onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
      />
           </Box>
    </>
  )
}


export const SportTeams = ({setSport}) => {
  const [musicList, setMusicList] = useState([]); // State to hold the list of music items
  const [newMusic, setNewMusic] = useState(''); // State to hold the value of the new music input field

  const handleAddMusic = () => {
    if (newMusic.trim() !== '') { // Check if the input is not empty
      setMusicList([...musicList, newMusic]);
      setSport([...musicList, newMusic]) // Add the new music to the list
      setNewMusic(''); // Clear the input field
    }
    
  };
  return(
    <>
 <Box sx={{marginTop:'20px'}}>
            <Typography sx={{color:'#E6C66C'}}>Sport Teams</Typography>
           {musicList.length>0 && 
            <Box sx={{width:'100%',display:'flex',gap:'10px'}}>
              {musicList && musicList.length>0 && musicList.map((item,index)=>(

            <Typography key={index} sx={{color:'black'}}>{item}</Typography>
              ))}
            </Box>
           }
            <TextField
        variant='standard'
        fullWidth
        InputLabelProps={{ style: { color: 'black' } }}
        InputProps={{
          style: { color: 'white' },
          startAdornment: (
            <Add
              sx={{
                border: '2px solid black',
                background: '#E6C66C',
                color: 'black',
                borderRadius: '50px',
                cursor: 'pointer'
              }}
              onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
            />
          )
        }}
        value={newMusic}
        onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
      />
           </Box>
    </>
  )
}

export default Gender


