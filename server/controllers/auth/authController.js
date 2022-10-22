

const register = async (req, res) => {
    console.log('register')
    res.status(200).send("Registering user...");
}

const login = async (req, res) => {
    res.status(200).send("Logging in user...");
}

const logout = async (req, res) => {
    res.status(200).send("Logging out user...");
}

module.exports = {
    register,
    login,
    logout
}