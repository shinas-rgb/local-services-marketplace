import express from "express"
import { createService, getAllServices, updateService, deleteService } from "../controllers/serviceController.js"

const router = express.Router()

router.get('/all', getAllServices)
router.post('/', createService)
router.put('/', updateService)
router.delete('/', deleteService)

export default router
