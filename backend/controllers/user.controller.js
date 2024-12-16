import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';

// Create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create token
    const token = createToken(user._id);

    // Send back the full user object along with the token
    res.status(200).json({
      success: true,
      data: {
        message: "Logged in successfully",
        token: token
      },
      user: {
        _id: user._id,
        email: user.email,
        name: user.name 
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
