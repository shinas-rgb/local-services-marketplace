import express from "express"
import { CreateProvider, getProviderByService, getAllProviders, getProviderById, updateProvider, rateProvider } from "../controllers/providerController.js"
import { adminOnly } from "../middleware/adminMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/', protect, CreateProvider)
router.get('/all', getAllProviders)
router.get('/service/:name', getProviderByService)
router.get('/:id', getProviderById)
router.put('/', protect, updateProvider)
router.put('/rate', protect, rateProvider)

export default router
