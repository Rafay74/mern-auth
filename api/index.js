import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to mongoDB')
}).catch((err) => {
    console.log("Error connecting to mongoDB", err)
}) 

const app = express()
app.use(express.json())

app.listen(3000 , () => {
    console.log('Server listening at 3000')
})

//api calls
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


//middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})