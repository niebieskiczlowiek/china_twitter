const Register = require('../../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Adduser = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const user = await Register.create(data);
        const token = jwt.sign({ id: user._id }, 'my_secret_key', {
            expiresIn: 3600, // wartość w sekundach
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'johnpork@op.pl',
                pass: 'Johnporkiiscalling',
            },
        });
        const mailOptions = {
            from: '',
            to: data.email,
            subject: 'Potwierdzenie rejestracji',
            text: `Witaj ${data.username}! Dziękujemy za rejestrację w naszym serwisie. Aby potwierdzić rejestrację kliknij w poniższy link: http://localhost:3000/confirm/${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
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
