import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
)

userSchema.methods.match = async function (password) {
  return await bcrypt.compare(password, this.password)
}

/**
 * password hash middleware to be ran upon user creation or update
 * only if a password is modified/created
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
