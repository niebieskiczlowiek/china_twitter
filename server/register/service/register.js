const Register = require('../../models/user');
const jwt = require('jsonwebtoken');

const Adduser = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const user = await Register.create(data);
        const token = jwt.sign({ id: user._id }, 'my_secret_key', {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
};

module.exports = {
    Adduser,
};
