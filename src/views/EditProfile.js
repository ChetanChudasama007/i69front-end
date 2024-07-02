import { ArrowBackIos, Close } from "@material-ui/icons";
import { Add } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { deleteAvatar, updateProfile } from "../mutation/update";
import Gender, {
  Ages,
  FamilyPlans,
  Heights,
  Languages,
  Movies,
  Music,
  SportTeams,
  Tvshows,
} from "../components/profile/EditComponents";

const USER_QUERY = gql`
  query user($id: String!) {
    user(id: $id) {
      username
      fullName
      interestedIn
      language
      gender
      tags
      about
      age
      education
      height
      movies
      music
      sportsTeams
      tvShows
      familyPlans
      work
      avatarPhotos {
        url
        id
      }
      avatarIndex
    }
  }
`;

const EditProfile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(false);

  const [getUserData, { data, error, refetch }] = useLazyQuery(USER_QUERY);

  useEffect(() => {
    if (userId) {
      getUserData({
        variables: {
          id: userId,
        },
      });
    }
  }, [userId]);

  let image;
  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    about: "",
    work: "",
    education: "",
  }); // State for form data

  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [family, setFamily] = useState();
  const [lang, setLang] = useState();
  const [music, setMusic] = useState([]);
  const [movies, setMovies] = useState([]);
  const [sport, setSport] = useState([]);
  const [tvshows, setTvshows] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (userId) {
      refetch();  
    }
    if (data) {
      console.log(data);
      setFormData({
        fullName: data?.user?.fullName || "",
        about: data?.user?.about || "",
        work: data?.user?.work || "",
        education: data?.user?.education || "",
      });
    }
  }, [show, progress, data]);
  console.log(data);

  // Handler function to update form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      // Update state with the data URL of the selected image
      setSelectedImage(e.target.result);
    };

    reader.onerror = (error) => {
      // Handle errors that occur during file reading
      console.error("File reading error:", error);
    };

    // Read the file as a data URL
    reader.readAsDataURL(selectedFile);

    console.log("Selected File:", selectedFile);
    setFile(selectedFile);
    image = selectedFile;
    console.log(image, "after sle");
  };

  console.log(image, "function");
  const handleUpload = async () => {
    console.log(image, "image");
    if (!file) {
      console.error("Please select a file.");
      return;
    }
    console.log(file, "image");
    setProgress(true);
    const formData = new FormData();
    formData.append("photo", file);
    console.log(formData, "formdata");

    try {
      let httpLink;
      if (`${process.env.NEXT_PUBLIC_APP_ENV}` === "development") {
        httpLink = process.env.NEXT_PUBLIC_STAGING;
      } else {
        httpLink = process.env.NEXT_PUBLIC_PRODUCTION;
      }
      console.log(httpLink + "api/user/${userId}/photo/");
      const response = await fetch(
        httpLink + "api/user/" + userId + "/photo/",
        {
          method: "POST",
          body: formData,
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data) {
        setProgress(false);
        setShow(false);
      }
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const [alert, setAlert] = useState(false);
  const [messege, setmessege] = useState(false);

  const fetchData = async () => {
    try {
      let response = await updateProfile({
        id: userId,
        about: formData.about,
        fullName: formData.fullName,
        work: formData.work,
        education: formData.education,
        gender: gender?.id,
        age: age,
        height: height?.id,
        language: lang?.id,
        familyPlans: family?.id,
        music: music,
        movies: movies,
        tvShows: tvshows,
        sportsTeams: sport,
      });
      console.log(response);
      if (
        response &&
        age !== undefined &&
        gender !== undefined &&
        data?.user?.avatarPhotos?.length > 0 &&
        height !== undefined &&
        family !== undefined
      ) {
        router.push("/welcome-page");
      } else if (
        data?.user?.avatarPhotos &&
        data?.user?.avatarPhotos?.length === 0
      ) {
        console.log("alert age");
        setAlert(true);
        const timeoutId = setTimeout(() => {
          setAlert(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
      } else if (
        age === undefined &&
        height === undefined &&
        family === undefined &&
        gender === undefined
      ) {
        setmessege(true);
        const timeoutId = setTimeout(() => {
          setmessege(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAvatarPhoto = async (photoId) => {
    setLoad(true);
    let response = await deleteAvatar({
      id: photoId,
    });

    if (response) {
      console.log(response, "response");
      alert(response?.data?.deleteAvatarPhoto?.message);
      setLoad(false);
    }
  };

  return (
    <>
      {alert && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 1000,
            top: "0px",
            position: "absolute",
          }}
        >
          <Alert severity="warning">Upload your profile image !</Alert>
        </Box>
      )}
      {messege && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 1000,
            top: "0px",
            position: "absolute",
          }}
        >
          <Alert severity="warning">
            Gender,Height,FamilyStatus & Age is compulsory!
          </Alert>
        </Box>
      )}
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#202427",
          position: "relative",
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
          <ArrowBackIos
            onClick={() => router.back()}
            style={{ fontSize: "30px", cursor: "pointer", color: "white" }}
          />
          <Typography style={{ color: "white" }}>EDIT PROFILE</Typography>
          <Typography
            onClick={fetchData}
            sx={{ color: "#F0D079", cursor: "pointer" }}
          >
            DONE
          </Typography>
        </div>
      </div>

      <Box
        sx={{
          width: "100%",
          height: "220vh", // Set height as needed
          backgroundImage: `url('/images/texture-01.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "50%", marginTop: "20px" }}>
          <Box sx={{ display: "flex", position: "relative", gap: "20px" }}>
            <Box
              onClick={() => setShow(!show)}
              sx={{
                borderStyle: "dotted",
                borderWidth: "2px",
                borderColor: "#E6C66C",
                height: "120px",
                width: "120px",
                borderRadius: "20px",
                background: "#2B2F32",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50px",
                  background: "#E6C66C",
                }}
              >
                <Add />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "#E6C66C" }}>ADD PHOTOS</Typography>
              </Box>
            </Box>
            {show && (
              <div
                className="gallery-upload"
                style={{ position: "absolute", top: "130px", zIndex: "100" }}
              >
                <label htmlFor="file-upload" className="custom-file-upload">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{ maxWidth: "120px", maxHeight: "120px" }}
                    />
                  ) : (
                    "Choose File"
                  )}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <Button
                  startIcon={
                    progress ? <CircularProgress size="1.5rem" /> : null
                  }
                  disabled={progress}
                  variant="contained"
                  size="small"
                  onClick={handleUpload}
                >
                  Upload Image
                </Button>
              </div>
            )}

            {data?.user?.avatarPhotos &&
              data?.user?.avatarPhotos.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    borderStyle: "dotted",
                    borderWidth: "2px",
                    borderColor: "#E6C66C",
                    height: "120px",
                    width: "120px",
                    borderRadius: "20px",
                    position: "relative",
                  }}
                >
                  <img
                    src={item?.url}
                    style={{
                      borderRadius: "20px",
                      objectFit: "cover",
                      height: "118px",
                      width: "118px",
                    }}
                  />
                  <Close
                    onClick={() => deleteAvatarPhoto(item?.id)}
                    style={{
                      position: "absolute",
                      color: "black",
                      top: "0px",
                      right: "0px",
                    }}
                  />
                </Box>
              ))}
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography sx={{ color: "#E6C66C" }}>Name</Typography>
            <TextField
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              variant="standard"
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "black" } }}
            />
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography sx={{ color: "#E6C66C" }}>About</Typography>
            <TextField
              name="about"
              variant="standard"
              value={formData.about}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "black" } }}
            />
          </Box>

          <Gender setGender={setGender} user={data?.user} />

          <Ages setAge={setAge} user={data?.user} />

          <Heights setHeight={setHeight} user={data?.user} />

          <Box sx={{ marginTop: "20px" }}>
            <Typography sx={{ color: "#E6C66C" }}>Work</Typography>
            <TextField
              name="work"
              value={formData.work}
              onChange={handleInputChange}
              variant="standard"
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "black" } }}
            />
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography sx={{ color: "#E6C66C" }}>Education</Typography>
            <TextField
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              variant="standard"
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "black" } }}
            />
          </Box>

          <FamilyPlans setFamily={setFamily} user={data?.user} />

          <Languages setLang={setLang} user={data?.user} />

          {/* <Box sx={{marginTop:'20px'}}>
           <Typography sx={{color:'#E6C66C'}}>Intrested In</Typography>
           <Autocomplete
           fullWidth
           
      disablePortal
      id="combo-box-demo"
      
      renderInput={(params) => <TextField {...params} label="Groups" variant='standard' fullWidth  InputLabelProps={{style:{color:'white'}}} />}
    />


<Autocomplete
           fullWidth
           
      disablePortal
      id="combo-box-demo"
      
      renderInput={(params) => <TextField {...params} label="Intrests" variant='standard' fullWidth  InputLabelProps={{style:{color:'white'}}} />}
    />
           </Box> */}

          <Music setMusic={setMusic} />

          <Movies setMovies={setMovies} />

          <Tvshows setTvshows={setTvshows} />

          <SportTeams setSport={setSport} />
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
