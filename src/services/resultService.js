import { resultModel } from "../models/resultModel.js"
import { quizModel } from "../models/quizModel.js"
import { questionModel } from "../models/questionModel.js"
import { ObjectId } from "mongodb"

const evaluateAndSaveResult = async (quizId, userAnswers, duration) => {
    const quiz = await quizModel.findByIdWithQuestions(new ObjectId(quizId))
    if (!quiz) throw new Error('Quiz not found')
    
    const questions = quiz.questions || []

    let score = 0
    let correctCount = 0
    let totalScore = 0
    const detailedResults = []
    
    questions.forEach(q => {
        const correct = q.correctAnswer
        const userAnswer = userAnswers[q._id?.toString()]
        const points = q.points || 1
        totalScore += points

        const isCorrect = userAnswer === correct

        if(isCorrect) {
            score += points
            correctCount++
        }

        detailedResults.push({
            questionId: q._id,
            questionText: q.question,
            options: q.options,
            correctAnswer: correct,
            userAnswer: userAnswer ?? null,
            isCorrect
        })      
    })
    const totalQuestions = questions.length;
    const wrongCount = totalQuestions - correctCount;

    const resultData = {
        quizId,
        quizTitle: quiz.title,
        totalQuestions,
        correctCount,
        wrongCount,
        score,
        maxScore: totalScore,
        duration,
        createdAt: new Date(),
        detailedResults,
        userAnswers
    };
    return await resultModel.insertResult(resultData);
}

const getResultById = async (resultId) => {
    return await resultModel.findById(new ObjectId(resultId))
}

export const resultService = {
    evaluateAndSaveResult,
    getResultById

}