import express from 'express'
import {
  authUser,
  getProfile,
  registerUser,
  updateProfile
} from '../controllers/user.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(verifyUser, getProfile)
  .put(verifyUser, updateProfile)

export default router
