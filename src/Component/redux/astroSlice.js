import { createSlice } from "@reduxjs/toolkit";

var initialState={
    Astrologers:[],
    About:{},
    Services:[{heading:"shakir"}],
    Questions:[],
    Blogs:[],
    Notifications:[{heading:"shakir"}],
}


export const AstroSlice=createSlice({
    name:"Astrology",
    initialState,
    reducers:{
        addBulk:(state,action)=>{
           state.Astrologers=[...action.payload]
        },
        addAstro:(state,action)=>{
            state.Astrologers.push(action.payload);     
        },
        removeAstro:(state,action)=>{
        state.Astrologers=state.Astrologers.filter((astro)=>astro._id!==action.payload);
        },
        updateAstro:(state,action)=>{
        state.Astrologers = state.Astrologers.map((astro) =>
            astro._id === action.payload._id ? action.payload : astro
          );
        },



        
         addAbout:(state,action)=>{
             state.About=action.payload     
         },
        
         updateAbout:(state,action)=>{
         state.About=action.payload
         },






         addBulkQuestions:(state,action)=>{
            state.Questions=[...action.payload]
         },
         addQuestions:(state,action)=>{
             state.Questions.push(action.payload);     
         },
         removeQuestions:(state,action)=>{
         state.Questions=state.Questions.filter((question)=>question._id!==action.payload);
         },
         updateQuestions:(state,action)=>{
         state.Questions = state.Questions.map((question) =>
             question._id === action.payload._id ? action.payload : question
           );
         },


         addBulkServices:(state,action)=>{
            state.Services=[...action.payload]
         },
         addServices:(state,action)=>{
             state.Services.push(action.payload);     
         },
         removeServices:(state,action)=>{
         state.Services=state.Services.filter((question)=>question._id!==action.payload);
         },
         updateServices:(state,action)=>{
         state.Services = state.Services.map((question) =>
             question._id === action.payload._id ? action.payload : question
           );
         },



         addBulkBlogs:(state,action)=>{
            state.Blogs=[...action.payload]
         },
         addBlogs:(state,action)=>{
             state.Blogs.push(action.payload);     
         },
         removeBlogs:(state,action)=>{
         state.Blogs=state.Blogs.filter((question)=>question._id!==action.payload);
         },
         updateBlogs:(state,action)=>{
         state.Blogs = state.Blogs.map((question) =>
             question._id === action.payload._id ? action.payload : question
           );
         },



         addBulkNotifications:(state,action)=>{
            state.Notifications=[...action.payload]
         },
         addNotifications:(state,action)=>{
             state.Notifications.push(action.payload);     
         },
         removeNotifications:(state,action)=>{
         state.Notifications=state.Notifications.filter((question)=>question._id!==action.payload);
         },
         updateNotifications:(state,action)=>{
         state.Notifications = state.Notifications.map((question) =>
             question._id === action.payload._id ? action.payload : question
           );
         }



    

    }
})

export const {addAstro,removeAstro,addBulk,updateAstro,addAbout,updateAbout,addBulkQuestions,addQuestions,removeQuestions,updateQuestions,addBulkServices,addServices,updateServices,removeServices,addBulkBlogs,addBlogs,removeBlogs,updateBlogs,addBulkNotifications,addNotifications,removeNotifications,updateNotifications}=AstroSlice.actions
export default AstroSlice.reducer;