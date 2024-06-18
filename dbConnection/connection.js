import mongoose from 'mongoose'

export const dbconnection = mongoose.connect('mongodb://localhost:27017/assignment8').then(()=>{
    console.log('connected successfully');
}).catch((error)=>{
    console.log('error in connection',error);
})