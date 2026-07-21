import User from "../models/User.js";
import Orders from "../models/Orders.js";
import Products from "../models/Products.js";
import bcrypt from "bcryptjs";
import couponServices from "./couponServices.js";
import { criarPreferenciaPagamento } from "./paymentServices.js"

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

const cartMe = async (user, product) => {
    const userIdExists = await User.findById(user._id)
    if (!userIdExists) {
        const error = new Error("user not found.")
        error.statusCode = 404;
        throw error;
    }

    const idProductExists = await Products.findById(product)
    if (!idProductExists) {
        const error = new Error("product not found.")
        error.statusCode = 404;
        throw error;
    }


    for (let i = 0; i <= user.cart.length; i++) {
        if (!user.cart[i]) {
            user.cart[i] = {
                id: product,
                nameOfProduct: idProductExists.nameOfProduct,
                amount: 1
            }
            await user.save()
            break
        } else if (user.cart[i].id == product) {
            user.cart[i].amount = user.cart[i].amount + 1
            user.markModified("cart")
            await user.save()
            break
        }
    }

    await user.save()

    return user

}

const meCart = async (userId) => {
    const user = await User.findById(userId)
    if (!user) {
        const error = new Error("User dont find.")
        error.statusCode = 404
        throw error;
    }

    const product = user.cart

    return product;
}

const removeProduct = async (userId, product) => {
    const user = await User.findById(userId)
    if (!user) {
        const error = new Error("User dont find.")
        error.statusCode = 404
        throw error;
    }

    for (let i = 0; i < user.cart.length; i++) {
        if (!user.cart[i]) {
            continue
        } else if (user.cart[i].id === product) {
            if (user.cart[i].amount > 1) {
                user.cart[i].amount = user.cart[i].amount - 1
            } else {
                delete user.cart[i]
            }
            user.markModified("cart")
            await user.save()
            break
        }
    }

    return user
}

const sale = async (userId, productId, data) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error("User dont find")
    }

    let verifyProduct = false;
    for (let i = 0; i < user.cart.length; i++) {
        if (!user.cart[i]) {
            continue
        } else if (user.cart[i].id === productId) {
            if (user.cart[i].amount > 1) {
                user.cart[i].amount = user.cart[i].amount - 1
            } else {
                delete user.cart[i]
            }
            verifyProduct = true
            user.markModified("cart")
            await user.save()
            break

        }
    }

    const { paymentMethod, coupon } = data

    const product = await Products.findById(productId)
    if (!product) {
        throw new Error("The data this product not found")
    }

    let totalValue = product.priceOfProduct

    if (coupon) {
        totalValue = await couponServices.verifyAndAplicateCoupon(coupon, product.priceOfProduct)
    }
    console.log(totalValue)

    product.amount--
    await product.save()

    const order = await Orders.create(
        {
            status: "Completed",
            paymentMethod: paymentMethod,
            idUser: userId, product,
            totalQuantity: product.amount,
            totalPrice: totalValue,
            products: product
        }
    )

    const itenForPagament = [
        {
            id: product._id.toString(),
            nome: product.nameOfProduct,
            quantidade: 1,
            preco: totalValue
        }
    ]

    const idMercadoPago = await criarPreferenciaPagamento(itenForPagament)

    return {
        order,
        message: "Success!",
        idMercadoPago
    }
}

const newPassword = async (user, data) => {
    const verifyUser = await User.findById(user._id)
    if (!verifyUser) {
        throw new Error("User not find.")
    }

    const { password } = data
    const newPassword = await bcrypt.hash(password, 10)
    if (!newPassword) {
        throw new Error("Not is possible update the password.")
    }

    const newUser = await User.findByIdAndUpdate(user._id, { password: newPassword })

    return newUser
}

export default {
    updateMe,
    historyMe,
    cartMe,
    meCart,
    removeProduct,
    sale,
    newPassword
}
