import Admin from '../models/adminAccAppr.model.js';  // Correct model import
import jwt from 'jsonwebtoken';

// Create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
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

// Fetch Accounts
export const getAcc = async (req, res) => {
  try {
    const accounts = await Admin.find({});
    if (accounts.length === 0) {
      return res.status(204).json({ success: true, data: [] });
    }
    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    console.error('Error in fetching Accounts:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete Account
export const deleteAcc = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Admin.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.status(200).json({ success: true, message: 'Account Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
