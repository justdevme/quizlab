import { quizModel } from "../models/quizModel.js"
import { questionModel } from "../models/questionModel.js"

const createQuizWithQuestions = async (quizData, questions) => {
    const quizId = await quizModel.createNew(quizData)

    for (const q of questions) {
        await questionModel.createNew({...q, quizId: quizId.toString()})
    }
    return quizId
}

const getAllQuizzes = async () => {
    const quizzes = await quizModel.findAll();
    return quizzes;
  };

const getQuizById = async (quizId) => {
    const quiz = await quizModel.findById(quizId)
    if (!quiz) {
        throw new Error('Quiz not found');
      }
    return quiz
}

const getQuestionsOfQuiz = async (quizId) => {
    const quiz = await quizModel.findByIdWithQuestions(quizId)
    if (!quiz) {
        throw new Error('Quiz not found');
      }
      return quiz;
}

export const quizService = {
    createQuizWithQuestions,
    getAllQuizzes,
    getQuizById,
    getQuestionsOfQuiz
}