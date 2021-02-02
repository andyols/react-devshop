import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utils/token.js'

/**
 *  @desc    Authenticate user and generate jwt
 *  @route   POST /api/users/login
 *  @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // use bcrypt method defined in user schema to verify password
  if (user && (await user.match(password))) {
    const { _id, name, email } = user
    // data to send back to client
    res.json({ id: _id, name, email, token: generateToken(_id) })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 *  @desc    Register a new user and generate jwt
 *  @route   POST /api/users
 *  @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  // check if user exists
  if (userExists) {
    res.status(400)
    throw new Error('User alredy exists')
  }

  // create new user, password will be hashed using middleware in schema
  const user = await User.create({ name, email, password })

  // check if user was created
  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  const { _id } = user

  // data to send back to client
  res.status(201).json({ id: _id, name, email, token: generateToken(_id) })
})

/**
 *  @desc    Get user profile
 *  @route   GET /api/users/profile
 *  @access  Public
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  // check if user was found
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const { _id, name, email, isAdmin } = user

  // data to send back to client
  res.json({ _id, name, email, isAdmin })
})

/**
 *  @desc    Update user profile
 *  @route   PUT /api/users/profile
 *  @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  // check if user was found
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // replace any fields that were included in request
  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  if (req.body.password) {
    user.password = req.body.password
  }

  // save any changes
  const updatedUser = await user.save()
  const { _id, name, email } = updatedUser

  // data to send back to client
  res.json({ _id, name, email, token: generateToken(_id) })
})

/**
 *  @desc    Verify a user password
 *  @route   GET /api/users/verify
 *  @access  Private
 */
export const verifyPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const { password } = req.body
  const verified = await user.match(password)

  if (!verified) {
    res.status(401)
    throw new Error('Invalid password')
  }

  res.status(200).json('success')
})
