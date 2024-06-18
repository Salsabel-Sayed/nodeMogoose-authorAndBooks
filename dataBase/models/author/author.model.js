import mongoose, { Schema, model } from "mongoose";


const schema = new Schema({
    name:{
        type:String,
        required: true
    },
    bio:{
        type:String,
        required: true
    },
    brithDate:Date,
    books:{
        type:mongoose.Types.ObjectId,
        ref:'Book'
    }
})


export const Author = model('Author',schema)