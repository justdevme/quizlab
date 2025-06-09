import axios from 'axios';

export const generateQuestions = async (topic, amount = 5, type = 'mcq') => {
  const res = await axios.post('http://localhost:8017/v1/gpt/generate', {
    topic,
    amount,
    type
  });
  return res.data.questions;
};
