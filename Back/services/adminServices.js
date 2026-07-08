import User from "../models/User.js"
import Products from "../models/Products.js"
import Orders from "../models/Orders.js";

const listAllUsers = async () => {
    const users = await User.find()
    if (!users) {
        throw new Error("Dont found users.")
    }

    return users
}

const relatory = async () => {
    let allProducts = await Products.find()
    if (!allProducts) {
        allProducts = "Dont found products."
    }

    let allProductsActives = await Products.find({ available: true })
    if (!allProductsActives) {
        allProductsActives = "Dont find products actives"
    }

    let allProductsUnactives = await Products.find({ available: false })
    if (!allProductsUnactives) {
        allProductsUnactives = "Dont find products inactives"
    }

    let allUsers = await User.countDocuments()
    if (!allUsers) {
        allUsers = "Dont find users"
    }

    let allUsersActives = await User.countDocuments({ active: true })
    if (!allUsersActives) {
        allUsersActives = "Dont find users actives"
    }

    let allUsersUnactives = await User.countDocuments({ active: false })
    if (!allUsersUnactives) {
        allUsersUnactives = "Dont find users unactives"
    }

    let allOrders = await Orders.countDocuments()
    if (!allOrders) {
        allOrders = "Dont find orders."
    }

    return {
        allProducts,
        allProductsActives,
        allProductsUnactives,
        allUsers,
        allUsersActives,
        allUsersUnactives,
        allOrders
    }
}

const listProducts = async () => {
    const productActive = await Products.find({ available: true })
    if (!productActive)
        throw new Error("Not find products actives.")

    const productUnactive = await Products.find({ available: false })
    if (!productUnactive) {
        throw new Error("Dont find products unactives.")
    }

    const actives = productActive;
    const unactives = productUnactive;

    return {
        actives,
        unactives
    }
}

const createProduct = async (data) => {
    const { nameOfProduct, priceOfProduct, amount, description, available, category, observations, main, image } = data
    if (!nameOfProduct || !priceOfProduct || !amount || !description || !available || !category) {
        throw new Error("The name, price, amount, description, available and category are must")
    }

    return Products.create(
        {
            nameOfProduct,
            priceOfProduct,
            amount,
            description,
            available,
            category,
            observations,
            main,
            image
        }
    )
}

const updateProduct = async (idProduct, data) => {
    const verifyProduct = await Products.findById(idProduct)
    if (!verifyProduct) {
        throw new Error("Not find this product.")
    }

    delete data.available

    const updatedProduct = await Products.findByIdAndUpdate(idProduct, data)
    if (!updatedProduct) {
        throw new Error("Not is possibled updated this product.")
    }

    return updatedProduct
}

const desactiveProduct = async (idProduct) => {
    const verifyProduct = await Products.findById(idProduct)
    if (!verifyProduct) {
        throw new Error("Not find this product.")
    }

    verifyProduct.available = false;

    await verifyProduct.save()

    return verifyProduct
}

const activeProduct = async (idProduct) => {
    ''
    const verifyProduct = await Products.findById(idProduct)
    if (!verifyProduct) {
        throw new Error("Not find this product.")
    }

    verifyProduct.available = true;

    await verifyProduct.save()

    return verifyProduct
}

const deleteProduct = async (idProduct) => {
    const verifyProduct = await Products.findById(idProduct)
    if (!verifyProduct) {
        throw new Error("Not found this product.")
    }

    const deleted = await Products.findByIdAndDelete(idProduct)
    if (!deleted) {
        throw new Error("Not is possible deleted this product.")
    }

    return deleted
}

const getSales = async () => {
    const allOrders = await Orders.find()
    if (!allOrders) {
        throw new Error("Not found orders.")
    }

    return allOrders
}

const image = async (data, productId) => {
    const { image } = data
    if (!image) {
        throw new Error("Not found image.")
    }

    const information = await Products.findByIdAndUpdate(productId, { image: image })
    if (!information) {
        throw new Error("Not is possible update the image.")
    }

    return image
}

export default {
    listAllUsers,
    relatory,
    listProducts,
    createProduct,
    updateProduct,
    desactiveProduct,
    activeProduct,
    deleteProduct,
    getSales,
    image
}