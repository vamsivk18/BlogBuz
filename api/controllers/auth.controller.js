import User from '../models/user.model.js'

export const signup = async (req,res,next) => {
    const {username,email,password} = req.body
    const newUser = new User({
        username,email,password
    })
    await User.create(newUser)
    res.status(200).json({"message":"User Created Successfully"})
}