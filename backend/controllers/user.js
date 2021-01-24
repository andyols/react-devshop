import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utils/token.js'

/**
 *  @desc    Authenticate user, then generate a unique jwt for said user
 *  @route   POST /api/users/login
 *  @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // use bcrypt method defined in user schema to verify password
  if (user && (await user.match(password))) {
    const { _id, name, email, isAdmin } = user
    res.json({ _id, name, email, isAdmin, token: generateToken(_id) })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 *  @desc    Get user profile
 *  @route   GET /api/users/profile
 *  @access  Public
 */
const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { _id, name, email, isAdmin } = user

  if (user) {
    res.json({ _id, name, email, isAdmin })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, userProfile }
