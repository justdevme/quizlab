import axios from 'axios';

const API_BASE_URL = 'http://localhost:8017/v1/api/quizzes';

// Tạo quiz mới
export const createQuiz = async (quizData) => {
  const response = await axios.post(API_BASE_URL, quizData);
  return response.data; // Trả về { message, quizId }
};

// Lấy danh sách quiz (nếu sau này dùng)
export const getQuizzes = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Lấy chi tiết quiz theo ID
export const getQuizById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Xoá quiz
export const deleteQuiz = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
