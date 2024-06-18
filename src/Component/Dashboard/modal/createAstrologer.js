import React, { useEffect, useState } from "react";
import "./createAstrologer.css";
import axios from "axios";
import userDummy from "./userdummy.jpg";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import { Add, Edit, PlusOne, Update } from "@mui/icons-material";

import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";


import { useSelector,useDispatch } from "react-redux";
import { removeAstro,addAstro ,addBulk,updateAstro} from "../../../Component/redux/astroSlice";
import { resolve } from "path-browserify";

const CreateAstrologer = (props) => {
  var { isUpdate, formDataP, handleCloseP } = props.Data;
  const dispatch=useDispatch();

  
  var [formData, setFormData] = useState({
    speciality: [],
    name: "",
    email: "",
    gender: "",
    language: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    if (name !== "file") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, file: URL.createObjectURL(value) });
    }
  };

  useEffect(() => {
    if (isUpdate) {
      async function GetAstro() {
        try {
          const response = await axios.get(
            `https://royal-webtech-backend.vercel.app/api/v1/astrologers/${formDataP}`
          );
          setFormData({ ...response.data.data });
          setSpeciality([...response.data.data.speciality]);
          setLanguage([...response.data.data.language]);
        } catch (error) {
          console.log("Error ", error);
        }
      }
      GetAstro();
    }
    return () => {
      console.log("Cleanup function");
    };
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formDataToSubmit = new FormData();
      for (const key in formData) {
        if (key === "language" || key === "speciality") {
          formDataToSubmit.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }

      if (formData.file) {
        try {
          const response = await fetch(formData.file);
          const blob = await response.blob();
          formDataToSubmit.append("image", blob, "profile_image.jpg");
        } catch (error) {
          console.error(
            "Error occurred while converting file URL to file:",
            error
          );
        }
      }

      if (!isUpdate) {
        const response = await axios.post(
          "https://royal-webtech-backend.vercel.app/api/v1/astrologers/register",
          formDataToSubmit
        );
         dispatch(addAstro(response.data.data))
      } else {
        const response = await axios.post(
          `https://royal-webtech-backend.vercel.app/api/v1/astrologers/${formData._id}`,
          formDataToSubmit
        );
        dispatch(updateAstro(response.data.data))
      }
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
    }

    handleCloseP();
  };

  const [language, setLanguage] = React.useState([]);
  const [speciality, setSpeciality] = React.useState([]);

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    setFormData({ ...formData, language: [...language] });
  }, [speciality, language]);

  useEffect(() => {
    setFormData({ ...formData, speciality: [...speciality] });
  }, [speciality]);

  const handleLangugeChange = (event) => {
    const {
      target: { value },
    } = event;
    setLanguage(typeof value === "string" ? value.split(",") : value);
  };

  const handleSpecialityChange = (event) => {
    const {
      target: { value },
    } = event;
    setSpeciality(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (true) {
      setLanguage(formData.language);
      setSpeciality(formData.speciality);
    }
  }, []);

  return (
    <>
      <div className="" id="NewPatient">
        <div className="row w-100 ">
          <div className="col-12">
            <div className="row ">
              <div className="col-12  text-center mx-auto">
                <h4>
                  {isUpdate
                    ? "Updating Existing Astrologer"
                    : "New Astrologer Entery"}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-12  my-2">
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <div className="row ">
                <div className="col-12 w-100   p-1 p-0 d-flex justify-content-center my-0 ">
                  <img
                    src={
                      formData.file
                        ? formData.file
                        : formData.profileImage
                        ? formData.profileImage
                        : userDummy
                    }
                    alt=""
                    id="dummyprofile"
                    className="img-fluid"
                  />
                </div>
                <div className="col-12   p-0 ">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    size="small"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  ></TextField>
                </div>
                <div className="col-12 me-auto  my-2 p-0">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    size="small"
                    placeholder="@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  ></TextField>
                </div>

                <div className="col-12 ">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={formData.gender}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="col-12  ms-auto my-2 p-0">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Speciality
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={speciality}
                      onChange={handleSpecialityChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {specialitiese.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={speciality.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="col-12 my-2 p-0">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Languages
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={language}
                      onChange={handleLangugeChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(",")}
                      MenuProps={MenuProps}
                    >
                      {languages.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={language.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="col-12 my-1 p-0">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile01"
                    onChange={(e) => handleChange("file", e.target.files[0])}
                  />
                </div>
                <div className="col-12 text-center my-3">
                  <LoadingButton
                    startIcon={isUpdate ? <Edit /> : <Add />}
                    loading={loading}
                    type="submit"
                    variant="outlined"
                    color={isUpdate ? "info" : "success"}
                  >
                    {isUpdate ? "Update Astrologer" : "Create Astrologer"}
                  </LoadingButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAstrologer;

const languages = [
  "Arabic",
  "Bengali",
  "English",
  "French",
  "German",
  "Hindi",
  "Italian",
  "Japanese",
  "Marathi",
  "Portuguese",
  "Russian",
  "Spanish",
  "Tamil",
  "Urdu",
];

const specialitiese = [
  "Chinese Astrology",
  "Dream Analysis",
  "Feng Shui",
  "Gemstone Consultation",
  "Numerology",
  "Palmistry",
  "Prashna Kundali",
  "Tarot Reading",
  "Vastu Shastra",
  "Vedic Astrology",
  "Western Astrology",
];
