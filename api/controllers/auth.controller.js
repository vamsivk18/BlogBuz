import User from '../models/user.model.js'

export const signup = async (req,res,next) => {
    const {username,email,password} = req.body
    const newUser = new User({
        username,email,password
    })
    try{
        await User.create(newUser)
        res.status(200).json({"success":true,"statusCode":200,"message":"User Created Successfully"})
    }catch(error){
        res.status(400).json({"success":false,"statusCode":400,"message":error.message})
    }
}