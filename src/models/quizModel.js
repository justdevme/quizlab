import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { questionModel } from './questionModel.js'
import { GET_DB } from '../config/mongodb.js'

const QUIZ_COLLECTION_NAME = 'quizzes'
const QUIZ_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim(),
    description: Joi.string().required().min(3).max(50).trim(),     
})

const createNew = async (data) => {
    try {
        const createdQuiz = await GET_DB().collection(QUIZ_COLLECTION_NAME).insertOne(data)
        return createdQuiz.insertedId
    } catch (error) {
        throw new Error(error)
    }    
}

const findAll = async () => {
    return await GET_DB().collection(QUIZ_COLLECTION_NAME).find().toArray();
  };

const findById = async(id) => {
    return await GET_DB().collection(QUIZ_COLLECTION_NAME).findOne({_id: new ObjectId(id)})
}

const findByIdWithQuestions = async (quizId) => {
    const db = GET_DB();
    const result = await db.collection(QUIZ_COLLECTION_NAME).aggregate([
    {
      $match: { _id: new ObjectId(quizId) }
    },
    {
      $lookup: {
        from: 'questions',
        localField: '_id',       // khóa từ quiz
        foreignField: 'quizId',  // khóa từ question
        as: 'questions'
      }
    },
    {
      $project: {
        title: 1,
        timeLimit: 1,
        questions: 1
      }
    }
  ]).toArray();

  return result[0]; // Vì a
}

export const quizModel = {
    QUIZ_COLLECTION_NAME,
    QUIZ_COLLECTION_SCHEMA, 
    createNew,
    findAll,
    findById,
    findByIdWithQuestions
}

