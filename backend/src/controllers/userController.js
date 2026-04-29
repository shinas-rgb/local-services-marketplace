import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function createUser(req, res) {
  try {
    const { name, password, phone, role } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ name, password: hashedPassword, phone, role })
    await newUser.save()
    res.status(201).json({ message: "User created" })
  } catch (error) {
    if (error.code === 11000) return res.status(400).json("Phone number already used")
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { phone, password } = req.body

    const user = await User.findOne({ phone })
    if (!user) return res.status(404).json({ message: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" })

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    )

    res.status(200).json({ message: "Login successful", token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function getUserById(req, res) {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function updateRole(req, res) {
  try {
    const { id, role } = req.body
    const updatedUser = await User.findByIdAndUpdate(id, { role })
    res.status(201).json({ message: "Role updated", updatedUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function updateUser(req, res) {
  try {
    const { id, name, phone } = req.body
    const updatedUser = await User.findByIdAndUpdate(id, {
      name, phone
    }, { new: true })
    res.status(201).json({ message: "Profile updated", updatedUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
