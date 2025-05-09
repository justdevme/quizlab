import express from 'express';
import { quizController } from '../controllers/quizController.js';

const Router = express.Router()

Router.route('/')
    .post(quizController.createQuiz)
    .get(quizController.getAll)
    
Router.route('/:quizId')
    .get(quizController.getQuizById)

Router.route('/:quizId/questions')
    .get(quizController.getQuestionsOfQuiz)
export const quizRoute = Router
