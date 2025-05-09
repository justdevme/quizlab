import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment.js'

// Khởi tạo đối tượng đầu tiên vì chưa connect
let quizDatabaseInstance = null 

// Khởi tạo mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI)

// Kết nối tới DB
export const CONNECT_DB = async () => {
    await mongoClientInstance.connect()
    // Kết nối thành công thì lấy ra DB theo tên trong file env
    quizDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Nhiệm vụ: export ra Quiz Database Instance sau khi đã connect thành công tới MongoDB để sử dụng nhiều nơi khác nhau trong code
// Không async()
export const GET_DB = () => {
    if(!quizDatabaseInstance) throw new Error('Must connect to Database first')
    return quizDatabaseInstance
}

// Đóng kết nối tới DB khi cần
export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}
