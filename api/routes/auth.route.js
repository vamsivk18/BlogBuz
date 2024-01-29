import express from 'express'
import {signup} from '../controllers/auth.controller.js'
import zodValidate from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/signup',zodValidate('signup'),signup)

export default router