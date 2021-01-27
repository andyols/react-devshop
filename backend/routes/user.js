import express from 'express'
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  verifyPassword
} from '../controllers/user.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', loginUser)
router.get('/verify', verifyUser, verifyPassword)
router
  .route('/profile')
  .get(verifyUser, getProfile)
  .put(verifyUser, updateProfile)

export default router
