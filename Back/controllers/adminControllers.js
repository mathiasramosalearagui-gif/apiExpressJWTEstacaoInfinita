import adminServices from "../services/adminServices.js";

const listAllUsers = async (req, res, next) => {
    try {
        const information = await adminServices.listAllUsers()
        res.json({
            message: "All users:",
            information
        })
    } catch (error) {
        next(error)
    }
}

const relatory = async (req, res, next) => {
    try {
        const information = await adminServices.relatory()
        res.json(
            {
                message: "The relatory",
                information
            }
        )
    } catch (error) {
        next(error)
    }
}

const listProducts = async (req, res, next) => {
    try {
        const products = await adminServices.listProducts()
        res.json(
            {
                message: "The products:",
                products
            }
        )
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const product = await adminServices.createProduct(req.body)
        res.json({
            message: "Product created successfully:",
            product
        })
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const information = await adminServices.updateProduct(req.params.product, req.body)
        res.json(
            {
                message: "Product updated successfully:",
                information
            }
        )
    } catch (error) {
        next(error)
    }
}

export default {
    listAllUsers,
    relatory,
    listProducts,
    createProduct,
    updateProduct
}