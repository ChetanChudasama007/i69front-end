import { ChevronRight, KeyboardArrowLeft } from "@material-ui/icons";
import { ArrowBackIos, Close } from "@material-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../layouts/Navbar";
import Carousel from "react-multi-carousel";

import React, { useEffect, useState } from "react";
import Gender, {
  Ages,
  Ethinicity,
  FamilyPlans,
  Heights,
  InterestedIn,
  Languages,
  Movies,
  Music,
  Politics,
  Religion,
  SportTeams,
  Tvshows,
  ZodiacSign,
} from "./EditProfileComponents";
import { gql, useLazyQuery } from "@apollo/client";
import { deleteAvatar, updateProfile } from "../mutation/update";
import NotificationIcon from "../../public/images/notificationIcon.svg";
import axiosConfig from "../common/axiosConfig";
import { Img } from "react-image";

const videoExtensions = /\.(mp4|webm|ogg|ogv|mov|avi|wmv|flv)$/i;

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <ChevronRight className="slider-icon" color="#C0C0C0" />,
  prevArrow: <KeyboardArrowLeft className="slider-icon" color="#C0C0C0" />,
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
      politics
      ethinicity
      religion
      zodiacSign
      avatarPhotos {
        url
        id
        type
      }
      avatarIndex
    }
  }
`;

const EditProfile2 = ({ isCallingRegistration }) => {
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(false);
  const [isShownFileUploadError, setShownFileUploadError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  // const [isPrivate, setIsPrivate] = useState(false);
  // const [file, setFile] = useState(null);

  let image;
  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

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
  const [ethnicity, setEthnicity] = useState();
  const [politics, setPolitics] = useState();
  const [religion, setReligion] = useState();
  const [zodiacSign, setZodiacSign] = useState();
  const [movies, setMovies] = useState([]);
  const [sport, setSport] = useState([]);
  const [tvshows, setTvshows] = useState([]);
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState(null);
  const [isCalledRefetch, setCalledRefresh] = useState(false);
  const [isShownImageUploadingValidation, setShownImageUploadingValidation] =
    useState("");

  useEffect(() => {
    const tok = localStorage.getItem("token");
    setToken(tok);
  }, []);

  useEffect(() => {
    if (data && !isCalledRefetch) {
      const userData = data?.user;
      setGender(userData?.gender);
      setAge(userData?.age);
      setHeight(userData?.height);
      setFamily(userData?.familyPlans);
      setLang(
        userData?.language && userData?.language.length > 0
          ? userData?.language[0]
          : ""
      );
      setMusic(userData?.music);
      setMovies(userData?.movies);
      setTvshows(userData?.tvShows);
      setEthnicity(userData?.ethinicity);
      setPolitics(userData?.politics);
      setReligion(userData?.religion);
      setZodiacSign(userData?.zodiacSign);
      setFormData({
        fullName: userData?.fullName || "",
        about: userData?.about || "",
        work: userData?.work || "",
        education: userData?.education || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (userId) {
      refetch();
      setCalledRefresh(true);
    }
  }, [show, progress, data, load]);
  // console.log("data", data)

  // const handleFileChange = async (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) {
  //     return;
  //   }

  //   if (
  //     selectedFile &&
  //     (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
  //   ) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       // Update state with the data URL of the selected image
  //       setSelectedImage(e.target.result);
  //     };

  //     reader.onerror = (error) => {
  //       // Handle errors that occur during file reading
  //       console.error("File reading error:", error);
  //     };

  //     // Read the file as a data URL
  //     reader.readAsDataURL(selectedFile);

  //     console.log("Selected File:", selectedFile);
  //     image = selectedFile;
  //     await setFile(image);
  //     await setIsPrivate(false);
  //     const chatbox = document.querySelector("#upload-now");
  //     chatbox.click();
  //     setShow(!show);
  //   }
  // };

  // const handlePrivateFileChange = async (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) {
  //     return;
  //   }

  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     // Update state with the data URL of the selected image
  //     setSelectedImage(e.target.result);
  //   };

  //   reader.onerror = (error) => {
  //     // Handle errors that occur during file reading
  //     console.error("File reading error:", error);
  //   };

  //   // Read the file as a data URL
  //   reader.readAsDataURL(selectedFile);

  //   console.log("Selected File:", selectedFile);
  //   image = selectedFile;
  //   await setFile(image);
  //   await setIsPrivate(true);
  //   const chatbox = document.querySelector("#upload-now");
  //   chatbox.click();
  //   setShow(!show);
  // };

  // const handleUpload = async () => {
  //   console.log("handleUpload");
  //   image = file;
  //   if (!image) {
  //     console.error("Please select a file.");
  //     return;
  //   }
  //   console.log(image, "image");
  //   setProgress(true);
  //   const formData = new FormData();
  //   formData.append("photo", image);
  //   if (isPrivate) {
  //     formData.append("type", "PRIVATE");
  //   }
  //   console.log(formData, "formdata");

  //   try {
  //     let httpLink;
  //     if (`${process.env.NEXT_PUBLIC_APP_ENV}` === "development") {
  //       httpLink = process.env.NEXT_PUBLIC_STAGING;
  //     } else {
  //       httpLink = process.env.NEXT_PUBLIC_PRODUCTION;
  //     }
  //     console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  //     console.log(
  //       "process.env.NEXT_PUBLIC_STAGING",
  //       process.env.NEXT_PUBLIC_STAGING
  //     );
  //     console.log(
  //       "process.env.NEXT_PUBLIC_PRODUCTION",
  //       process.env.NEXT_PUBLIC_PRODUCTION
  //     );
  //     console.log("URL Link", httpLink + "api/user/${userId}/photo/");
  //     const response = await fetch(
  //       httpLink + "api/user/" + userId + "/photo/",
  //       {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           authorization: `Token ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log("response handleUpload EditProfile2", response);

  //     const data = await response.json();
  //     if (data) {
  //       setProgress(false);
  //       setShow(false);
  //     }
  //     console.log("Image uploaded successfully:", data);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  // Handler function to update form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }

    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "video/mp4" ||
        selectedFile.type === "video/webm")
    ) {
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
      handleUpload(selectedFile, false);
      setShow(!show);
    }
  };

  const handlePrivateFileChange = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
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

      handleUpload(selectedFile, true);
      setShow(!show);
    }
  };

  const handleUpload = async (file, isPrivate) => {
    console.log("handleUpload");
    image = file;
    if (!image) {
      console.error("Please select a file.");
      return;
    }
    console.log(image, "image");
    setProgress(true);
    const formData = new FormData();
    formData.append("photo", image);
    if (isPrivate) {
      formData.append("type", "PRIVATE");
    }
    console.log(formData, "formdata");

    try {
      const response = await axiosConfig.post(
        `api/user/${userId}/photo/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Token ${token}`,
          },
        }
      );
      if (response?.data) {
        setProgress(false);
        setShow(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShownFileUploadError(error.response.data.reason);
      } else {
        setShownFileUploadError(error && "Something went to wrong");
      }
      setTimeout(() => {
        setShownFileUploadError(false);
      }, 2000);
      setProgress(false);
    }
  };

  const fetchData = async () => {
    try {
      if (
        data.avatarPhotos?.filter((img) => img.type !== "PRIVATE")?.length <=
          0 ||
        data?.user?.avatarPhotos?.filter((img) => img.type !== "PRIVATE")
          ?.length <= 0
      ) {
        setShownImageUploadingValidation("Upload your profile image !");
        setTimeout(() => {
          setShownImageUploadingValidation("");
        }, 3000);
        return;
      } else if (!age && !family && !gender) {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
        return;
      }
      let response = await updateProfile({
        id: userId,
        about: formData.about,
        fullName: formData.fullName,
        work: formData.work,
        education: formData.education,
        gender: gender,
        age: age,
        height: height,
        language: !lang ? [] : [lang],
        familyPlans: family,
        music: music,
        movies: movies,
        tvShows: tvshows,
        sportsTeams: sport,
        ethinicity: ethnicity,
        politics: politics,
        religion: religion,
        zodiacSign: zodiacSign,
      });
      // console.log(response)
      if (response) {
        if (isCallingRegistration) {
          router.push("/welcome-page");
        } else {
          router.push("/my-profile");
        }
      } else {
        alert("Age and Gender is compulsory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAvatarPhoto = async (photoId, isCallingFromPublic) => {
    setLoad(true);
    setShownImageUploadingValidation("");
    if (
      isCallingFromPublic &&
      data?.user?.avatarPhotos.filter((x) => x.type === "PUBLIC").length === 1
    ) {
      setShownImageUploadingValidation("Required one public image");
      setTimeout(() => {
        setShownImageUploadingValidation("");
      }, 3000);
      return;
    }
    let response = await deleteAvatar({
      id: photoId,
    });

    if (response) {
      // console.log(response)
      alert(response?.data?.deleteAvatarPhoto?.message);
      setLoad(false);
      return true;
    } else {
      return false;
    }
  };

  const handleChangeProfileImage = (e) => {
    setImageUrl(e?.target?.src);
  };

  // console.log(data, "data value");
  // console.log(data?.user?.avatarPhotos.filter(item => item.type === 'PRIVATE'));
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <div className={`${isCallingRegistration ? "m-0" : "content_wrapper"}`}>
          {isCallingRegistration ? (
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
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "white",
                  }}
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
          ) : (
            <div className="fixed-top search_header">
              <div className="header-control header-gold">
                <div className="header-control-text">
                  <i
                    onClick={() => router.back()}
                    className="fa fa-angle-left "
                    aria-hidden="true"
                  ></i>
                  <h5 className="pgtitle">EDIT PROFILE</h5>
                </div>
                <div className="header-control-notification">
                  <Button className="header-btn-save" onClick={fetchData}>
                    SAVE
                  </Button>
                  <Button
                    className="header-btn-cancel"
                    onClick={() => router.back()}
                  >
                    CANCEL
                  </Button>
                  <NotificationIcon color="#3A3A3A" />
                  <div className="profile_avtar">
                    <Img
                      alt="avatar"
                      src="/images/logo-right.jpg"
                      className="profile-avtar-image"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="tab-content user-edit-area">
            <Box
              sx={{
                width: "100%",
                backgroundImage: `url('/images/texture-01.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <div className="public_sec">
                <div className="grid">
                  <div className="grid_info">
                    <div className="public_block">
                      <div className="add_photo">
                        <figure>
                          {imageUrl ? (
                            <Img src={imageUrl} height={210} width={210} alt=""/>
                          ) : (
                            data?.user?.avatarPhotos?.filter(
                              (img) => img.type !== "PRIVATE"
                            )?.length > 0 && (
                              <Img
                                src={
                                  imageUrl
                                    ? imageUrl
                                    : data?.user?.avatarPhotos?.filter(
                                        (img) => img.type !== "PRIVATE"
                                      )?.[0]?.url
                                }
                                alt=""
                                height={210}
                                width={210}
                              />
                            )
                          )}
                        </figure>
                        <a
                          href="#"
                          className="photo_btn"
                          onClick={() => setShow(!show)}
                        >
                          <img src="images/btn_plus_img.png" alt="" />
                          ADD PHOTO
                        </a>
                        {show && (
                          <div className="select_img">
                            <div className="main_title">
                              <h3>Select Image Section</h3>
                              <a href="#" className="up_close">
                                <img
                                  src="images/close_btn.svg"
                                  alt=""
                                  onClick={() => setShow(!show)}
                                />
                              </a>
                            </div>
                            <div className="upload_box">
                              <div className="upload_btn">
                                <div className="fileUpload btn custom-file-upload">
                                  <label htmlFor="file-upload">
                                    <i>
                                      <Img
                                        src="images/upload_ic1.svg"
                                        alt=""
                                        width={40}
                                        height={25}
                                      />
                                    </i>
                                    <span>PUBLIC ALBUM </span>
                                    <input
                                      id="file-upload"
                                      type="file"
                                      accept="image/jpeg,image/png,video/*"
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="upload_btn">
                                <div className="fileUpload btn custom-file-upload">
                                  <label htmlFor="file-upload-private">
                                    <i>
                                      <Img
                                        src="images/upload_ic2.svg"
                                        alt=""
                                        height={25}
                                        width={40}
                                      />
                                    </i>
                                    <span>PRIVATE ALBUM</span>
                                    <input
                                      id="file-upload-private"
                                      type="file"
                                      onChange={handlePrivateFileChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <Button
                                id="upload-now"
                                style={{ display: "none" }}
                                startIcon={
                                  progress ? (
                                    <CircularProgress size="1.5rem" />
                                  ) : null
                                }
                                disabled={progress}
                                variant="contained"
                                size="small"
                                onClick={handleUpload}
                              >
                                Upload Image
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      {data?.user?.avatarPhotos.filter(
                        (item) => item.type !== "PRIVATE"
                      ).length > 0 && (
                        <div className="public_slider">
                          <h4>Public Album :</h4>
                          <div className="slider-container">
                            <Carousel
                              additionalTransfrom={0}
                              arrows
                              autoPlaySpeed={3000}
                              centerMode={false}
                              className=""
                              containerClass="slider-main"
                              dotListClass=""
                              draggable
                              focusOnSelect={false}
                              infinite={false}
                              itemClass=""
                              keyBoardControl
                              minimumTouchDrag={80}
                              pauseOnHover
                              renderArrowsWhenDisabled={false}
                              renderButtonGroupOutside={false}
                              renderDotsOutside={false}
                              responsive={responsive}
                              rewind={false}
                              rewindWithAnimation={false}
                              rtl={false}
                              shouldResetAutoplay
                              showDots={false}
                              sliderClass=""
                              slidesToSlide={1}
                              swipeable
                            >
                              {data?.user?.avatarPhotos &&
                                data?.user?.avatarPhotos
                                  .filter((item) => item.type !== "PRIVATE")
                                  .map((item, index) => (
                                    <div className="slider-item-wrap">
                                      <div className="slider-item" key={index}>
                                        {videoExtensions.test(item?.url) ? (
                                          <video className="slider-item-image">
                                            <source src={item?.url} />
                                          </video>
                                        ) : (
                                          <img
                                            className="slider-item-image"
                                            src={item?.url}
                                            alt=""
                                            onClick={handleChangeProfileImage}
                                          />
                                        )}
                                        <a
                                          href="#"
                                          className="close_icon"
                                          onClick={() =>
                                            deleteAvatarPhoto(item?.id, true)
                                          }
                                        >
                                          <img
                                            src="images/close_ic.svg"
                                            alt=""
                                          />
                                        </a>
                                        <div className="slider-hover-img">
                                          <img
                                            src="images/album_ic.svg"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                            </Carousel>
                          </div>
                        </div>
                      )}
                      <div className="public_slider">
                        <h4>Private Album : </h4>
                        {data?.user?.avatarPhotos?.length && (
                          <Carousel
                            additionalTransfrom={0}
                            arrows
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className=""
                            containerClass="slider-main"
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite={false}
                            itemClass=""
                            keyBoardControl
                            minimumTouchDrag={80}
                            pauseOnHover
                            renderArrowsWhenDisabled={false}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={responsive}
                            rewind={false}
                            rewindWithAnimation={false}
                            rtl={false}
                            shouldResetAutoplay
                            showDots={false}
                            sliderClass=""
                            slidesToSlide={1}
                            swipeable
                          >
                            {data?.user?.avatarPhotos
                              .filter((item) => item.type === "PRIVATE")
                              .map((item, index) => (
                                <div className="slider-item-wrap">
                                  <div className="slider-item" key={index}>
                                    <img
                                      className="slider-item-image"
                                      src={item?.url}
                                      alt=""
                                    />
                                    <a
                                      href="#"
                                      className="close_icon"
                                      onClick={() =>
                                        deleteAvatarPhoto(item?.id, false)
                                      }
                                    >
                                      <img src="images/close_ic.svg" alt="" />
                                    </a>
                                    <div className="slider-hover-img">
                                      <img src="images/album_ic.svg" alt="" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </Carousel>
                        )}
                      </div>
                    </div>
                    <div className="about_block">
                      <h3>About</h3>
                      <div className="detail">
                        <p>{formData.about}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid_info">
                    <Box className="info-wrapper">
                      <h5>Personal Inforamtion</h5>
                      <Box className="user-info-wrapper">
                        <Box className="user-info-fields">
                          <Typography sx={{ color: "#E6C66C" }}>
                            Name
                          </Typography>
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

                        <Box className="user-info-fields">
                          <Typography sx={{ color: "#E6C66C" }}>
                            About
                          </Typography>
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

                        <Gender
                          setGender={setGender}
                          gender={gender}
                          user={data?.user}
                        />

                        <Ages setAge={setAge} age={age} user={data?.user} />

                        <Heights
                          setHeight={setHeight}
                          height={height}
                          user={data?.user}
                        />

                        <Box className="user-info-fields">
                          <Typography sx={{ color: "#E6C66C" }}>
                            Work
                          </Typography>
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

                        <Box className="user-info-fields">
                          <Typography sx={{ color: "#E6C66C" }}>
                            Education
                          </Typography>
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

                        <FamilyPlans
                          setFamily={setFamily}
                          family={family}
                          user={data?.user}
                        />

                        <Languages
                          setLang={setLang}
                          lang={lang}
                          user={data?.user}
                        />

                        <InterestedIn />
                      </Box>
                    </Box>
                  </div>
                  <div className="grid_info">
                    <Box className="info-wrapper">
                      <h5>Group Edit</h5>
                      <Box className="user-info-wrapper">
                        <Politics
                          setPolitics={setPolitics}
                          politics={politics}
                          user={data?.user}
                        />
                        <Ethinicity
                          setEthnicity={setEthnicity}
                          user={data?.user}
                          ethnicity={ethnicity}
                        />
                        <Religion
                          setReligion={setReligion}
                          user={data?.user}
                          religion={religion}
                        />
                        <ZodiacSign
                          setZodiacSign={setZodiacSign}
                          user={data?.user}
                          zodiacSign={zodiacSign}
                        />

                        <Music setMusic={setMusic} music={music} />

                        <Movies setMovies={setMovies} movies={movies} />

                        <Tvshows setTvshows={setTvshows} tvsShows={tvshows} />

                        {/* <SportTeams setSport={setSport} /> */}
                      </Box>
                    </Box>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
      {isShownFileUploadError && (
        <Box
          sx={{
            width: "30%",
            display: "block",
            zIndex: 999999999999,
            top: "50%",
            left: "40%",
            position: "fixed",
          }}
        >
          <Alert severity="error">{isShownFileUploadError}</Alert>
        </Box>
      )}
      {progress && (
        <Box sx={{ position: "fixed", zIndex: 1000, top: "50%", left: "50%" }}>
          <CircularProgress size="3.5rem" />
        </Box>
      )}
      {errorMessage && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 1000,
            top: 0,
            right: 0,
          }}
        >
          <Alert severity="warning">
            Gender, Height, FamilyStatus & Age is compulsory!
          </Alert>
        </Box>
      )}
      {isShownImageUploadingValidation && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 1000,
            top: 0,
            right: 0,
          }}
        >
          <Alert severity="warning">{isShownImageUploadingValidation}</Alert>
        </Box>
      )}
    </>
  );
};

export default EditProfile2;
