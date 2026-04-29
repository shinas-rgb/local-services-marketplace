import express from "express"
import { createService, getAllServices, getServiceByName, updateService, deleteService } from "../controllers/serviceController.js"
import { adminOnly } from "../middleware/adminMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/all', getAllServices)
router.post('/', protect, adminOnly, createService)
router.put('/', protect, adminOnly, updateService)
router.delete('/', protect, adminOnly, deleteService)
router.get('/:name', getServiceByName)

export default router
