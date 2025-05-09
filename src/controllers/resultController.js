import { resultService } from "../services/resultService.js";

const submitQuiz = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      const { userAnswers, duration } = req.body;
  
      if (!userAnswers || typeof duration !== 'number') {
        return res.status(400).json({ message: 'answers and duration are required' });
      }
  
      const result = await resultService.evaluateAndSaveResult(quizId, userAnswers, duration);
      res.status(200).json({ resultId: result._id });
    } catch (err) {
      console.error('Submit quiz error:', err);
      res.status(500).json({ message: err.message });
    }
}

const getResultById = async (req, res) => {
    try {
      const resultId = req.params.resultId;
      const result = await resultService.getResultById(resultId);
  
      if (!result) return res.status(404).json({ message: 'Result not found' });
  
      res.json(result);
    } catch (err) {
      console.error('Get result error:', err);
      res.status(500).json({ message: err.message });
    }
  };

export const resultController = {
    submitQuiz,
    getResultById
}