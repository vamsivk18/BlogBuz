import { errorHandler } from "../utils/error.js"
import Post from "../models/post.model.js"


export const createPost = async function(req,res,next){
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'')
    const newPost =new Post({...req.body,slug,userId:req.user.id})
    try{
        const post = await Post.create(newPost)
        res.status(201).json({success:true,message:"Post Created Successfully",slug})
    }catch(error){
        return next(errorHandler(401,error.message))
    }
}