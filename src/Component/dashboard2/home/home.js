import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";



import Blog from "../pages/Blog/Blog";
import Notification from "../pages/Notification/Notification";
import About from "../pages/About/About";
import Service from "../pages/services/Service";
import Question from "../pages/Queston/Question";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addBulkNotifications,addBulkQuestions,addBulkServices,addBulkBlogs, addAbout } from "../../redux/astroSlice";

import axios from "axios";

const Home = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const Notifications = useSelector((state) => state.Notifications);
  const Services = useSelector((state) => state.Services);
 console.log("notificatoin",Notification);
 console.log("Services",Services);
  

  React.useEffect(() => {
    //fetching all the data and appending to the redux store
    

    async function fetchData() {
      try {
         var AboutResponse = await axios.get("http://localhost:4000/api/v1/about/getById/666be264d1be0b0894ea9251");
         var serviceResponse = await axios.get("http://localhost:4000/api/v1/service/getAll");
       var questioinResponse = await axios.get("http://localhost:4000/api/v1/question/getAll");
       // var notificationResponse = await axios.get("//get all the about data");
        var blogResponse = await axios.get("http://localhost:4000/api/v1/blog/getAll");
console.log("blogresponse",blogResponse.data.data);
        dispatch(addBulkBlogs(blogResponse.data.data))
        dispatch(addAbout(AboutResponse.data.data))
        dispatch(addBulkServices(serviceResponse.data.data))
        dispatch(addBulkQuestions(questioinResponse.data.data))
        

      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            Color: "divider",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="About " value="1"  />
            <Tab label="services" value="2" />
            <Tab label="Questions " value="3" />
            <Tab label="Blog" value="4"/>
            <Tab label="Notification" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ width: "100%", height: "auto",padding:"10px" }}>
          <About />
        </TabPanel>
        <TabPanel value="2" sx={{ width: "100%", height: "auto",padding:"10px" }}>
          <Service />
        </TabPanel>
        <TabPanel value="3" sx={{ width: "100%", height: "auto",padding:"10px" }}>
          <Question />
        </TabPanel>
        <TabPanel value="4" sx={{ width: "100%", height: "auto",padding:"10px" }} >
          <Blog />
        </TabPanel>
        <TabPanel value="5" sx={{ width: "100%", height: "auto",padding:"10px" }}>
          <Notification />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;
