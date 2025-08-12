
const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin:', err);
  }
}

module.exports = seedAdmin;
