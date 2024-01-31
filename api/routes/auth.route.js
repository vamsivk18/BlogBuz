import express from 'express'
import { signup,signin,OAuth } from '../controllers/auth.controller.js'
import zodValidate from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/signup',zodValidate('signup'),signup)
router.post('/signin',zodValidate('signin'),signin)
router.post('/OAuth',OAuth)

export default router