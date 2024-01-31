import mongoose from 'mongoose'

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
        default:'/profile_photo.webp'
    }
},{timestamps:true})

const User = mongoose.model('User', userSchema)

export default User

