import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'for_approval'
    }
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Static method to signup admin

//this is for what will be the data to the database
adminSchema.statics.signup = async function (email, password, role = 'for_approval') {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error('Email already in use');
  }

  // Create new admin with default role as 'admin'
  const admin = await this.create({ email, password, role });

  return admin;
};

const adminAccAppr = mongoose.model('AdminAccAppr', adminSchema);

export default adminAccAppr;