import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'
import connectDB from './config/db.js'

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

    console.log('💾 Data imported'.green.bold)
    process.exit()
  } catch (error) {
    console.error(`❌ ${error.message}`.red.bold)
  }
}
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('💾 Data destroyed'.red.bold)
    process.exit()
  } catch (error) {
    console.error(`❌ ${error.message}`.red.bold)
  }
}

process.argv[2] === '-d' ? destroyData() : importData()
