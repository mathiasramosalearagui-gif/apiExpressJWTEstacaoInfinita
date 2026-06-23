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

export default {
    listAllUsers,
    relatory
}