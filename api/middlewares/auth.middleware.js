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
                next(errorHandler(400,'Invalid Inputs'))
            }
        }else{
            next()
        }
    }
}
export default zodValidate