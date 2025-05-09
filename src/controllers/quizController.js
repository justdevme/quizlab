import { quizService } from '../services/quizService.js';

const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const quizId = await quizService.createQuizWithQuestions({ title, description }, questions);
    res.status(201).json({ message: 'Quiz created', quizId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
    try {
      const quizzes = await quizService.getAllQuizzes();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getQuizById = async (req, res) => {
    try {
        const quizId = req.params.quizId
        const quiz = await quizService.getQuizById(quizId)
        res.status(200).json(quiz)
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}

const getQuestionsOfQuiz = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await quizService.getQuestionsOfQuiz(quizId);
        if (!quiz) {
          return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

export const quizController = {
    createQuiz,
    getAll,
    getQuizById,
    getQuestionsOfQuiz
}