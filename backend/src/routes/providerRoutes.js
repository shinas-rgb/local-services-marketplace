import express from "express"
import { CreateProvider, getProviderByService, getAllProviders } from "../controllers/providerController.js"

const router = express.Router()

router.post('/', CreateProvider)
router.get('/all', getAllProviders)
router.get('/service/:name', getProviderByService)

export default router
