import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    photoURL:{
        type: String,
        default:process.env.BASE_URL+'/profile_photo.webp'
    },
    isAdmin:{
        type: Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('User', userSchema)

export default User

