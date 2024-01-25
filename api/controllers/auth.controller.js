import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res, next) => {
    const { username , email , password} = req.body;
    let pass = password.toString()
    const hashedPassword = await bcryptjs.hash(pass,10)
    const newUser = new User({username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({message : "User created successfully"})     
    } catch (error) {
        next(errorHandler(300,"Something went wrong"))
    }
   
}