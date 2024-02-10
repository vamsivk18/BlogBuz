import express from 'express'
import { getPosts,deletePosts } from '../controllers/post.controller.js'
import { verifyToken } from '../middlewares/admin.middleware.js'


const route = express.Router()

route.get('/getPosts',getPosts)
route.delete('/deletePost/:postId/:userId',verifyToken,deletePosts)

export default route