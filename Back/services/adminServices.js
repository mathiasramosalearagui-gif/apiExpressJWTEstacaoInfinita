import User from "../models/User.js"

const listAllUsers = async () => {
    const users = await User.find()
    if (!users) {
        throw new Error("Dont found users.")
    }

    return users
}

export default {
    listAllUsers
}