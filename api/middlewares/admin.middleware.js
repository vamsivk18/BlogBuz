import zod from 'zod'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'

export default function zodValidate(type){
    return function(req,res,next){
        if(!req.user.isAdmin){
            return next(errorHandler(403,'Unauthorized Access. Only Admin can access this'))
        }
        if(type==='createPost'){
            let zod_schema = zod.object({
                title:zod.string().min(1),
                content: zod.string().min(1)
            })
            let zodded_data = zod_schema.safeParse({title:req.body.title,content:req.body.content})
            if(zodded_data.success){
                return next()
            }else{
                return next(errorHandler(401,'Title or Content too small'))
            }
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
        req.user = user
        next()
    })
}