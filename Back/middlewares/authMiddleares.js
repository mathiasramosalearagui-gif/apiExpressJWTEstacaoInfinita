import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        console.log(authorization)
        if (!authorization) {
            throw res.status(401).json({ message: "The token is required."})
        }

        const parts = authorization.split(" ");
        if (parts.length !== 2) {
            throw res.status(401).json({ message: "The token is incorreted."})
        }

        const [scheme, token] = parts;
        if (scheme !== "Bearer") {
            throw res.status(401).json({ mesage: "The token is not correct."})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded._id);
        if (!user) {
            throw res.status(401).json({ message: "User dont find." })
        }

        if (!user.active) {
            throw res.status(401).json({ message: "This user is unactive. Please into contact with the team."})
        }

        req.user = user;

        next()

    } catch (error) {
        next(error)
    }
}

export default authenticate