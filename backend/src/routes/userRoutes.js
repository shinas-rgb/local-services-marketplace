import express from "express"
import { createUser, getAllUsers, getUserById, updateRole, loginUser } from "../controllers/userController.js"

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)
router.get('/:id', getUserById)
router.put('/role', updateRole)

export default router
