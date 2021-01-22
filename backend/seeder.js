import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'
import connectDB from './config/db.js'
import { logError, logSuccess } from './utils/logs.js'

dotenv.config({ path: '.env.local' })

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }))

    await Product.insertMany(sampleProducts)

    logSuccess('💾', 'Data imported')
    process.exit()
  } catch (error) {
    logError(error.message)
  }
}
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    logSuccess('💾', 'Data destroyed')
    process.exit()
  } catch (error) {
    logError(error.message)
  }
}

process.argv[2] === '-d' ? destroyData() : importData()
