import express from 'express'
import { authUser, registerUser, userProfile } from '../controllers/user.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(verifyUser, userProfile)

export default router
