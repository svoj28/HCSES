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
adminSchema.statics.signup = async function (email, password, role = 'admin') {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error('Email already in use');
  }

  const admin = await this.create({ email, password, role });

  return admin;
};

// Static method to login admin
adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error('Invalid credentials');
  }

  return admin;
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
