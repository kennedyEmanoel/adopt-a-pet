const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserController {
  static async register(req, res) {
    const {
      name, email, phone, password, confirmPassword,
    } = req.body;

    // Validations

    if (!name) {
      res.status(422).json({
        error: 'O nome é obrigatório',
      });
    }

    if (!email) {
      res.status(422).json({
        error: 'O email é obrigatório',
      });
    }

    if (!phone) {
      res.status(422).json({
        error: 'O telefone é obrigatório',
      });
    }

    if (!password) {
      res.status(422).json({
        error: 'A senha é obrigatório',
      });
    }

    if (!confirmPassword) {
      res.status(422).json({
        error: 'A confirmação de senha é obrigatório',
      });
    }

    if (password !== confirmPassword) {
      res.status(422).json({
        error: 'A senha e a confirmação de senha precisam ser iguais!',
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(422).json({
        error: 'Por favor, utilize outro e-mail!',
      });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      res.status(201).json({
        message: 'Usuário criado',
        newUser,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
