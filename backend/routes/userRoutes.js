import express from 'express'
import {
  getProfile,
  getUsers,
  loginUser,
  registerUser,
  updateProfile,
  verifyPassword
} from '../controllers/userController.js'
import { isAdmin, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(registerUser).get(verifyUser, isAdmin, getUsers)
router.post('/login', loginUser)
router.post('/verify', verifyUser, verifyPassword)
router
  .route('/profile')
  .get(verifyUser, getProfile)
  .put(verifyUser, updateProfile)

export default router
