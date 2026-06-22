import productServices from "../services/productServices.js";

const featureProducts = async (req, res, next) => {
    try {
        const products = await productServices.featureProducts()
        res.json(
            { 
                message: "The main products:",
                products
            }
        )
    } catch (error) {
        next(error)
    }
}

export default {
    featureProducts
}