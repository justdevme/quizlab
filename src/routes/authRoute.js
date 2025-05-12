import express from 'express'
import { authController } from '../controllers/authController.js'

const Router = express.Router()

Router.route('/register')
    .post(authController.register)

Router.route('/login')
    .post(authController.login)

export const authRoute = Router