import Products from "../models/Products.js"

const featureProducts = async (req, res) => {
    const products = await Products.find({ main: true })
    if (!products) {
        throw new Error("Not found the main products.")
    }

    return products
}

export default {
    featureProducts
}