import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (data) => {
    const { name, email, password, cpf, address, telephone, age, role, active } = data;

    if (!name || !email || !password || !cpf || !address || !telephone || !age) {
        throw new Error("Name, email, password, cpf, telephone, years or active are required.");
    }

    const userExists = await User.findOne({ email: email })
    if (userExists) {
        throw new Error("User already exists.");
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create(
        {
            name,
            email,
            password: hashPassword,
            cpf,
            address,
            telephone,
            age,
            role: role || "user",
            active
        }
    )

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        telephone: user.telephone,
        age: user.age,
        role: user.role,
        active: user.active
    }
}

const login = async (data) => {
    const { email, password } = data;
    if (!email) {
        throw new Error("The email address is required.")
    }
    if (!password) {
        throw new Error("The email address and password are required.")
    }

    const user = await User.findOne({ email: email }).select("+password")
    if (!user) {
        throw new Error("User dont find.")
    }
    if (!user.active) {
        throw new Error("The user is unactive. Into on contact with team of store.")
    }

    const verify = await bcrypt.compare(password, user.password)
    if (!verify) {
        throw new Error("The email address or password are incorrect.")
    }

    const token = await jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expireIn: "1d"
        }
    )

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            telephone: user.telephone,
            address: user.address,
            cpf: user.cpf,
            age: user.age
        },
        token
    }
}

export default {
    register,
    login
}