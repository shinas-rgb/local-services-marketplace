import Providers from "../models/Providers.js"

export async function CreateProvider(req, res) {
  try {
    const { id, name, image, services, location, availability, rating } = req.body
    const newProvider = new Providers({ userId: id, name, image, services, location, availability, rating })
    await newProvider.save()
    res.status(201).json({ message: "New service created" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function getAllProviders(req, res) {
  try {
    const providers = await Providers.find()
    res.status(200).json(providers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function getProviderByService(req, res) {
  try {
    const name = req.params.name
    const providers = await Providers.find({
      services: {
        $regex: name,
        $options: "i"
      }
    })
    if (!providers) return res.status(404).json({ message: "Provider not found" })
    res.status(200).json(providers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
