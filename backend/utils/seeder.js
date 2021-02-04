import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import products from '../data/products.js'
import users from '../data/users.js'
import Order from '../models/order.js'
import Product from '../models/product.js'
import User from '../models/user.js'
import { logError, logSuccess } from './logs.js'

dotenv.config({ path: '.env.local' })

connectDB()

const importData = async flag => {
  try {
    switch (flag) {
      case 'users':
        await User.deleteMany()
        await User.insertMany(users)
        logSuccess('seeder__User Data Imported')
        process.exit()

      case 'products':
        await Product.deleteMany()
        const admin = await User.findOne({ isAdmin: true })
        const sampleProducts = products.map(p => ({ ...p, user: admin._id }))
        await Product.insertMany(sampleProducts)
        logSuccess('seeder__Product Data Imported')
        process.exit()

      default:
        logError('import data arg missing')
        process.exit()
    }
  } catch (error) {
    logError(error.message)
    process.exit()
  }
}
const destroyData = async flag => {
  try {
    switch (flag) {
      case 'users':
        await User.deleteMany()
        logSuccess('seeder__User Data Destroyed')
        process.exit()

      case 'products':
        await Product.deleteMany()
        logSuccess('seeder__Product Data Destroyed')
        process.exit()

      case 'orders':
        await Order.deleteMany()
        logSuccess('seeder__Order Data Destroyed')
        process.exit()

      default:
        logError('destroy data arg missing')
        process.exit()
    }
  } catch (error) {
    logError(error.message)
    process.exit()
  }
}

process.argv[2] === '-d'
  ? destroyData(process.argv[3])
  : importData(process.argv[2])
