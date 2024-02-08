import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true,
    },
    content:{
        type: String,
        require: true
    },
    slug:{
        type: String,
        require:true,
        unique:true
    },
    image:{
        type: String,
        default: process.env.BASE_URL+'/blog.jpg'
    },
    category:{
        type: String,
        default: 'Uncategorized'
    },
    userId:{
        type: String,
        require:true
    }
},{timestamps:true})

const Post = mongoose.model('Post', postSchema)

export default Post

