const User = require("../../models/user")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ 'email': data.email });

        if (!user) return res.status(200).json({ success: false });

        const userInfo = {
            email: user.email,
            username: user.username,
            fullName: user.fullName
        }
        const username = user.username;
        const fullName = user.fullName;

        console.log(username, fullName)

        if (data.password === user.password) {
            const token = jwt.sign({ email: userInfo.email }, "token", { expiresIn: "1h" });
            
            return res.status(200).json({ success: true, token, username, fullName});
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