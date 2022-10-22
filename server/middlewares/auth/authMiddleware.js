const jwt = require("jsonwebtoken");


const protect = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token");
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = protect;