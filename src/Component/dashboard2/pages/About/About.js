// import * as React from "react";
// import './About.css'

// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// const About = () => {
// const [formData,setFormData]=React.useState({})

// function handleChange(object){
//     console.log("shakir ansari");
//     const name=object.event.target.name;
//     const value=object.event.target.value

//     setFormData({...formData,[name]:value});
// console.log("handlChange",formData)

// }


//  async function handlSubmit(){

// //upate the about




// }


// React.useEffect(()=>{
//     // This will called when it will get mounted to dom
// console.log("calling the api to fetch the about data")

// return ()=>{
//     return null;
// }
// },[])



//   return (
//     <div id="AboutContainer">
//       <form action="" id="aboutForm" >

//         <div className="row my-5">
//           <div className="col-12"><h4 className="text-center">About form</h4></div>
//           <div className="col-12  my-2">
//             <TextField
//            sx={{width:'100%'}}
//               id="outlined-basic "
//               label="Heading"
//               variant="outlined"
//               value={formData.heading}
//               onChange={e=>handleChange({event:e})}
//             />
//           </div>
//           <div className="col-12  my-2">
//             <TextField
//             sx={{width:'100%'}}
//               id="outlined-basic"
//               label="Sub Heading"
//               variant="outlined"
//               name="subHeading"
//               value={formData.subHeading}
//               onChange={e=>handleChange({event:e})}
//             />
//           </div>
         
//           <div className="col-12  my-2">
//             <TextField
//             sx={{width:'100%'}}
//               id="outlined-basic"
//               label="Content"
//               variant="outlined"
//               name="content"
//               value={formData.content}
//               onChange={e=>handleChange({event:e})}
//             />
//           </div>
//         <div className="col-12 tex-center my-3 d-flex justify-content-center" >
//         <Button variant="outlined" sx={{width:"100%"}}>Update</Button>
//         </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default About;


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

const About = () => {
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
        `https://apigarage.njssolutions.in/api/v1/question/delete/${id}`
      );
      dispatch(removeQuestions(id));
    } catch (error) {
      console.log("error", error);
    }

    setLoading(false);
  }

  const Data = useSelector((state) => state.Questions);

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
            Update-About-Us
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default About;

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
