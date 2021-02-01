import express from 'express'
import { addOrderItems } from '../controllers/order.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(verifyUser, addOrderItems)

export default router
