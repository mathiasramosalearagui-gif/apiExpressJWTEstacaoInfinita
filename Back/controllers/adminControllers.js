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

export default {
    listAllUsers
}