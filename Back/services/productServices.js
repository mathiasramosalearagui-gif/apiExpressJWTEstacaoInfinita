import Products from "../models/Products.js"

const featureProducts = async () => {
    const products = await Products.find({ main: true })
    if (!products) {
        throw new Error("Not found the main products.")
    }

    return products
}

const listProducts = async () => {
    const allProducts = await Products.find({ available: true })
    if (!allProducts) {
        throw new Error("Not found the products.")
    }

    return allProducts
}

const filterProducts = async (filter) => {
    const products = await Products.find({ category: filter })
    if (!products) {
        throw new Error("Not found products with this filter.")
    }

    return products
}

export default {
    featureProducts,
    listProducts,
    filterProducts
}