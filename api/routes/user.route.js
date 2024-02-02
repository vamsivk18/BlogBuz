import express from 'express'
import {test} from '../controllers/user.controller.js'
import { updateUser,deleteUser } from '../controllers/user.controller.js'
import {zodValidate,verifyToken} from '../middlewares/user.middleware.js'

const router = express.Router();

router.get('/test',test)
router.put('/update/:userId',verifyToken,zodValidate('update'),updateUser)
router.delete('/delete/:userId',verifyToken,zodValidate('delete'),deleteUser)
router.get('/delete/:userId',verifyToken,zodValidate('delete'),deleteUser)


export default router