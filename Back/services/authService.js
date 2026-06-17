import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (data) => {
    const { name, email, password, cpf, telephone, years, role, active } = data;

    if (!name || !email || !password || !cpf || !telephone || !years) {
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
            telephone,
            years,
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
        years: user.years,
        role: user.role,
        active: user.active
    }
}