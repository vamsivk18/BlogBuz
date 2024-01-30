import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req,res,next) => {
    const {username,email,password} = req.body
    const newUser = new User({
        username,email,password
    })
    try{
        await User.create(newUser)
        res.status(200).json({"success":true,"statusCode":200,"message":"User Created Successfully"})
        return
    }catch(error){
        next(errorHandler(400,error.message))
    }
}

export const signin = async (req,res,next) => {
    try{
        const user = await User.findOne({'email':req.body.email})
        if(!user) next(errorHandler(404,'User not found'))
        else if(!(user.password===req.body.password)) next(errorHandler(400,'Invalid password'))
        else {
            const token = jwt.sign(
                {id:user._id}, process.env.JWT_SECRET, { expiresIn: '1d'}
            )
            const {password,...rest} = user._doc
            res.status(200).cookie('access_token',token,{httpOnly: true}).json({"success":true,"statusCode":200,"message":"User Signed In Successfully",rest})
        }
    }catch(error){
        next(errorHandler(400,error.message))
    }
}