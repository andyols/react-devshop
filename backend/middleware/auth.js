import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

/**
 *  @desc    Verifies the request through user route using jwt
 */
export const verifyUser = asyncHandler(async (req, res, next) => {
  let token // instantiate token and get bearer token from request
  const bearer = req.headers.authorization

  // ensure we received an auth header and it starts with Bearer
  if (bearer && bearer.startsWith('Bearer')) {
    try {
      // extract token section of auth header
      token = bearer.split(' ')[1]
      // verify using jwt to extract the user's id
      const { id } = jwt.verify(token, process.env.JWT_SECRET)

      // get the user not that we have verified the request
      req.user = await User.findById(id).select('-password')

      // proceed to user controller
      next()
    } catch (error) {
      console.error('📝 ~ file: auth.js ~ line 19 ~ error', error)
      res.status(401)
      throw new Error('Not authorized, token verification failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
})
