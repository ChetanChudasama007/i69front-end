import React, { useState } from "react";
import Carousel from "react-multi-carousel";
// import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import { styled } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const SliderContainer = styled("div")({
  width: "100%",
  height: "85vh",
  overflow: "hidden",
  backgroundColor: "transparent",

  "@media (max-width: 900px)": {},
  "@media (max-width: 600px)": {
    width: "100%",
    height: "390px",
  },
});

// const SliderInnerContainer = styled("div")({
//   width: "100%",
//   // height:'85vh',

//   "@media (max-width: 900px)": {
//     padding: "0px",
//   },
//   "@media (max-width: 600px)": {
//     padding: "0px",
//     height: "390px",
//   },
// });

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const dummyData = [
  {
    name: "data1",
  },
  {
    name: "data1",
  },
];

const ProfileCarousel = ({
  userData,
  carouselData,
  isUserProfile,
  onRequestAccess,
  onRequestCancel,
  children,
}) => {
  const ifMultipleImages = carouselData?.length !== 1;
  const [isRequested, setIsRequested] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem(`requested_${userData?.id}`) === "true"
      : false
  );

  console.log(carouselData, "Carousel");

  return (
    <SliderContainer>
      <Carousel
        additionalTransfrom={0}
        arrows={true}
        autoPlay={ifMultipleImages}
        autoPlaySpeed={2000}
        centerMode={false}
        className=""
        containerClass="profile-images-carousel"
        dotListClass="profile-images-dots"
        focusOnSelect={false}
        infinite={true}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
        pauseOnHover={false}
        customRightArrow={
          <div
            style={{ position: "absolute", right: "10px", top: '40%', cursor: "pointer" }}
          >
            <KeyboardArrowRight sx={{ color: "white", fontSize: '50px' }} />
          </div>
        }
        customLeftArrow={
          <div
            style={{ position: "absolute", left: "10px", top: '40%', cursor: "pointer" }}
          >
            <KeyboardArrowLeft sx={{ color: "white",fontSize: '50px' }} />
          </div>
        }
      >
        {!isUserProfile &&
          carouselData?.length > 1 &&
          carouselData &&
          carouselData.map((item, index) => (
            <div key={index} className="container3">
              <img
                src={item?.url}
                className="sliderImg2"
                alt="slider-image 2"
                style={{
                  height: "100vh",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        {isUserProfile &&
          carouselData?.length > 1 &&
          carouselData &&
          carouselData.map((item, index) =>
            item.type !== "PRIVATE" ? (
              <div key={index} className="container3">
                <img
                  src={item?.url}
                  className="sliderImg2"
                  alt="slider-image 2"
                  style={{
                    height: "100vh",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <div key={index} className="private-container">
                <img
                  src={carouselData?.[0]?.url}
                  className="sliderImg2"
                  alt="slider-image 2"
                  style={{
                    height: "100vh",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="backdrop">
                  <div
                    className="private-access-btn"
                    onClick={(e) => {
                      if (isRequested) {
                        onRequestCancel(e);
                        setIsRequested(false);
                      } else {
                        onRequestAccess(e);
                        setIsRequested(true);
                      }
                    }}
                  >
                    {isRequested ? "CANCEL REQUEST" : "REQUEST PRIVATE ACCESS"}
                  </div>
                </div>
              </div>
            )
          )}
        {carouselData?.length === 1 &&
          ["", ""].map((item) => (
            <div className="container3" key={item}>
              <img
                src={carouselData[0]?.url}
                style={{ height: "100vh", width: "100%" }}
              />
              {/* <img src="/images/model23.png" alt="model-img" style={{height: '100vh', width:'100%', objectFit: "cover"}} /> */}
            </div>
          ))}

        {carouselData?.length === 0 &&
          dummyData &&
          dummyData.map((index) => (
            <div
              key={index}
              style={{ border: "5px solid black", width: "100%" }}
            >
              <img
                src="/images/dummy-01.jpg"
                className="sliderImg3"
                alt="image"
                style={{
                  height: "100vh",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
      </Carousel>
      {children}
    </SliderContainer>
  );
};

export default ProfileCarousel;
