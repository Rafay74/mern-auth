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

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };