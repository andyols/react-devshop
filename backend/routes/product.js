import express from 'express'
import { allProducts, productById } from '../controllers/product.js'

const router = express.Router()

router.route('/').get(allProducts)
router.route('/:id').get(productById)

export default router
