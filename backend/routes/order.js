import express from 'express'
import { createOrder, getOrderById } from '../controllers/order.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(verifyUser, createOrder)
router.route('/:id').get(verifyUser, getOrderById)

export default router
