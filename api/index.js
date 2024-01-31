import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
app.use(express.json())
app.use(express.static('api/public'))

import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{console.log("MongoDb is Connected")})
.catch((err)=>{console.log(err)})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000!")
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

function globalErrorHandler(err,req,res,next){
    if(err){
        // console.log(err)
        res.json({"success":false,
                    "statusCode":err.statusCode,
                    "message":err.message})
        return
    }
}
app.use(globalErrorHandler)