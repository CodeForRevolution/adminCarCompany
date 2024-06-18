import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CreatePage from "./model/createPage";
import  { Add, Edit, PlusOne, Update,Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  removeQuestions,
  removeBlogs,
  removeNotifications,
  removeServices,
} from "../../../redux/astroSlice";

const Service = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [actionData, setActionData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function ActionOnData(isUpdate, id) {
    setActionData({ actionData, isUpdate: isUpdate, id: id, setModelOpen });
    setModelOpen(true);
    console.log("called the ActionData");
  }

  async function DeleteItem(id) {
    setLoading(true);
    try {
      const deleted = await axios.delete(
        `https://apigarage.njssolutions.in/api/v1/service/delete/${id}`
      );
      dispatch(removeServices(id));
    } catch (error) {
      console.log("error", error);
    }

    setLoading(false);
  }

  const Data= useSelector((state) => state.Services);

  return (
    <div>
      <Modal
        open={modelOpen}
        onClose={() => {
          setModelOpen(false);
        }}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <Box sx={style}>
          <CreatePage data={{ ...actionData }} />
        </Box>
      </Modal>

      <div className="row">
        <div className="col-12 my-3">
          <Button variant="outlined" onClick={(e) => ActionOnData(false, null)}>
            Add-Service
          </Button>
        </div>
        <div className="col-12 p-0" >
          <div className="row w-100 ">
            <div class="accordion p-0" id="accordionExample">

              { Data.length>0? Data.map((item, index) => {
                return (
                  <div
                    class="accordion-item my-3"
                    key={index}
                    style={{
                      boxShadow: "2px 11px 45px -17px rgba(0,0,0,0.75)",
                    }}
                  >
                    <h2 class="accordion-header" id={`heading${index}`}>
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse${index}`}
                      >
                        <span style={{ fontWeight: 700 }}> {item.heading}</span>
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      class="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body p-0">
                        <div className="row">
                          <div className="col-12 col-md-3 p-0">
                            <img
                              src={item.imageUrl}
                              alt=""
                              style={{
                                width: "80%",
                                height: "auto",
                              }}
                            />
                          </div>
                          <div className="col-12  col-md-9  p-0" >
                            <div className="row ">
                              <div
                                className="col-12 my-2 p-0 "
                                style={{ fontWeight: 700 }}
                              >
                                {item.subHeading}
                              </div>
                              <div className="col-12 p-0"> {item.content}</div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 my-3">
                            <Button
                              variant="outlined"
                              onClick={(e) => {
                                ActionOnData(true, item._id);
                              }}
                            >
                              update
                            </Button>{" "}
                            <LoadingButton
                              startIcon={<Delete />}
                              loading={loading}
                              variant="outlined"
                              color="error"
                              onClick={(e) => DeleteItem(item._id)}
                            >
                             Delete
                            </LoadingButton>
                            {/* <Button
                              variant="outlined"
                              color="error"
                              onClick={(e) => DeleteItem(item._id)}
                            >
                              Delete
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }):"No services yet"
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

const serviceList = [
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam voluptatum animi inventore voluptatibus, pariatur unde eveniet magnam eos quasi aliquam sit nobis soluta harum officiis dolores debitis, illum deserunt reprehenderit nihil culpa. Reprehenderit inventore mollitia veniam vel, eligendi asperiores? Suscipit quasi aperiam dolor? Rem, corrupti.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
  {
    heading: "this is hakir",
    subheading: "This is hakir",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus quod dignissimos adipisci nostrum facilis iure libero ipsum minus id totam sequi, assumenda reiciendis sint expedita nemo omnis aut magni beatae reprehenderit? Architecto, maiores exercitationem. Cum perspiciatis a nesciunt eligendi? Ipsa alias neque doloremque esse pariatur.",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "auto",
  mwidth: "500px",
  bgcolor: "background.paper",

  p: 0,
  m: 0,
  maxWidth: "500px",
  overflow: "auto",
  boxShadow: "10px 15px 15px rgba(0, 0, 0, 0.99)",
  WebkitClipPath:
    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
};
