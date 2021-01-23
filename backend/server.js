import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'
import { notFound, errorHandler } from './middleware/errors.js'
import { logInfo } from './utils/logs.js'

dotenv.config({ path: '.env.local' })

connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  logInfo('express', `running on port ${PORT} (${process.env.NODE_ENV})`)
)
