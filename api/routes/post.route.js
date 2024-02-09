import express from 'express'
import { getPosts } from '../controllers/post.controller.js'
const route = express.Router()

route.get('/getPosts',getPosts)

export default route