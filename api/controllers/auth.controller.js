import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup = async (req,res,next) => {
    const {username,email,password} = req.body
    const newUser = new User({
        username,email,password
    })
    try{
        const user = await User.create(newUser)
        const {password:userPassword,...userInfo} = user._doc
        res.status(200).json({"success":true,"statusCode":200,"message":"User SignUp Success",userInfo})
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
                {id:user._id,isAdmin:user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1d'}
            )
            const {password,...userInfo} = user._doc
            res.status(200).cookie('access_token',token,{httpOnly: true}).json({"success":true,"statusCode":200,"message":"User SignIn Success",userInfo})
        }
    }catch(error){
        next(errorHandler(400,error.message))
    }
}

export const OAuth = async (req,res,next) => {
    const {name,email,photoURL} = req.body
    try{
        const user = await User.findOne({'email':email})
        if(user){
            const token = jwt.sign(
                {id:user._id,isAdmin:user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1d'}
            )
            const {password,...userInfo} = user._doc
            res.status(200).cookie('access_token',token,{httpOnly: true}).json({"success":true,"statusCode":200,"message":"User SignIn Success",userInfo})
            return
        }else{
            const finalName = name.split(' ').reduce((accumulator,curVal)=> accumulator+curVal.toLowerCase(),'')
            const username = finalName.slice(0,5)+Math.abs(Math.floor(Math.sin(Date.now())*10000))
            const password = finalName.slice(-5)+Math.abs(Math.floor(Math.cos(Date.now())*100000))
            const newUser = new User({
                username,email,password,photoURL
            })
            const user = await User.create(newUser)
            const token = jwt.sign(
                {id:user._id,isAdmin:user.isAdmin
                }, process.env.JWT_SECRET, { expiresIn: '1d'}
            )
            const {password:userPassword,...userInfo} = user._doc
            res.status(200).cookie('access_token',token,{httpOnly: true}).json({"success":true,"statusCode":200,"message":"User SignUp Success",userInfo})
            return
        }
    }catch(error){
        next(errorHandler(400,error.message))
    }
}