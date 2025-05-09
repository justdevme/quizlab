
import Joi from "joi"
import { GET_DB } from "../config/mongodb.js"
import { ObjectId } from "mongodb"

const QUESTION_COLLECTION_NAME = 'questions'
const QUESTION_COLLECTION_SCHEMA = Joi.object({
  quizId: Joi.string().required(),
  question: Joi.string().required(),
  options: Joi.array().items(Joi.string().required()),
  correctAnswer: Joi.string().required()
})

/*const validateBeforeCreate = async (data) => {
  return await QUESTION_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}*/

const createNew = async (data) => {
  try {
    if (!ObjectId.isValid(data.quizId)) {
      throw new Error('Invalid quizId: must be a 24-character hex string');
    }
    const newQuestion = {
      ...data,
      quizId: new ObjectId(data.quizId),
      createdAt: new Date()
    }
    const createdQuestion = await GET_DB().collection(QUESTION_COLLECTION_NAME).insertOne(newQuestion)
    return createdQuestion.insertedId
  } catch (error) {
    throw new Error(error)
  }
}

export const questionModel = {
  QUESTION_COLLECTION_NAME,
  QUESTION_COLLECTION_SCHEMA,
  createNew
}