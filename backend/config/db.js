import mongoose from 'mongoose'
import { logError, logInfo } from '../utils/logs.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    logInfo('📡', 'MongoDB', `connected to ${conn.connection.host}`)
  } catch (error) {
    logError(error.message)
    process.exit(1)
  }
}

export default connectDB
