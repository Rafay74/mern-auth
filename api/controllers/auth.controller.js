import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    let pass = password.toString()
    const hashedPassword = await bcryptjs.hash(pass, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        next(errorHandler(300, "Something went wrong"))
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //check if the email is correct or not
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))

        //check password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid Password'))


        //if both are correct , then make a token 
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPassword , ...rest } = validUser._doc
        //set the token in the cookie
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)


    } catch (error) {
        next(error)
    }
}