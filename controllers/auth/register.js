const User = require("../../models/user");
const bcrypt = require('bcryptjs');


exports.register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  }  catch (e) { next(e); }
};