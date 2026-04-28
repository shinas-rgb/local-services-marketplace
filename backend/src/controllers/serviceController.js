import Services from "../models/Services.js"

export async function getAllServices(req, res) {
  try {
    const services = await Services.find()
    res.status(200).json(services)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function getServiceById(req, res) {
  try {
    const { id } = req.params
    const service = await Services.findById(id)

    if (!service) return res.status(404).json({ message: "Service not found" })
    res.status(200).json(service)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function createService(req, res) {
  try {
    const { name, basePrice } = req.body

    const newService = new Services({ name, basePrice })

    await newService.save()
    res.status(201).json({ message: "New service created" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function updateService(req, res) {
  try {
    const { name, basePrice } = req.body

    const updatedService = await Services.findOneAndUpdate({ name }, { $set: { name, basePrice } })

    res.status(201).json({ message: "Service updated", updatedService })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function deleteService(req, res) {
  try {
    const { id } = req.body
    const deletedService = await Services.findByIdAndDelete(id)
    res.status(200).json({ message: "Service deleted", deletedService })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function getServiceByName(req, res) {
  try {
    const name = req.params.name
    const service = await Services.findOne({ name })
    if (!service) return res.status(404).json({ message: "Service not found" })
    res.status(200).json(service)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
