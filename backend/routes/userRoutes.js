import express from 'express'
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  verifyPassword
} from '../controllers/userController.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', loginUser)
router.post('/verify', verifyUser, verifyPassword)
router
  .route('/profile')
  .get(verifyUser, getProfile)
  .put(verifyUser, updateProfile)

export default router
