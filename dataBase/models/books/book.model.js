import mongoose, { Schema, model } from "mongoose";



const schema = new Schema({
    title:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    publishedDate:Date,
    authorName:{
        type:mongoose.Types.ObjectId,
        ref:'Author',
        required: true
    }
})

export const Book = model('Book',schema)



