import { questionModel } from "../models/questionModel.js"
import { StatusCodes } from "http-status-codes"


const createNew = async (reqBody) => {
    try {
      const newQuestion = {
        ...reqBody
      }
      // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
      const createdQuestion = await questionModel.createNew(newQuestion)
      //console.log(createdBoard)
  
      // Lấy bản ghi board sau khi gọi
     
      //console.log(getNewBoard)
  
      // Làm thêm các xử lý logic khác với các Collection khác với tùy đặc thù dự án
      // Bắn email, noti về cho admin khi có 1 cái Board mới được tạo
      return createdQuestion
    } catch (error) {
      throw error
    }
}
export const questionService = {
    createNew
}