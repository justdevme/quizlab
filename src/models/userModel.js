import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import Joi from 'joi'
import { GET_DB } from './../config/mongodb.js'

const USER_COLLECTION_NAME = 'users'

const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string().email().required().trim(),
    username: Joi.string().required().min(3).max(30).trim(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid('user', 'admin').default('user'),
    is_active: Joi.boolean().default(true),
    createdAt: Joi.date().default(() => new Date())
})

const createUser = async (userData) => {
    const { error, value } = USER_COLLECTION_SCHEMA.validate(userData, { stripUnknown: true });
  
    if (error) {
      throw new Error(error.details[0].message); // báo lỗi nếu dữ liệu sai
    }
  
    const result = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(value);
    return { ...value, _id: result.insertedId };
  };
  


const findByEmail = async (email) => {
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ email });
  }

export const userModel = {
    createUser,
    findByEmail
}