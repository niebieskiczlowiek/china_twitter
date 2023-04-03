const Register = require('../models/user');
const jwt = require('jsonwebtoken');

const Adduser = async (req, res) => {
    const data = req.body;
    try {
        const user = await Register.create(data);
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400,
        });
        return res.status(200).json({ success: true, token });
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}
module.exports = {
    Adduser,
};
