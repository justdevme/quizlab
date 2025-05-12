import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { questionModel } from './questionModel.js'
import { GET_DB } from '../config/mongodb.js'


const QUIZ_COLLECTION_NAME = 'quizzes'
const QUIZ_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim(),
    description: Joi.string().required().min(3).max(50).trim(), 
    participants: Joi.number().integer().min(0).default(0),
    totalQuestions: Joi.number()
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

const findByTitle = async (keyword) => {
  const db = GET_DB();
  return await db.collection(QUIZ_COLLECTION_NAME)
    .find({ title: { $regex: keyword, $options: 'i' } }) // tìm không phân biệt hoa thường
    .toArray();
};

const update = async (quizId, data) => {
  if (!ObjectId.isValid(quizId)) {
    throw new Error('Invalid quiz ID');
  }
  const result = await GET_DB().collection(QUIZ_COLLECTION_NAME).findOneAndUpdate(
    {_id: new ObjectId(quizId)},
    { $set: data },
    { returnDocument: 'after'}
  )
  
  return result.value
}

const deleteQuizById = async (quizId) => {
  const result = await GET_DB().collection(QUIZ_COLLECTION_NAME).deleteOne({_id: new ObjectId(quizId)})
  return result.deletedCount
}

const incrementParticipants = async (quizId) => {
  if (!ObjectId.isValid(quizId)) {
    throw new Error('Invalid quiz ID');
  }

  const result = await GET_DB().collection(QUIZ_COLLECTION_NAME).updateOne(
    { _id: new ObjectId(quizId) },
    { $inc: { participants: 1 } }
  );

  return result.modifiedCount;
};

export const quizModel = {
    QUIZ_COLLECTION_NAME,
    QUIZ_COLLECTION_SCHEMA, 
    createNew,
    findAll,
    findById,
    findByIdWithQuestions,
    findByTitle,
    update,
    deleteQuizById,
    incrementParticipants
}

