const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const VerifyUser = async (req, res) => { 
    const { token, verify } = req.body;

    try {
        const decoded = jwt.verify(token, 'my_secret_key');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.verify = true;
        await user.save();

        return res.status(200).json({ success: true, message: "User has been successfully verified" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    VerifyUser,
}