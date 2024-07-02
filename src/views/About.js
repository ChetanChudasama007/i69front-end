import { ArrowBackIos } from "@material-ui/icons";
import { Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { updateAbout } from "../mutation/update";

const About = () => {
  const router = useRouter();

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [userId, setUserId] = useState();
  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= 250) {
      setText(newText);
      setWordCount(newText.length);
    }
  };

  // const countLetters = (text) => {
  //   // Remove leading and trailing whitespaces
  //   const trimmedText = text.trim();
  //   // Count the number of characters
  //   return trimmedText.length;
  // };

  const fetchData = async () => {
    try {
      let response = await updateAbout({
        id: userId,
        about: text,
      });
      console.log(response);
      if (response) {
        router.push("/edit-profile");
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
          <ArrowBackIos
            onClick={() => router.back()}
            style={{ fontSize: "30px", cursor: "pointer", color: "white" }}
          />
          <Typography style={{ color: "white" }}>ABOUT</Typography>
          <Typography
            onClick={fetchData}
            sx={{ color: "#F0D079", cursor: "pointer" }}
          >
            NEXT
          </Typography>
        </div>
      </div>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "100px",
          background: "#373A3F",
          height: "92vh",
        }}
      >
        <Box sx={{ width: "70%" }}>
          <Typography sx={{ color: "#F0D079" }}>Describe Yourself</Typography>
          <TextField
            variant="standard"
            fullWidth={true}
            multiline={true}
            onChange={handleTextChange}
            value={text}
            InputProps={{ style: { color: "white" } }}
            inputProps={{ maxLength: 250 }}
          />
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <Typography>{wordCount}/250</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              onClick={fetchData}
              sx={{
                border: "2px solid #F0D079",
                width: "30%",
                height: "50px",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#101213",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <Typography sx={{ color: "#F0D079", textTransform: "uppercase" }}>
                NEXT
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
