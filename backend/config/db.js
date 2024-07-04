import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://zayed:8902@cluster0.zlv1dr5.mongodb.net/EatsExpress').then(()=>console.log("DB Connected"));
}