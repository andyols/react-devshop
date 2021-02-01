import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/order.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(verifyUser, addOrderItems)
router.route('/:id').get(verifyUser, getOrderById)

export default router
