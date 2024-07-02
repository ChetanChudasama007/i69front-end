import { gql, useLazyQuery } from "@apollo/client";
import { ArrowBackIos } from "@material-ui/icons";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { updateTags } from "../mutation/update";

const PICKER_QUERY = gql`
  query picker {
    defaultPicker {
      tagsPicker {
        id
        value
      }
    }
  }
`;

const SelectedTags = () => {
  const router = useRouter();

  const [getPickerData, { data, error, loading }] = useLazyQuery(PICKER_QUERY);

  useEffect(() => {
    getPickerData();
  }, []);

  // console.log(data?.defaultPicker?.tagsPicker)
  let tagsPickerData = data?.defaultPicker?.tagsPicker;

  const [selectedValues, setSelectedValues] = useState([]);
  const [userId, setUserId] = useState();
  useEffect(() => {
    // Retrieve userId from localStorage on component mount
    const id = localStorage.getItem("userId");
    setUserId(id || "");
  }, []);

  const handleChangeValue = (value) => {
    if (selectedValues.includes(value)) {
      // If the value is already selected, remove it from the array
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      // If the value is not selected, add it to the array
      setSelectedValues([...selectedValues, value]);
    }
  };

  console.log(selectedValues);

  const fetchData = async () => {
    try {
      if (selectedValues.length < 3) {
        alert("Select atleast 3 tags or more than three tags!");
      }
      let response = await updateTags({
        id: userId,
        tagIds: selectedValues,
      });
      console.log(response);
      if (response && selectedValues.length > 2) {
        router.push("/about");
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
          background: "#F0D079",
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
            style={{ fontSize: "30px", cursor: "pointer" }}
          />
          <Typography style={{ color: "black" }}>SELECT TAGS</Typography>
          <Typography
            onClick={fetchData}
            sx={{ color: "black", cursor: "pointer" }}
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
          paddingTop: "20px",
          background: "#373A3F",
          height: "170vh",
        }}
      >
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {tagsPickerData &&
            tagsPickerData.length > 0 &&
            tagsPickerData.map((item, index) => (
              <Box
                key={index}
                onClick={() => handleChangeValue(item?.id)}
                sx={{
                  border: "2px solid #F0D079",
                  width: "30%",
                  height: "50px",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: selectedValues.includes(item?.id)
                    ? "gray"
                    : "#101213",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{ color: "#F0D079", textTransform: "uppercase" }}
                >
                  {item?.value}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default SelectedTags;
