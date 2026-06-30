const adminMiddlewares = async (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json(
            {
                error: "Sorry, this router is only admins"
            }
        )
    }

    next()
}

export default adminMiddlewares