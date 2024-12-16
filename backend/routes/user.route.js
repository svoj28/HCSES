import express from 'express';
import { signupUser, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

export default router;
