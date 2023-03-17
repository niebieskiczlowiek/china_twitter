const User = require("../../models/login")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ 'email': data.email });

        if (!user) return res.status(200).json({ success: false });

        if (data.password === user.password && user.admin) {
            const token = jwt.sign({ email: user.email }, 'admin4123');

            return res.status(200).json({ success: true, token });
        } else {
            return res.status(200).json({ success: false });
        } 

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false });   
    }
};

module.exports = {
    login,
};