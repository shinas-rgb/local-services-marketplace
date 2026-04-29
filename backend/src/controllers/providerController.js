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
    const query = req.query?.q
    const available = req.query?.available
    let search = {}
    if (query) {
      search.name = {
        $regex: query, $options: "i"
      }
    }
    if (available) {
      search.availability = {
        $regex: "Any time", $options: "i"
      }
    }
    const providers = await Providers.find(search)
    res.status(200).json(providers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function getProviderById(req, res) {
  try {
    const id = req.params.id
    const provider = await Providers.findOne({ userId: id })
    if (!provider) return res.status(404).json({ message: "Provider not found" })
    res.status(200).json(provider)
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

export async function updateProvider(req, res) {
  try {
    const { id, name, services, location, availability, image } = req.body
    const updatedProvider = await Providers.findByIdAndUpdate(id, {
      services, name, location, availability, image
    }, { new: true })
    res.status(200).json({ message: "Profile updated", updatedProvider })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export async function rateProvider(req, res) {
  try {
    const { id, rate } = req.body
    const updated = await Providers.findByIdAndUpdate(id, { $inc: { ratingCount: 1 } }, { returnDocument: "after" })

    const avg = (rate + updated.rating) / updated.ratingCount
    updated.rating = avg
    await updated.save()
    res.status(200).json({ message: "Rate updated", updated })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
