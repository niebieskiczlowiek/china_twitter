const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const password = require('./passwd.json');

const Adduser = async (req, res) => {
  const data = req.body;
  try {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return res.status(200).json({ success: false, message: 'Email already in use' });
    }

    // Dodajemy wartość początkową pola "verified"
    data.verified = false;

    const newUser = await User.create(data);

    // Generujemy token JWT zawierający id użytkownika i wartość pola "verified"
    const token = jwt.sign({ id: newUser._id, verified: newUser.verified }, 'my_secret_key', {
      expiresIn: 3600,
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        // user: 'u17_oliber_waw@technischools.com',
        user: 'u19_adaczy_waw@technischools.com',
        pass: password.password,
      }
    });
    
    // Do linku weryfikacyjnego dodajemy wartość pola "verified"
    const mailOptions = {
      from: '',
      to: data.email,
      subject: 'Potwierdzenie rejestracji',
      text: `Witaj ${data.username}! Dziękujemy za -rejestrację w naszym serwisie. Aby potwierdzić rejestrację kliknij w poniższy link: http://localhost:3000/confirm/${token}/`,
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

const ConfirmUser = async (req, res) => {
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

  
  module.exports = {
  Adduser,
  ConfirmUser,
  };