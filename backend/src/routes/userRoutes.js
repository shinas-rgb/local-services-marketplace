import express from "express"
import { createUser, getAllUsers, getUserById, updateUser, updateRole, loginUser } from "../controllers/userController.js"
import { adminOnly } from "../middleware/adminMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/all', protect, adminOnly, getAllUsers)
router.get('/:id', protect, getUserById)
router.put('/role', protect, adminOnly, updateRole)
router.put('/', protect, updateUser)

export default router
