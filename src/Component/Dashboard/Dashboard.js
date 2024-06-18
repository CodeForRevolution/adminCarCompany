import "./Dashbaord.css";
import axios from "axios";
import { useState } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DailogueBox from "../helperComponent/DailogueBox";
import CreateAstrologer from "./modal/createAstrologer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { useSelector, useDispatch } from "react-redux";
import { removeAstro, addBulk } from "../redux/astroSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "90%",
  mwidth: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
  m: 0,
  maxWidth: "500px",
  overflow: "auto",
};

const Dashboard = (props) => {
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const [pOpen, setpOpen] = React.useState(false);
  const handleOpenP = () => setpOpen(true);
  const handleCloseP = () => setpOpen(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // handling the pop of delete
  const [dailogueOPen, setDailogueOpen] = useState(false);
  const handleDailogueClose = () => {
    setDailogueOpen(false);
  };
  const [deleteObject, setDeleteObject] = useState({});

  const [formDataP, setFormDataP] = useState("");

  const dispatch = useDispatch();
  const Astrologers = useSelector((state) => state.Astrologers);

  //handle the delet dailogue box
  function handleDeleteDalogue(object) {
    setDeleteObject(object);
    setDailogueOpen(true);
  }

  function setAstrologerData(doUpdate, id) {
    setIsUpdate(doUpdate);

    if (doUpdate) {
      setFormDataP(id);
    } else {
      setFormDataP(null);
    }

    handleOpenP();
  }

  async function deleteAstrologer(id) {
    try {
      const reponse = await axios.delete(
        `https://royal-webtech-backend.vercel.app/api/v1/astrologers/${id}`
      );
      dispatch(removeAstro(id));
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    const User = localStorage.getItem("user");
    if (User) {
      async function filterRecord() {
        try {
          const query = {
            ...filters,
          };
          const queryString = new URLSearchParams(filters).toString();
          const response = await axios.get(
            `https://royal-webtech-backend.vercel.app/api/v1/astrologers`
          );
          console.log("your Astrologer Data when render", response.data.data);
          dispatch(addBulk(response.data.data));
        } catch (error) {
          console.log("error", error);
        }
      }
      filterRecord();
    } else {
      navigate("/login");
    }
  }, [filters]);

  function handlefilterChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setFilters({ ...filters, [name]: value });
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("User"))) {
      async function fetchData() {
        try {
          console.log("yes it is true");
          const response = await axios.get(
            "https://royal-webtech-backend.vercel.app/api/v1/astrologers"
          );
        } catch (error) {
          console.log("error", error);
        }
      }
      fetchData();
    }
  }, []);

  return (
    <div className="dashboard" id="dashboard">
      <Modal
        open={pOpen}
        onClose={handleCloseP}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <Box sx={style}>
          <CreateAstrologer
            Data={{
              isUpdate,
              setIsUpdate,
              formDataP,
              setFormDataP,
              handleCloseP,
            }}
          />
          <div className="row position-absolute  bottom-0 end-0 w-100 py-2">
            <div className="col-3  mx-2">
              <Button variant="outlined" color="info" onClick={handleCloseP}>
                Cancel
              </Button>
            </div>
            <div className="col-3  mx-3 ">
              <Button variant="outlined" color="warning" className="ms-auto">
                CLEAR
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <DailogueBox
        data={{
          dailogueOPen,
          handleDailogueClose,
          deleteObject,
          deleteAstrologer,
        }}
      />
      <div className="row">
        <div className="col-12 p-0  main bg-primary">
          <div className="row m-0">
            <div className="col-md-1 m-0 p-0  h3  " id="sidebar">
              <div
                className="row m-md-0 p-2 p-0  text-center"
                id="sidebarContainer"
              >
                <div className="col-md-12 col-2 my-md-3">
                  <i class="fa-solid fa-house"></i>
                </div>
                <div
                  className="col-md-12 col-2 my-md-3"
                  onClick={() => setAstrologerData(false)}
                >
                  <i class="fa-solid fa-user-plus"></i>
                </div>
                <div className="col-md-12 col-2 my-md-3">
                  <i class="fa-solid fa-money-check-dollar"></i>
                </div>
                <div className="col-md-12 col-2 my-md-3">
                  <i class="fa-solid fa-chart-pie"></i>
                </div>
                <div className="col-md-12 col-2 my-md-3">
                  <i class="fa-solid fa-calendar-days"></i>
                </div>
                <div className="col-md-12 col-2 my-md-3">
                  <i class="fa-solid fa-download"></i>
                </div>
              </div>
            </div>
            <div
              className="col-md-11 m-0 col-12 p-0  bg-secondary"
              id=" dashboarad"
            >
              <div className="row  p-md-0 ">
                <div
                  className="col-12 p-md-1  p-0   bg-white filter"
                  id="filter"
                >
                  <div className="row py-md-0 py-md-1  py-2 px-1">
                    <div className="col-md-3 box     mb-md-0  mb-2  p-0  px-md-0 px-1  col-6">
                      <TextField
                        fullWidth
                        size="small"
                        id="outlined-basic"
                        label="search"
                        name="search"
                        onChange={(e) => handlefilterChange(e)}
                        variant="outlined"
                      />
                    </div>
                    <div className="col-md-2  mx-md-2  px-md-0 p-0 col-6 px-1">
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Date-by
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="google"
                          name="filterField"
                          size="small"
                          onChange={(e) => handlefilterChange(e)}
                        >
                          <MenuItem value={"visited"}>visited</MenuItem>
                          <MenuItem value={"nextVisit"}>next-visit</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-2  px-1 p-0 col-5">
                      <input
                        type="date"
                        name="fromDate"
                        value={filters.fromDate}
                        onChange={(e) => {
                          handlefilterChange(e);
                        }}
                      />
                    </div>
                    <div className="col-md-2 mx-md-2 mx-0 px-1  mx-md-2  p-0 col-5 ">
                      <input
                        type="date"
                        value={filters.toDate}
                        name="toDate"
                        onChange={(e) => {
                          handlefilterChange(e);
                        }}
                      />
                    </div>
                    <div className="col-md-1  col-1 p-0  d-md-block d-none ">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Arrange
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          size="small"
                          label="google"
                          name="direction"
                          onChange={(e) => handlefilterChange(e)}
                        >
                          <MenuItem value={1}>Asending</MenuItem>
                          <MenuItem value={-1}>Descending</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-1 col-2">
                      <IconButton color="success">
                        <AutorenewIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>

                <div className="col-12 px-1 px-md-2 Data " id="mainData">
                  <div class="accordion my-1  " id="accordionExample">
                    {Astrologers.map((p, index) => {
                      return (
                        <div class="accordion-item   my-2" key={index}>
                          <h2 class="accordion-header  " id={`heading${index}`}>
                            <button
                              class="accordion-button    p-0 py-md-3  px-1 "
                              type="button "
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${index}`}
                              aria-expanded="false"
                              aria-controls={`collapse${index}`}
                            >
                              <div className="row  p-0 w-100  ">
                                <div className="col-md-4 p-0 col-12 my-md-0   my-1">
                                  <span className="h6">
                                    {" "}
                                    <i class="fa-solid fa-user ms-1 mx-1"></i>{" "}
                                  </span>
                                  {p.name}
                                </div>
                                <div className="col-md-4 p-0 col-8   my-md-0  my-2">
                                  <span className="h6">
                                    <i class="fa-solid fa-envelope ms-1"></i>{" "}
                                  </span>
                                  {p.email}
                                </div>
                                <div className="col-md-4 col-4  p-0 my-md-0 my-2 ">
                                  <span className="h6">
                                    <i class="fa-solid fa-person-half-dress mx-1 "></i>{" "}
                                  </span>
                                  {p.gender}
                                </div>
                              </div>
                            </button>
                          </h2>
                          <div
                            id={`collapse${index}`}
                            class="accordion-collapse collapse"
                            aria-labelledby={`heading${index}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body  p-0">
                              <div className="row w-100  ">
                                <div className="row  p-0 mb-3 mt-1 ">
                                  <div className="col-md-6 p-0  col-12  my-md-0   my-2">
                                    <span className="h6">Language:</span>
                                    {p.language.map((lang) => {
                                      return <span> {lang} </span>;
                                    })}
                                  </div>
                                  <div className="col-md-6 p-0  col-12  my-md-0   my-2">
                                    <span className="h6">Speicality:</span>
                                    {p.speciality.map((sp) => {
                                      return <span> {sp} </span>;
                                    })}
                                  </div>
                                </div>
                                <div className="col-12 p-0">
                                  <div className="row">
                                    <div className=" col-lg-1 col-md-2 col-sm-2 col-4 p-md-2 p-1">
                                      <Button
                                        fullWidth
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon />}
                                        onClick={(e) => {
                                          handleDeleteDalogue({
                                            ...p,
                                            type: "patient",
                                          });
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                    <div className="col-lg-1 col-md-2 col-sm-2  col-4 p-md-2 p-1">
                                      <Button
                                        fullWidth
                                        variant="outlined"
                                        color="info"
                                        size="small"
                                        onClick={() =>
                                          setAstrologerData(true, p._id)
                                        }
                                        startIcon={<BorderColorIcon />}
                                      >
                                        Update
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
