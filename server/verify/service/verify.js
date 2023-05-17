const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const VerifyUser = async (req, res) => { 
    const { token, verified } = req.params;


    try {
        const decoded = jwt.verify(token, 'my_secret_key');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.verified = verified === 'true';
        await user.save();

        return res.status(200).json({ success: true, message: "User has been successfully verified" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = VerifyUser;