import zod from 'zod'
import { errorHandler } from '../utils/error.js'
function zodValidate(type){
    return function (req,res,next) {
        if(type==='signup'){
            let zod_schema = zod.object({
                username:zod.string().min(5),
                email:zod.string().email(),
                password:zod.string().min(5)
            })
            let zodded_data = zod_schema.safeParse({"username":req.body.username,"email":req.body.email,"password":req.body.password})
            if(zodded_data.success) next()
            else {
                let errorMessage = 'Invalid Inputs'
                console.log(req.body.username)
                if(req.body.username===undefined || req.body.username.length<5) errorMessage = 'Username too small'
                else if(req.body.password===undefined || req.body.password.length<5) errorMessage = 'Password too small'
                next(errorHandler(400,errorMessage))
            }
        }else if(type==='signin'){
            let zod_schema = zod.object({
                email:zod.string().email(),
                password:zod.string().min(5)
            })
            let zodded_data = zod_schema.safeParse({"email":req.body.email,"password":req.body.password})
            if(zodded_data.success) next()
            else {
                next(errorHandler(400,'Invalid Inputs'))
            }
        }
        else{
            next()
        }
    }
}
export default zodValidate