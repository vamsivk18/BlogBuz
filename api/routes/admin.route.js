import express from 'express'
import { verifyToken } from '../middlewares/admin.middleware.js'
import zodValidate from '../middlewares/admin.middleware.js'
import { createPost } from '../controllers/admin.controller.js'

const router = express.Router()

router.post('/create-post',verifyToken,zodValidate('createPost'),createPost)

export default router