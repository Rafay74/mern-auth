import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to mongoDB')
}).catch((err) => {
    console.log("Error connecting to mongoDB", err)
}) 

const app = express()

app.listen(3000 , () => {
    console.log('Server listening at 3000')
})