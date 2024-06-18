import { useState,useEffect } from "react";


import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import gallery from '../../images/user.gif'
import axios from "axios";
import { addBlogs,addNotifications,addServices,addQuestions, updateBlogs, updateServices, updateAbout } from "../../../../redux/astroSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Add, Edit, PlusOne, Update } from "@mui/icons-material";



const CreatePage = (props) => {
var {isUpdate,id,setModelOpen}=props.data;
isUpdate=true

console.log("your props",props)

  var [formData, setFormData] = useState(useSelector((state)=>state.About));
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();



  const handleChange = (name, value) => {
    if (name !== "file") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, file: URL.createObjectURL(value) });
    }
    console.log("your Data",formData);
  };



  function clearFunction(){
    console.log("called the clear function");
    // Create a new object with all keys set to empty string
    const clearedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});

    // Update state with clearedFormData
    console.log("setting the object empty",clearedFormData)
    setFormData(clearedFormData);
  }

  



  // useEffect(() => {
  //   if (isUpdate) {
  //     async function getData() {
  //       try {
  //         const response = await axios.get(
  //           `https://apigarage.njssolutions.in/api/v1/service/getById/${id}`
  //         );

  //         setFormData({...response.data.data})
  //       } catch (error) {
  //         console.log("Error ", error);
  //       }
  //     }
  //     getData();
  //   }
  //   return () => {
  //     console.log("Cleanup function");
  //   };
  // }, []);




  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formDataToSubmit = new FormData();
      for (const key in formData) {
          formDataToSubmit.append(key, formData[key]);
      }


      //Handling the file converting the image to binary to send as request
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
        // const response = await axios.post(
        //   `https://apigarage.njssolutions.in/api/v1/service/new`,
        //   formDataToSubmit
        // );
        // console.log("send the data to server for creation",formDataToSubmit)
        //  dispatch(addServices(response.data.data))
      } else {

        console.log("what you are updating",formDataToSubmit);
        const response = await axios.put(
          `https://apigarage.njssolutions.in/api/v1/about/update/666be264d1be0b0894ea9251`,
          formDataToSubmit
        );

        console.log("send the data to server for updation",formDataToSubmit)
        dispatch(updateAbout(response.data.data))
      }

     
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setModelOpen(false);
    }

    // close the model which
  };



  return (
    <div>
      <div className="row">
        <h4 className="text-center">{isUpdate?"Update About-us":"Create New About-us"}</h4>
        <div className="col-12 my-2 d-flex justify-content-center align-items-center">
          <img
            src={formData.file?formData.file:formData.imageUrl?formData.imageUrl:gallery}
            alt=""

            style={{ width: "150px", height: "150px" }}
          />
        </div>

        <div className="col-12 my-2">
          <TextField
            fullWidth
            variant="outlined"
            label="Heading"
            size="small"
            name="heading"
            onChange={e=>handleChange("heading",e.target.value)}
            value={formData.heading}
          ></TextField>
        </div>

        <div className="col-12 my-2">
          <TextField
            fullWidth
            variant="outlined"
            label="sub-Heading"
            size="small"
            name="subHeading"
            value={formData.subHeading}
            onChange={e=>handleChange("subHeading",e.target.value)}
          ></TextField>
        </div>
        <div className="col-12 my-2">
          <TextField
            multiline
            fullWidth
            rows={10}
            maxRows={10}
            variant="outlined"
            label="content"
            size="small"
            name="content"
            value={formData.content}
            onChange={e=>handleChange("content",e.target.value)}
          ></TextField>
        </div>
        {/* <div className="col-12 my-2">
          <input type="file" class="form-control" id="inputGroupFile01"  name="file"
            onChange={e=>handleChange("file",e.target.files[0])} />
        </div> */}

        <div className="col-12 my-1">
          {/* <Button variant="filled" fullWidth onClick={handleSubmit} sx={{ backgroundColor:"orange" ,WebkitClipPath:"polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"}}>
            Create
          </Button> */}


          <LoadingButton
                    startIcon={isUpdate ? <Edit /> : <Add />}
                    loading={loading}
                    type="submit"
                    variant="filled"
                    color={isUpdate ? "info" : "success"}
                    fullWidth onClick={handleSubmit} sx={{ backgroundColor:"orange" ,WebkitClipPath:"polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"}}
                  >
                    {isUpdate ? "update" : "create"}
                  </LoadingButton>
        </div>

        <div className="col-12 my-3">
          <Button variant="filled" size="large" onClick={e=>setModelOpen(false)}    sx={{ backgroundColor:"red" ,color:"white",WebkitClipPath:"polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",":hover":"color:purple"}}>cancel</Button>{" "}
          <Button variant="filled"  color="secondary" onClick={clearFunction} sx={{ backgroundColor:"grey" ,color:"white",WebkitClipPath:"polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"}}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
