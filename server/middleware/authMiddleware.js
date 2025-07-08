const checkValidDataRegister = (req, res, next) => {
    const { name, email, password } = req?.body;

    if (!name || !email || !password) return res.status(400).json({
        status: 400,
        data: {},
        msg: "missing required fields",
        error: "all fields are required",
    })

    next();
}

const checkValidDataLogin = (req, res, next) => {
    const { email, password } = req?.body;

    if (!email || !password) return res.status(400).json({
        status: 400,
        data: {},
        msg: "missing required fields",
        error: "Email and password are required"
    })
    next();

}

module.exports = {
    checkValidDataRegister,
    checkValidDataLogin
}