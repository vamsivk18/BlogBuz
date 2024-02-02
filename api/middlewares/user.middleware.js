import zod from 'zod'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'

export function zodValidate(type){
    return function(req,res,next){
        let {username,password,photoURL} = req.body
        if(password!==undefined && password!==null && password.length==0) password = undefined
        console.log(req.body)
        if(type==='update'){
            let zod_schema = zod.object({
                username:zod.union([zod.string().min(5),zod.undefined()]),
                password:zod.union([zod.string().min(5),zod.undefined()]),
                photoURL:zod.union([zod.string(),zod.null(),zod.undefined()])
            })
            let userUpdateData = {
                username:username,password:password,photoURL:photoURL
            }
            let zodded_data = zod_schema.safeParse(userUpdateData)
            let errorMessage = 'Error Occured'
            console.log(zodded_data)
            if(zodded_data.success) {
                const updatedUser = {}
                if(username!=undefined) updatedUser.username = username
                if(password!=undefined) updatedUser.password = password
                if(photoURL!=undefined) updatedUser.photoURL = photoURL
                if(Object.keys(updatedUser).length==0) return next(errorHandler(401,'Atleast one field is required to update'))
                console.log(updatedUser)
                req.user = updatedUser
                return next()
            }
            else if(req.body.username===undefined || req.body.username.length<5) errorMessage = 'Username too small'
            else if(req.body.password===undefined || req.body.password.length<5) errorMessage = 'Password too small'
            return next(errorHandler(401,errorMessage))
        }else{
            next()
        }
    }
}

export function verifyToken(req,res,next){
    const token = req.cookies.access_token
    if(!token){
        return next(errorHandler(401,'Unauthorized'))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(401,'Unauthorized Token'))
        if(user.id!==req.params.userId) return next(errorHandler(401,'Data Mismatch'))
        req.user = user
        next()
    })
}