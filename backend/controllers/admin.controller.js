import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';

// Create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Admin login
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.login(email, password);
  
      // Create token
      const token = createToken(admin._id);
  
      // Send back token and user data
      res.status(200).json({
        success: true,
        data: {
          message: "Logged in successfully",
          token: token
        },
        admin: {
          _id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Admin signup
export const signupAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const admin = await Admin.signup(email, password);
      const token = createToken(admin._id);
  
      res.status(200).json({
        email,
        token,
        admin: {
          _id: admin._id,
          email: admin.email,
          role: admin.role, 
        },
      });
    } catch (error) {
      console.error('Error during admin signup:', error);
      res.status(500).json({ error: error.message });
    }
  };
