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

const searchByTitle = async (keyword) => {
    return await quizModel.findByTitle(keyword);
}

const updateQuiz = async (quizId, updatedData) => {
    return await quizModel.update(quizId, updatedData)
}

const deleteQuizById = async (quizId) => {
    return await quizModel.deleteQuizById(quizId)
}

const getMostParticipatedQuizzes = async () => {
    return await quizModel.find()
      .sort({ participants: -1, createdAt: -1 })
      .limit(5)
      .toArray();
  };
  
const incrementQuizParticipants = async (quizId) => {
    return await quizModel.incrementParticipants(quizId)
  };

export const quizService = {
    createQuizWithQuestions,
    getAllQuizzes,
    getQuizById,
    getQuestionsOfQuiz,
    searchByTitle,
    updateQuiz,
    deleteQuizById,
    getMostParticipatedQuizzes,
    incrementQuizParticipants
}