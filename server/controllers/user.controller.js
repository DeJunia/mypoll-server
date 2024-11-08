import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../middleware/error.js';

export const register = async (req, res, next) => {
  try {
    const { username, password, ghanaCard } = req.body;
    
    const existingUser = await User.findOne({ 
      $or: [{ username }, { ghanaCard }] 
    });
    
    if (existingUser) {
      return next(errorHandler(400, "Username or Ghana Card already exists"));
    }

    const newUser = new User({ username, password, ghanaCard });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) return next(errorHandler(404, "User not found"));
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return next(errorHandler(400, "Invalid password"));

    const token = jwt.sign(
      { id: user._id, hasVoted: user.hasVoted },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: pass, ...userInfo } = user._doc;
    
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }).status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { profilePic } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic },
      { new: true }
    );
    const { password, ...userInfo } = updatedUser._doc;
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie('access_token');
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
}; 