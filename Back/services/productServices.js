import Products from "../models/Products.js"

const featureProducts = async (req, res) => {
    const products = await Products.find({ main: true })
    if (!products) {
        throw new Error("Not found the main products.")
    }

    return products
}

const listProducts = async (req, res) => {
    const allProducts = await Products.find({ available: true })
    if (!allProducts) {
        throw new Error("Not found the products.")
    }

    return allProducts
}

export default {
    featureProducts,
    listProducts
}