import express from "express"
import { createUser, getAllUsers, loginUser } from "../controllers/userController.js"

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)

export default router
