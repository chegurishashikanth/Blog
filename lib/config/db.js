import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://shashi:kanth45@cluster0.1ufbf.mongodb.net/blog-app');
    console.log("DB Connected");
}