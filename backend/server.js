import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errors.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { logInfo } from './utils/logs.js'

dotenv.config({ path: '.env.local' })

connectDB()

const app = express()
app.use(express.json())

// paypal
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  logInfo(`express__running on port ${PORT} (${process.env.NODE_ENV})`)
)
