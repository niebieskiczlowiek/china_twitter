const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Adduser = async (req, res) => {
  const data = req.body;
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User with this email already exists' });
    }

    const newUser = await User.create(data);
    const token = jwt.sign({ id: newUser._id }, 'my_secret_key', {
      expiresIn: 3600,
    });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jan.wieprz1@gmail.com',
        pass: 'yHK527NkmNydv4C',
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

    return res.status(201).json({ success: true, user: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
    Adduser,
};
