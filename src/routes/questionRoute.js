import express from 'express'
import { questionController } from '../controllers/questionController.js'
import { StatusCodes } from 'http-status-codes'
import { quizController } from '../controllers/quizController.js'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get list questions'})
  })
  .post(questionController.createNew)



export const questionRoute = Router