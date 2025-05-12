import express from 'express';
import { quizController } from '../controllers/quizController.js';

const Router = express.Router()

Router.route('/search')
    .get(quizController.searchQuizzes)

Router.route('/:quizId/questions')
    .get(quizController.getQuestionsOfQuiz)

Router.route('/')
    .post(quizController.createQuiz)
    .get(quizController.getAll)

Router.route('/:quizId')
    .get(quizController.getQuizById)
    .put(quizController.updateQuiz)
    .delete(quizController.deleteQuizById)


export const quizRoute = Router
