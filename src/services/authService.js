import { HASH } from "../utils/hash.js"
import { JWT } from "../utils/jwt.js"
import { userModel } from "../models/userModel.js"

const register = async (userData) => {
    const existing = await userModel.findByEmail(userData.email);
    if (existing) throw new Error('Email already registered');
  
    const hashedPassword = await HASH.hashPassword(userData.password);
    const newUser = {
      email: userData.email,
      password: hashedPassword,
      username: userData.username,
      createdAt: new Date(),
    };
  
    await userModel.createUser(newUser);
    return { message: 'Registration successful' };
  };
  
  const login = async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) throw new Error('User not found');
  
    const valid = await HASH.comparePassword(password, user.password);
    if (!valid) throw new Error('Invalid credentials');
  
    const token = JWT.generateToken({ userId: user._id, email: user.email });
    return { token, name: user.username };
  };

  export const authService = {
    register,
    login
  }