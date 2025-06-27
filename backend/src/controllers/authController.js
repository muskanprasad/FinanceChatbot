const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (id) => {
  console.log('Generating JWT token');
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '1h'
  });
};

//Register User Function
async function registerUser(req, res) {
  console.log('Register request received:', req.body);
  const { username, email, password } = req.body;

  //Validation
  if (!username || !email || !password) {
    console.warn('Missing fields in registration');
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    //Checks if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.warn('Registration attempt with existing email:', email);
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    user = await User.findOne({ username });
    if (user) {
      console.warn('Registration attempt with existing username:', username);
      return res.status(400).json({ message: 'Username already taken' });
    }

    //Creates new user
    user = new User({ username, email, password });
    await user.save();
    console.log('New user registered:', user.email);

    //Generates token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Please fill the details properly, check if you have entered the credentials right?',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
}

//Login User Function
async function loginUser(req, res) {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.warn('Missing credentials in login');
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      console.warn('Login attempt for non-existent user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.warn('Invalid password attempt for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    console.log('Successful login for user:', user.email);

    res.json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
}

module.exports = {
  registerUser,
  loginUser
};