import express from "express"
import cloudinary from "../config/Cloudinary.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const fileStr = req.file.buffer.toString("base64")

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      {
        folder: "local_service",
      }
    )

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
