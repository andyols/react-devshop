import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utils/token.js'

/**
 *  @desc    Authenticate user and generate jwt
 *  @route   POST /api/users/login
 *  @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(401)
    throw new Error('Email not found')
  }

  // use bcrypt method defined in user schema to verify password
  if (user && (await user.match(password))) {
    const { _id, name, email, isAdmin } = user
    res.json({ _id, name, email, isAdmin, token: generateToken(_id) })
  } else {
    res.status(401)
    throw new Error('Invalid password')
  }
})

/**
 *  @desc    Register a new user and generate jwt
 *  @route   POST /api/users
 *  @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User alredy exists')
  }

  // create new user, password will be hashed using middleware in schema
  const user = await User.create({ name, email, password })

  if (user) {
    const { _id, name, email, isAdmin } = user
    res
      .status(201)
      .json({ _id, name, email, isAdmin, token: generateToken(_id) })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

/**
 *  @desc    Get user profile
 *  @route   GET /api/users/profile
 *  @access  Public
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { _id, name, email, isAdmin } = user

  if (user) {
    res.json({ _id, name, email, isAdmin })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 *  @desc    Update user profile
 *  @route   PUT /api/users/profile
 *  @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  // replace any fields that were included in request
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    // not sure why this check is needed?
    if (req.body.password) {
      user.password = req.body.password
    }

    // save any changes and send back the updated user data
    const updatedUser = await user.save()
    const { _id, name, email, isAdmin } = updatedUser

    res.json({ _id, name, email, isAdmin, token: generateToken(_id) })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 *  @desc    Verify a user password
 *  @route   GET /api/users/verify
 *  @access  Private
 */
const verifyPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { password } = req.body

  // use bcrypt method defined in user schema to verify password
  if (user && (await user.match(password))) {
    res.json({ password: true })
  } else {
    res.status(401)
    throw new Error('Invalid password')
  }
})

export { loginUser, registerUser, getProfile, updateProfile, verifyPassword }
