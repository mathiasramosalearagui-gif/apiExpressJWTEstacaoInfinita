import User from "../models/User.js";
import Orders from "../models/Orders.js";

const updateMe = async (userId, data) => {
    delete data.role;
    delete data.active;
    delete data.password;
    delete data.cart

    if (data.email) {
        const emailExists = await User.findOne({
            email: data.email,
            _id: { $ne: userId }
        })

        if (emailExists) {
            throw new Error("There is already a user with this email.")
        }
    }


    const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true
    })

    if (!user) {
        throw new Error("User not found.")

    }

    const { name, email, cpf, telephone, age, address, } = data;

    if (!name || !email || !cpf || !telephone || !age || !address) {
        const error = new Error("Name, email, cpf, telephone, years or active are required.");
        error.statusCode = 400;
        throw error;
    }

    const emailExists = await User.findOne(
        {
            email,
            _id: { $ne: userId }
        }
    )
    if (emailExists) {
        const error = new Error("A user with this email address already exists.");
        error.statusCode = 400;
        throw error;
    }

       const cpfExists = await User.findOne(
        {
            cpf,
            _id: { $ne: userId }
        }
    )
    if (cpfExists) {
        const error = new Error("A user with this cpf already exists.");
        error.statusCode = 400;
        throw error;
    }

       const ageExists = await User.findOne(
        {
            age,
            _id: { $ne: userId }
        }
    )
    if (ageExists) {
        const error = new Error("A user with this age already exists.");
        error.statusCode = 400;
        throw error;
    }

    const nameExists = await User.findOne(
        {
            name,
            _id: { $ne: userId }
        }
    )
    if (nameExists) {
        const error = new Error("A user with this name already exists.");
        error.statusCode = 400;
        throw error;
    }

    const telephoneExists = await User.findOne(
        {
            telephone,
            _id: { $ne: userId }
        }
    )
    if (telephoneExists) {
        const error = new Error("A user with this telephone already exists.");
        error.statusCode = 400;
        throw error;
    }

    const addressExists = await User.findOne(
        {
            address,
            _id: { $ne: userId }
        }
    )
    if (addressExists) {
        const error = new Error("A user with this telephone already exists.");
        error.statusCode = 400;
        throw error;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data)

    return updatedUser;
}

const historyMe = async (userId) => {
     const user = await User.findById(userId)
    if (!user) {
        const error = new Error("User dont find.")
        error.statusCode = 404
        throw error;
    }

    const historyUser = await Orders.find({ userId: userId })
    if (!historyUser) {
        const error = new Error("History not found.")
        error.statusCode = 404;
        throw error;
    }

    return historyUser;
}


export default {
    updateMe,
    historyMe
}
