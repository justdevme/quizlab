import { StatusCodes } from "http-status-codes";
import { questionService } from "../services/questionService.js"

const createNew = async (req, res, next) => {
    try {
      // Điều hướng dữ liệu -> Service
      const createdQuestion = await questionService.createNew(req.body)        
      // Có kết quả thì trả về phía Client
      res.status(StatusCodes.CREATED).json(createdQuestion)
    } catch (error) { next(error) }
}

export const questionController = {
    createNew
}