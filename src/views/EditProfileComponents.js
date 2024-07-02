import { gql, useLazyQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const GENDER_QUERY = gql`
  query picker {
    defaultPicker {
      genderPicker {
        id
        value
      }
    }
  }
`;

const AGE_QUERY = gql`
  query picker {
    defaultPicker {
      agePicker {
        id
        value
      }
    }
  }
`;
const LANGUAGE_QUERY = gql`
  query picker {
    defaultPicker {
      languagePicker {
        id
        value
      }
    }
  }
`;
const HEIGHT_QUERY = gql`
  query picker {
    defaultPicker {
      heightsPicker {
        id
        value
      }
    }
  }
`;

const FAMILY_QUERY = gql`
  query picker {
    defaultPicker {
      familyPicker {
        id
        value
      }
    }
  }
`;

const ETHINICITY_QUERY = gql`
  query picker {
    defaultPicker {
      ethnicityPicker {
        id
        value
      }
    }
  }
`;

const RELIGION_QUERY = gql`
  query picker {
    defaultPicker {
      religiousPicker {
        id
        value
      }
    }
  }
`;

const ZODIACSIGN_QUERY = gql`
  query picker {
    defaultPicker {
      zodiacSignPicker {
        id
        value
      }
    }
  }
`;

const POLITICS_QUERY = gql`
  query picker {
    defaultPicker {
      politicsPicker {
        id
        value
      }
    }
  }
`;

const Gender = ({ setGender, user, gender }) => {
  const [getGenderData, { data, error, loading }] = useLazyQuery(GENDER_QUERY);

  useEffect(() => {
    getGenderData();
  }, []);

  let genderData = data?.defaultPicker?.genderPicker;
  let genderVal = gender ? gender : user?.gender;
  const selectedOption = genderData?.find((option) => option?.id === genderVal);

  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Gender</Typography>
        <Autocomplete
          fullWidth
          options={genderData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) =>
            setGender(newValue ? newValue?.id : null)
          }
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const Languages = ({ setLang, user, lang }) => {
  const [getLanguageData, { data, error, loading }] =
    useLazyQuery(LANGUAGE_QUERY);

  useEffect(() => {
    getLanguageData();
  }, []);

  let langData = data?.defaultPicker?.languagePicker;
  let langVal = lang ? lang : user?.lang;
  const selectedOption = langData?.find((option) => option?.id === langVal);
  // console.log(selectedOption,'lang')
  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Language</Typography>
        <Autocomplete
          fullWidth
          options={langData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) =>
            setLang(newValue ? newValue?.id : null)
          }
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const InterestedIn = ({}) => {
  const options1 = [
    "New friends with",
    "Roommates with",
    "Casual Dating with",
    "Business Contacts with",
  ];
  const genderOptions = ["Male", "Female", "Both"];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const id = open ? "simple-popover" : undefined;
  const id2 = open2 ? "simple-popover2" : undefined;

  return (
    <>
      <Box className="head-wrap">
        <Typography sx={{ color: "#E6C66C" }}>Interested In</Typography>
        <img onClick={handleClick} src="/images/plus_add.svg" alt="" />
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={{ paper: "interested-popover" }}
      >
        <Box display="flex" flexDirection="column">
          {options1.map((option, index) => (
            <Box
              key={`option-${option}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              className="interested-wrapper"
            >
              <Typography sx={{ color: "#000" }}>
                {option.toUpperCase()} :
              </Typography>
              <img onClick={handleClick2} src="/images/plus_add.svg" alt="" />
            </Box>
          ))}
        </Box>
      </Popover>
      <Popover
        id={id2}
        open={open2}
        anchorEl={anchorEl2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
        classes={{ paper: "interested-popover-2" }}
      >
        <Box display="flex" flexDirection="column">
          {genderOptions.map((option, index) => (
            <Box
              key={`option-${option}-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              className="interested-wrapper"
            >
              <Typography sx={{ color: "#000" }}>
                {option.toUpperCase()} :
              </Typography>
              <img onClick={() => {}} src="/images/plus_add.svg" alt="" />
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export const Ages = ({ setAge, age, user }) => {
  const [getAgeData, { data, error, loading }] = useLazyQuery(AGE_QUERY);

  useEffect(() => {
    getAgeData();
  }, []);

  let ageData = data?.defaultPicker?.agePicker || [];
  if (loading)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  // console.log(ageData)

  let ageVal = age ? age : user?.age;
  const selectedAge = ageData?.find((option) => option?.id === ageVal);

  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Age</Typography>
        <Autocomplete
          fullWidth
          options={ageData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedAge || null}
          onChange={(event, newValue) => setAge(newValue ? newValue?.id : null)}
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const Heights = ({ setHeight, user, height }) => {
  const [getHeightData, { data, error, loading }] = useLazyQuery(HEIGHT_QUERY);

  useEffect(() => {
    getHeightData();
  }, []);

  let heightData = data?.defaultPicker?.heightsPicker;
  let heightVal = height ? height : user?.height;

  const selectedOption = heightData?.find((option) => option?.id === heightVal);
  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Height</Typography>
        <Autocomplete
          fullWidth
          options={heightData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) =>
            setHeight(newValue ? newValue?.id : null)
          }
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const FamilyPlans = ({ setFamily, user, family }) => {
  const [getFamilyData, { data, error, loading }] = useLazyQuery(FAMILY_QUERY);

  useEffect(() => {
    getFamilyData();
  }, []);
  let familyData = data?.defaultPicker?.familyPicker;
  let familyVal = family ? family : user?.familyPlans;
  const selectedOption = familyData?.find((option) => option?.id === familyVal);
  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>FamilyPlan</Typography>
        <Autocomplete
          fullWidth
          options={familyData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) =>
            setFamily(newValue ? newValue?.id : null)
          }
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const Politics = ({ setPolitics, user, politics }) => {
  const [getPoliticsData, { data, error, loading }] =
    useLazyQuery(POLITICS_QUERY);

  useEffect(() => {
    getPoliticsData();
  }, []);

  let politicsData = data?.defaultPicker?.politicsPicker;
  let politicsVal = politics ? politics : user?.politics;
  const selectedOption = politicsData?.find(
    (option) => option?.id === politicsVal
  );

  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Politic Views</Typography>
        <Autocomplete
          fullWidth
          options={politicsData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) => {
            setPolitics(newValue ? newValue?.id : null);
          }}
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const Ethinicity = ({ setEthnicity, user, ethnicity }) => {
  const [getEthinicityData, { data, error, loading }] =
    useLazyQuery(ETHINICITY_QUERY);

  useEffect(() => {
    getEthinicityData();
  }, []);
  let ethinicityData = data?.defaultPicker?.ethnicityPicker;
  let ethnicityVal = ethnicity ? ethnicity : user?.ethnicity;
  const selectedOption = ethinicityData?.find(
    (option) => option?.id === ethnicityVal
  );

  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Ethnicity</Typography>
        <Autocomplete
          fullWidth
          options={ethinicityData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) =>
            setEthnicity(newValue ? newValue?.id : null)
          }
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const Religion = ({ setReligion, user, religion }) => {
  const [getReligionData, { data, error, loading }] =
    useLazyQuery(RELIGION_QUERY);

  useEffect(() => {
    getReligionData();
  }, []);
  let religionData = data?.defaultPicker?.religiousPicker;
  let religionVal = religion ? religion : user?.religion;
  const selectedOption = religionData?.find(
    (option) => option?.id === religionVal
  );
  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Religious beliefs</Typography>
        <Autocomplete
          fullWidth
          options={religionData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) =>
            setReligion(newValue ? newValue?.id : null)
          }
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const ZodiacSign = ({ setZodiacSign, user, zodiacSign }) => {
  const [getZodiacSignData, { data, error, loading }] =
    useLazyQuery(ZODIACSIGN_QUERY);

  useEffect(() => {
    getZodiacSignData();
  }, []);
  let zodiacSignData = data?.defaultPicker?.zodiacSignPicker;
  let zodiacSignVal = zodiacSign ? zodiacSign : user?.zodiacSign;
  const selectedOption = zodiacSignData?.find(
    (option) => option?.id === zodiacSignVal
  );
  return (
    <>
      <Box className="user-info-dropdown">
        <Typography sx={{ color: "#E6C66C" }}>Zodiac sign beliefs</Typography>
        <Autocomplete
          fullWidth
          options={zodiacSignData}
          getOptionLabel={(item) => String(item?.value) || ""}
          value={selectedOption || null}
          onChange={(event, newValue) =>
            setZodiacSign(newValue ? newValue?.id : null)
          }
          disablePortal
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} variant="standard" fullWidth />
          )}
        />
      </Box>
    </>
  );
};

export const Music = ({ setMusic, music }) => {
  const [musicList, setMusicList] = useState([]); // State to hold the list of music items
  const [newMusic, setNewMusic] = useState(""); // State to hold the value of the new music input field

  useEffect(() => {
    if (music && music.length > 0) {
      setMusicList(music);
    }
  }, [music]);

  const handleAddMusic = () => {
    if (newMusic.trim() !== "") {
      // Check if the input is not empty
      setMusicList([...musicList, newMusic]);
      setMusic([...musicList, newMusic]); // Add the new music to the list
      setNewMusic(""); // Clear the input field
    }
  };
  return (
    <>
      <Box className="chips-wrapper">
        <Box className="head-wrap">
          <Typography sx={{ color: "#E6C66C" }}>Music</Typography>
          <img onClick={handleAddMusic} src="/images/plus_add.svg" alt="" />
          {/* <Add
                sx={{
                  border: "2px solid black",
                  background: "#E6C66C",
                  color: "black",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
                onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
              /> */}
        </Box>

        <Box className="input-box">
          {musicList.length > 0 && (
            <Box sx={{ width: "auto", display: "flex", gap: "10px" }}>
              {musicList &&
                musicList.length > 0 &&
                musicList.map((item, index) => (
                  <Typography
                    className="profile-btn-chips "
                    key={index}
                    sx={{ color: "white", textAlign: "center" }}
                  >
                    {item}
                  </Typography>
                ))}
            </Box>
          )}
          <TextField
            variant="standard"
            fullWidth
            placeholder="Music"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", textAlign: "center" },
            }}
            onBlur={() => {
              setMusic(
                musicList.length > 0 ? [...musicList, newMusic] : [newMusic]
              )
              setNewMusic("");
            }}
            value={newMusic}
            onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
          />
        </Box>
      </Box>
    </>
  );
};

export const Movies = ({ setMovies, movies }) => {
  const [movieList, setMovieList] = useState([]); // State to hold the list of music items
  const [newMovie, setNewMovie] = useState(""); // State to hold the value of the new music input field

  useEffect(() => {
    if (movies && movies.length > 0) {
      setMovieList(movies);
    }
  }, [movies]);

  const handleAddMovies = () => {
    if (newMovie.trim() !== "") {
      // Check if the input is not empty
      setMovieList([...movieList, newMovie]);
      setMovies([...movieList, newMovie]); // Add the new music to the list
      setNewMovie(""); // Clear the input field
    }
  };
  return (
    // <>
    //   <Box sx={{ marginTop: "20px" }}>
    //     <Typography sx={{ color: "#E6C66C" }}>Movies</Typography>
    //     {musicList.length > 0 && (
    //       <Box sx={{ width: "100%", display: "flex", gap: "10px" }}>
    //         {musicList &&
    //           musicList.length > 0 &&
    //           musicList.map((item, index) => (
    //             <Typography key={index} sx={{ color: "white" }}>
    //               {item}
    //             </Typography>
    //           ))}
    //       </Box>
    //     )}
    //     <TextField
    //       variant="standard"
    //       fullWidth
    //       InputLabelProps={{ style: { color: "black" } }}
    //       InputProps={{
    //         style: { color: "black" },
    //         startAdornment: (
    //           <Add
    //             sx={{
    //               border: "2px solid black",
    //               background: "#E6C66C",
    //               color: "black",
    //               borderRadius: "50px",
    //               cursor: "pointer",
    //             }}
    //             onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
    //           />
    //         ),
    //       }}
    //       value={newMusic}
    //       onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
    //     />
    //   </Box>
    // </>
    <Box className="chips-wrapper">
      <Box className="head-wrap">
        <Typography sx={{ color: "#E6C66C" }}>Movies</Typography>
        <img onClick={handleAddMovies} src="/images/plus_add.svg" alt="" />
        {/* <Add
                sx={{
                  border: "2px solid black",
                  background: "#E6C66C",
                  color: "black",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
                onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
              /> */}
      </Box>

      <Box className="input-box">
        {movieList.length > 0 && (
          <Box sx={{ width: "auto", display: "flex", gap: "10px" }}>
            {movieList &&
              movieList.length > 0 &&
              movieList.map((item, index) => (
                <Typography
                  className="profile-btn-chips "
                  key={index}
                  sx={{ color: "white" }}
                >
                  {item}
                </Typography>
              ))}
          </Box>
        )}
        <TextField
          variant="standard"
          fullWidth
          InputLabelProps={{ style: { color: "black" } }}
          InputProps={{
            style: { color: "white", textAlign: "center" },
          }}
          placeholder="Movies"
          value={newMovie}
          onBlur={() => {
            setMovies(
              movieList.length > 0 ? [...movieList, newMovie] : [newMovie]
            )
            setNewMovie("");
          }}
          onChange={(e) => setNewMovie(e.target.value)} // Update newMusic state as the input changes
        />
      </Box>
    </Box>
  );
};

export const Tvshows = ({ setTvshows, tvsShows }) => {
  const [tvShowsList, setTvShowList] = useState([]); // State to hold the list of music items
  const [tvShow, setTvShow] = useState(""); // State to hold the value of the new music input field

  useEffect(() => {
    if (tvsShows && tvsShows.length > 0) {
      setTvShowList(tvsShows);
    }
  }, [tvsShows]);

  const handleAddTvsShow = () => {
    if (tvShow.trim() !== "") {
      // Check if the input is not empty
      setTvShowList([...tvShowsList, tvShow]);
      setTvshows([...tvShowsList, tvShow]); // Add the new music to the list
      setTvShow(""); // Clear the input field
    }
  };
  return (
    <>
      {/* <Box sx={{ marginTop: "20px" }}>
        <Typography sx={{ color: "#E6C66C" }}>TV Shows</Typography>
        {musicList.length > 0 && (
          <Box sx={{ width: "100%", display: "flex", gap: "10px" }}>
            {musicList &&
              musicList.length > 0 &&
              musicList.map((item, index) => (
                <Typography key={index} sx={{ color: "black" }}>
                  {item}
                </Typography>
              ))}
          </Box>
        )}
        <TextField
          variant="standard"
          fullWidth
          InputLabelProps={{ style: { color: "black" } }}
          InputProps={{
            style: { color: "white" },
            startAdornment: (
              <Add
                sx={{
                  border: "2px solid black",
                  background: "#E6C66C",
                  color: "black",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
                onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
              />
            ),
          }}
          value={newMusic}
          onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
        />
      </Box> */}
      <Box className="chips-wrapper">
        <Box className="head-wrap">
          <Typography sx={{ color: "#E6C66C" }}>TV Shows</Typography>
          <img onClick={handleAddTvsShow} src="/images/plus_add.svg" alt="" />
          {/* <Add
                sx={{
                  border: "2px solid black",
                  background: "#E6C66C",
                  color: "black",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
                onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
              /> */}
        </Box>

        <Box className="input-box">
          {tvShowsList.length > 0 && (
            <Box sx={{ width: "auto", display: "flex", gap: "10px" }}>
              {tvShowsList &&
                tvShowsList.length > 0 &&
                tvShowsList.map((item, index) => (
                  <Typography
                    className="profile-btn-chips "
                    key={index}
                    sx={{ color: "white" }}
                  >
                    {item}
                  </Typography>
                ))}
            </Box>
          )}
          <TextField
            variant="standard"
            fullWidth
            placeholder="TV Shows"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", width: "auto" },
            }}
            onBlur={() => {
              setTvshows(
                tvShowsList.length > 0 ? [...tvShowsList, tvShow] : [tvShow]
              )
              setTvShow("");
            }}
            value={tvShow}
            onChange={(e) => setTvShow(e.target.value)} // Update newMusic state as the input changes
          />
        </Box>
      </Box>
    </>
  );
};

export const SportTeams = ({ setSport }) => {
  const [musicList, setMusicList] = useState([]); // State to hold the list of music items
  const [newMusic, setNewMusic] = useState(""); // State to hold the value of the new music input field

  const handleAddMusic = () => {
    if (newMusic.trim() !== "") {
      // Check if the input is not empty
      setMusicList([...musicList, newMusic]);
      setSport([...musicList, newMusic]); // Add the new music to the list
      setNewMusic(""); // Clear the input field
    }
  };
  return (
    <>
      <Box sx={{ marginTop: "20px" }}>
        <Typography sx={{ color: "#E6C66C" }}>Sport Teams</Typography>
        {musicList.length > 0 && (
          <Box sx={{ width: "100%", display: "flex", gap: "10px" }}>
            {musicList &&
              musicList.length > 0 &&
              musicList.map((item, index) => (
                <Typography key={index} sx={{ color: "black" }}>
                  {item}
                </Typography>
              ))}
          </Box>
        )}
        <TextField
          variant="standard"
          fullWidth
          InputLabelProps={{ style: { color: "black" } }}
          InputProps={{
            style: { color: "white" },
            startAdornment: (
              <Add
                sx={{
                  border: "2px solid black",
                  background: "#E6C66C",
                  color: "black",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
                onClick={handleAddMusic} // Call handleAddMusic when Add button is clicked
              />
            ),
          }}
          value={newMusic}
          onBlur={() => setSport([newMusic])}
          onChange={(e) => setNewMusic(e.target.value)} // Update newMusic state as the input changes
        />
      </Box>
    </>
  );
};

export default Gender;
