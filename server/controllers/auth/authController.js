const User = require("../../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400).json({ message: "Please enter all fields..."});
    }

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username, email, password: hashedPassword
    })

    if(user){
        res.status(201).json({ message: "User registered", user})
    } else {
        res.status(400).json({ message: "Invalid user data"})
    }
}

const login = async (req, res) => {
    
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({ message: "Please enter all fields..." });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))){

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.SECRET, { expiresIn: '30d' });

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        res.status(200).json({ message: "Success", user })
    } else {
        res.status(400).json({ message: "Invalid credentials" })
    }
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out" })
}

module.exports = {
    register,
    login,
    logout
}