import { authService } from "../services/authService.js"

const register = async (req, res) => {
    //console.log('BODY RECEIVED:', req.body);
    try {
      const result = await authService.register(req.body);
      
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  export const authController = {
    register,
    login
  }