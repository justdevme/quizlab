import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '../config/mongodb.js'

const RESULT_COLLECTION_NAME = 'results'

const RESULT_COLLECTION_SCHEMA = Joi.object({
    quizId: Joi.string().required(),
    quizTitle: Joi.string().required().min(3).trim(),

    totalQuestions: Joi.number().required().min(1),
    correctCount: Joi.number().required().min(0),
    wrongCount: Joi.number().required().min(0),
    score: Joi.number().required().min(0),  
    maxScore: Joi.number().required().min(1),
    duration: Joi.number(),
    createdAt: Joi.date(),

    userAnswers: Joi.object().pattern(Joi.string(), Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
        Joi.allow(null)
    )).required(),

    detailedResults: Joi.array().items(
        Joi.object({
          questionId: Joi.any().required(),
          questionText: Joi.string().required(),
          options: Joi.array().items(Joi.string()).required(),
          correctAnswer: Joi.alternatives().try(
            Joi.string(),
            Joi.array().items(Joi.string())
          ).required(),
          userAnswer: Joi.alternatives().try(
            Joi.string(),
            Joi.array().items(Joi.string()),
            Joi.valid(null)
          ).required(),
          isCorrect: Joi.boolean().required()
        })
      ).required()
})


const insertResult = async (resultData) => {
    const validation = RESULT_COLLECTION_SCHEMA.validate(resultData);
    if (validation.error) throw new Error(validation.error.details[0].message);
    const result = await GET_DB().collection(RESULT_COLLECTION_NAME).insertOne({
      ...resultData,
      quizId: new ObjectId(resultData.quizId)
    });
  
    return { ...resultData, _id: result.insertedId };
  };
  
  const findById = async (resultId) => {
    return await GET_DB().collection(RESULT_COLLECTION_NAME).findOne({ _id: new ObjectId(resultId) });
  };

export const resultModel = {
    insertResult,
    findById
}