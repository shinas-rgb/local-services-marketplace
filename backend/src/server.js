import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import servicesRoutes from "./routes/servicesRoutes.js"
import { connectDB } from "./config/db.js"

dotenv.config()
const app = express()

connectDB()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use('/api/user', userRoutes)
app.use('/api/service', servicesRoutes)
app.use('*splat', (req, res) => {
  res.status(404).json({ message: 'Page not found' })
})

app.listen(8080, () => {
  console.log("Server started at port 8080")
})
