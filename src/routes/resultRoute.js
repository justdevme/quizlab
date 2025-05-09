import express from 'express'
import { resultController } from '../controllers/resultController.js'

const Router = express.Router()

Router.route('/:quizId/submit')
    .post(resultController.submitQuiz)
Router.route('/:resultId')
    .get(resultController.getResultById)

export const resultRoute = Router