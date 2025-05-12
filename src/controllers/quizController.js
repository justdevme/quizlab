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
    } catch (err) {
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
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const searchQuizzes = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const results = await quizService.searchByTitle(keyword);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateQuiz = async (req, res) => {
  try {
    const quizId  = req.params.quizId
    const updatedData = req.body
    const result = await quizService.updateQuiz(quizId, updatedData)
    res.status(200).json(result)
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}

const deleteQuizById = async (req, res) => {
  try {
    console.log('params:', req.params); 
    const { quizId } = req.params
    const deletedCount = await quizService.deleteQuizById(quizId)
    console.log('Deleting quiz with ID:', quizId);
    
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

export const quizController = {
    createQuiz,
    getAll,
    getQuizById,
    getQuestionsOfQuiz,
    searchQuizzes,
    updateQuiz,
    deleteQuizById
}