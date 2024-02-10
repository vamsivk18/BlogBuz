import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import { verifyToken } from "../middlewares/admin.middleware.js";
export async function getPosts(req,res,next){
    try{
        //We need to show certain posts and then click show next to show remaining posts
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 2
        const sortDirection = req.query.order === 'asc' ? 1 : -1
        // const posts = await Post.find()
        const posts = await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                    { category: { $regex: req.query.searchTerm, $options: 'i' } }
                ]
            })
        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit)
        const totalPosts = await Post.countDocuments({
            ...(req.query.userId && {userId:req.query.userId})
        })
        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )
        const lastMonthPosts = await Post.countDocuments({
            createdAt:{ $gte: oneMonthAgo },
            ...(req.query.userId && {userId:req.query.userId})
        })
        res.status(200).json({posts,totalPosts,lastMonthPosts})
    }catch(error){
        console.log(error)
        return next(errorHandler(403,error.message))
    }
}

export async function deletePosts(req,res,next){
    const {postId,userId} = req.params
    console.log(req.user)
    if(req.user.id!==userId) return next(errorHandler(403,'Unauthorized Access'))
    try{
        const post = await Post.findOne({_id:postId})
        if(!post) return next(errorHandler(403,"Post Doesn't exist"))
        if(post.userId!==userId) return next(errorHandler(403,'Unauthorized Access'))
        const deletedPost = await Post.deleteOne({_id:postId})
        res.status(200).json({success:'true',message:'Post Deleted Successfully'})
    }catch(error){
        console.log(error)
        return next(errorHandler(403,'Unable to Delete Post'))
    }
}