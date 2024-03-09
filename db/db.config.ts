import mongoose from 'mongoose'

export const connectToDB =  ()=>{
mongoose.connect(`${process.env.DB_URI}`).then(()=>{
    console.log("Connected successfuly to DB ")
}).catch((err)=>{
    console.log("error in connecting to db" + err.message)
})
}