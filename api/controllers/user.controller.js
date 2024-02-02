import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const test = (req,res)=>{
    res.json({'message':'User API is working'})
}
export const updateUser = async (req,res,next)=>{
    const filter = {'_id':req.params.userId}
    const updateDoc = {$set:req.user}
    const options = {returnOriginal: false}
    try{
        const userUpdated = await User.findOneAndUpdate(filter,updateDoc,options)
        const {password,...userInfo} = userUpdated._doc
        console.log(userInfo)
        if(userUpdated){
            res.status(200).json({'success':true,'message':'User Updated Successfully',userInfo})
        }else{
            return next(errorHandler(401,'Unable to Update User'))
        }
    }
    catch(error){
        return next(errorHandler(401,error.message))
    }
}

export const deleteUser = async (req,res,next)=>{
    const filter = {'_id':req.params.userId}
    try{
        const deletedUpdated = await User.deleteOne(filter)
        if(deletedUpdated){
            res.clearCookie('access_token').status(200).json({'success':true,'message':'User Deleted Successfully'})
        }else{
            return next(errorHandler(401,'Unable to Delete User'))
        }
    }
    catch(error){
        return next(errorHandler(401,error.message))
    }
}