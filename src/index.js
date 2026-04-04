//  require('dotenv').config({path:'.env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
  path:'./env'
})
connectDB()
.then(()=>{

  app.listen(process.env.PORT|| 8000,()=>{
    console.log(`Server is running at port ${process.env.PORT}`);

  })
  app.on("error",(err)=>{
    console.log("error exist in your app !!!",err)
  })
})
.catch((err)=>{
  console.log("MONGODB connection failed !!!",err);
})



















// method 1 to connect data base 
/*
import express from "express";
const app=express()
(async()=>{
  try{
   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
   app.on("error",(error)=>{
    console.log("error",error)
   });
   app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
   })
  }
  catch(error){
    console.log("here something wrong",error);
    throw err
  }
})()*/