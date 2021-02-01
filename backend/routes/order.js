import express from 'express'
import { createOrder, getOrderById, updateOrder } from '../controllers/order.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(verifyUser, createOrder)
router.route('/:id').get(verifyUser, getOrderById)
router.route('/:id/pay').put(verifyUser, updateOrder)

export default router
