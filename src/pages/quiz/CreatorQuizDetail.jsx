import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Share2, Download, Play, Clock, Users, BookOpen, Star, Heart, MessageCircle, Search, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import axios from 'axios';
import styles from '../searchquiz/Detail.module.css';
import ava from '../../assets/ava.png';
import FlashcardApp from '../../components/FlashcardApp';

// Component biểu đồ câu trả lời sai
const WrongAnswerChart = () => {
  const mockWrongStats = [
    { question: 'Câu 1', wrongCount: 5 },
    { question: 'Câu 2', wrongCount: 2 },
    { question: 'Câu 3', wrongCount: 8 },
    { question: 'Câu 4', wrongCount: 1 },
    { question: 'Câu 5', wrongCount: 6 }
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      marginBottom: '30px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#333', margin: 0 }}>
          Câu bị trả lời sai nhiều nhất
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockWrongStats} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="question" stroke="#FFB300" />
          <YAxis allowDecimals={false} stroke="#FFB300" />
          <Tooltip contentStyle={{ backgroundColor: '#FFF8E1', border: '1px solid #FFD700', color: '#333' }} />
          <Bar dataKey="wrongCount" fill="#FFD700">
            <LabelList dataKey="wrongCount" position="top" fill="#333" fontWeight="bold" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


const CreatorQuizDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [questionCount, setQuestionCount] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [editedQuiz, setEditedQuiz] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");



  const { id } = useParams()
  
  useEffect(() => {
    if (quizData) setEditedQuiz(JSON.parse(JSON.stringify(quizData)));
  }, [quizData]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`http://localhost:8017/v1/api/results/by-user/${currentUser.id}/quiz/${id}`);
        setUserResults(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy kết quả ôn tập:", error);
      }
    };

    if (id) fetchResults();
  }, [id]);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8017/v1/api/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Lỗi khi tải bình luận:", err);
      }
    };

    if (id) fetchComments();
  }, [id]);

  const handleSendComment = async () => {
      console.log(">> Bấm gửi bình luận"); 
      if (!commentInput.trim()) return;

      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        console.log("Current user:", currentUser);
        console.log("Sending comment:", commentInput);

        await axios.post("http://localhost:8017/v1/api/comments", {
          quiz_id: id,
          user_id: currentUser.id,
          text: commentInput
        });

        setCommentInput("");
        // Reload lại bình luận sau khi gửi
        const res = await axios.get(`http://localhost:8017/v1/api/comments/${id}`);
        console.log("Fetched comments:", res.data);
        setComments(res.data);
      } catch (err) {
        console.error("Lỗi khi gửi bình luận:", err);
      }
    };


  useEffect(() => {
  const fetchQuestionCount = async () => {
    try {
      const res = await axios.get(`http://localhost:8017/v1/questions/${id}/count`);
      setQuestionCount(res.data.totalQuestions);
    } catch (error) {
      console.error("Lỗi khi lấy tổng số câu hỏi:", error);
    }
  };

  if (quizData) fetchQuestionCount();
}, [quizData]);

  useEffect(() => {
  const fetchQuiz = async () => {
    try {
      const res = await axios.get(`http://localhost:8017/v1/api/quizzes/${id}/detail`);

      setQuizData(res.data);

      console.log(">>> Quiz Questions:", quizData.questions);

    } catch (err) {
      console.error('Lỗi khi fetch quiz:', err);
    }
  };

  fetchQuiz();
}, [id]);




  const handleHeaderSearchSubmit = (e) => {
    if (e.key === 'Enter' && headerSearchTerm.trim()) {
      console.log("Header search submitted from Detail page:", headerSearchTerm);
      navigate(`/search?q=${encodeURIComponent(headerSearchTerm.trim())}`);
    }
  };

  if (!quizData) {
    return <div className={styles.loadingState}>Đang tải dữ liệu đề thi...</div>;
  }

  const tabs = [
    { id: 'content', label: 'Nội dung đề thi' },
    { id: 'rating', label: 'Đánh giá' },
    { id: 'results', label: 'Kết quả ôn tập' },
    { id: 'stats', label: 'Thống kê ôn tập' },
    { id: 'edit', label: 'Sửa quiz' },
  ];

  const handleStartQuizNow = async () => {
  try {
    const res = await axios.get(`http://localhost:8017/v1/questions/by-quiz/${id}`);
    const fetchedQuestions = res.data;

    // Chuyển hướng và truyền dữ liệu qua state
    navigate('/take-quiz', {
      state: {
         _id: quizData._id,
        title: quizData.title,
        timeLimit: 30, // hoặc bạn có thể lấy từ quizData nếu có
        questions: fetchedQuestions.map((q, index) => ({
          _id: q._id,
          text: q.question,
          type: q.type || (q.options?.length > 1 ? 'single' : 'text'), // fallback
          options: q.options || [],
          correctAnswer: q.correctAnswer
        }))
      }
    });
  } catch (error) {
    console.error('Lỗi khi tải câu hỏi:', error);
  }
};

const handleEditQuestion = (index) => {
  const question = editedQuiz.questions[index];
  setEditingIndex(index);
  setEditingText(question.text || question.question);
  setShowEditModal(true);
};
const handleModalSave = () => {
  const updated = [...editedQuiz.questions];
  updated[editingIndex].text = editingText;
  setEditedQuiz({ ...editedQuiz, questions: updated });
  setShowEditModal(false);
};


const handleDeleteQuestion = (index) => {
  const updated = [...editedQuiz.questions];
  updated.splice(index, 1);
  setEditedQuiz({ ...editedQuiz, questions: updated });
};

const handleSaveChanges = async () => {
  try {
    await axios.put(`http://localhost:8017/v1/api/quizzes/${id}`, {
      title: editedQuiz.title,
      subject: editedQuiz.subject,
      questions: editedQuiz.questions
    });
    alert("Lưu thành công!");
    setQuizData(editedQuiz); // cập nhật lại bản chính
  } catch (error) {
    alert("Lỗi khi lưu thay đổi");
    console.error(error);
  }
};

  const formattedDate = new Date(quizData.created_at).toLocaleDateString('vi-VN');


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.pageTitleHeader}>Chi Tiết Quiz</h2>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchWrapper}>
            <Search size={18} style={{ marginRight: '8px', color: '#6c757d' }} />
            <input
              type="text"
              placeholder="Tìm kiếm quiz..."
              className={styles.searchBarHeader}
              value={headerSearchTerm}
              onChange={(e) => setHeaderSearchTerm(e.target.value)}
              onKeyDown={handleHeaderSearchSubmit}
            />
          </div>
        </div>
      </header>

      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <div>
            <div className={styles.quizCard}>
              <div className={styles.quizHeader}>
                <div className={styles.quizHeaderContent}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <div className={styles.quizIconBox}>
                        <BookOpen size={28} />
                      </div>
                      <div>
                        <h2 className={styles.quizTitle}>{quizData.title}</h2>
                        <div className={styles.quizMeta}>
                          <span className={styles.subjectTag}>{quizData.subject}</span>
                          <span className={styles.statItem}>
                            <Clock size={14} />
                            <span>{formattedDate}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.quizStats}>
                      <div className={styles.statItem}>
                        <BookOpen size={14} />
                        <span>{questionCount}</span>
                      </div>
                      <div className={styles.statItem}>
                        <Users size={14} />
                        <span>{quizData.stats.attempts}</span>
                      </div>
                      <div className={styles.statItem}>
                        <Heart size={14} />
                        <span>{quizData.stats.likes}</span>
                      </div>
                      <div className={styles.statItem}>
                        <MessageCircle size={14} />
                        <span>{quizData.stats.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.actionSection}>
                <div className={styles.actionButtons}>
                  <button
                    className={`${styles.actionButton} ${styles.purpleButton}`}
                    onClick={() => setShowFlashcard(true)}
                  >
                    <MessageCircle size={18} />
                    <span>Thẻ ghi nhớ</span>
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.startQuizButton}`}
                    onClick={handleStartQuizNow}
                  >
                    <Play size={18} />
                    <span>Bắt đầu ôn thi</span>
                  </button>
                  <button className={`${styles.actionButton} ${styles.blueButton}`}>
                    <Download size={18} />
                    <span>Tải về</span>
                  </button>
                </div>
              </div>

              <div className={styles.tabsContainer}>
                <nav className={styles.tabs}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'content' && (
                  <div>
                    <h3 className={styles.sectionTitle}>Nội dung chi tiết</h3>
                   {quizData.questions.map((question, index) => (
                    <div key={question._id} className={styles.questionCard}>
                      <h4 className={styles.questionTitle}>
                        Câu {index + 1}: ({question.options?.length > 1 ? 'Trắc nghiệm' : 'Điền khuyết'})
                      </h4>
                      <p className={styles.questionText}>{question.text || question.question}</p>
                      {question.options?.length > 1 && (
                        <ul className={styles.optionsList}>
                          {question.options.map((option, idx) => (
                            <li key={idx} className={styles.optionItem}>
                              <span style={{ marginRight: '8px' }}>{String.fromCharCode(65 + idx)}.</span>
                              <span>{option}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                

                  </div>
                )}
                
                  {activeTab === 'rating' && (
                    <div className={styles.commentSection}>
                      <h3 className={styles.commentTitle}>Bình luận</h3>

                      <div className={styles.commentBox}>
                        <textarea
                          placeholder="Viết bình luận..."
                          className={styles.commentInput}
                          maxLength={1000}
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <button
                          className={styles.sendButton}
                          onClick={() => {
                            console.log(">>> ĐÃ BẤM GỬI");
                            handleSendComment();
                          }}
                        >
                          Gửi
                        </button>

                      </div>

                      <div className={styles.commentList}>
                        {comments.length === 0 ? (
                          <p>Chưa có bình luận nào.</p>
                        ) : (
                          comments.map((comment, index) => (
                            <div key={comment._id || index} className={styles.commentItem}>
                              <img
                                src={`/avatars/${(index % 5) + 1}.png`}
                                alt="avatar"
                                className={styles.commentAvatar}
                              />
                              <div className={styles.commentContent}>
                                <div className={styles.commentHeader}>
                                  <strong>{comment.username || "Ẩn danh"}</strong>
                                  <span className={styles.commentTime}>
                                    {new Date(comment.created_at).toLocaleString('vi-VN')}
                                  </span>
                                </div>
                                <div className={styles.commentText}>
                                  {comment.text}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}


                {activeTab === 'results' && (
                  <div className={styles.resultListSection}>
                    <h3 className={styles.sectionTitle}>Lịch sử làm bài</h3>
                    {userResults.length === 0 ? (
                      <p className={styles.emptyResultText}>Bạn chưa làm bài kiểm tra này.</p>
                    ) : (
                      <div className={styles.resultList}>
                        {userResults.map((result, index) => (
                          <div key={result._id} className={styles.resultCard}>
                            <div className={styles.resultInfo}>
                              <div className={styles.resultLine}>
                                <strong>Lần {index + 1}</strong>
                              </div>
                              <div className={styles.resultLine}>
                                Ngày làm: <span>{new Date(result.submitted_at).toLocaleString('vi-VN')}</span>
                              </div>
                              <div className={styles.resultLine}>
                                Điểm: <span>{result.score}/10</span>
                              </div>
                            </div>
                            <button
                              className={styles.resultButton}
                              onClick={() => navigate(`/result/${result._id.toString()}`)}
                            >
                              Xem chi tiết
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'edit' && (
                <div className={styles.editSection}>
                    <h3 className={styles.sectionTitle}>Chỉnh sửa thông tin đề thi</h3>
                    <div className={styles.formGroup}>
                    <label>Tiêu đề</label>
                    <input
                        type="text"
                        className={styles.inputField}
                        value={editedQuiz?.title || ""}
                        onChange={(e) => setEditedQuiz({ ...editedQuiz, title: e.target.value })}
                    />
                    </div>

                    <div className={styles.formGroup}>
                    <label>Môn học</label>
                    <input
                        type="text"
                        className={styles.inputField}
                        value={editedQuiz?.subject || ""}
                        onChange={(e) => setEditedQuiz({ ...editedQuiz, subject: e.target.value })}
                    />
                    </div>

                    

                    <button className={styles.saveButton} onClick={handleSaveChanges} >
                    Lưu thay đổi
                    </button>

                    <hr style={{ margin: '30px 0' }} />

                    <h3 className={styles.sectionTitle}>Danh sách câu hỏi</h3>
                    <table className={styles.questionTable}>
                    <thead>
                        <tr>
                        <th>STT</th>
                        <th>Câu hỏi</th>
                        <th>Loại</th>
                        <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {editedQuiz.questions?.map((q, index) => (
                        <tr key={q._id}>
                            <td>{index + 1}</td>
                            <td className={styles.questionTextCell}>{q.text || q.question}</td>
                            <td>{q.options?.length > 1 ? 'Trắc nghiệm' : 'Điền khuyết'}</td>
                            <td>
                            <button onClick={() => handleEditQuestion(index)} className={styles.editButton}>Sửa</button>
                            <button onClick={() => handleDeleteQuestion(index)} className={styles.deleteButton}>Xóa</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

                </div>
                )}


              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sectionTitle}>Chia sẻ đề thi</h3>
              <div className={styles.shareButtons}>
                <button className={`${styles.shareButton}`}>
                  <Share2 size={16} />
                  <span>Sao chép liên kết</span>
                </button>
              </div>
              <div style={{ textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Flashcard */}
      {showFlashcard && (
        <div className={styles.modalOverlay} onClick={() => setShowFlashcard(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModalButton} onClick={() => setShowFlashcard(false)}>
                
            </button>
            <FlashcardApp />
          </div>
        </div>
      )}
      {showEditModal && (
        <div className={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Chỉnh sửa câu hỏi</h3>
            <textarea
                className={styles.modalTextarea}
                rows={4}
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
            />
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => setShowEditModal(false)} className={styles.cancelButton}>Hủy</button>
                <button onClick={handleModalSave} className={styles.saveButton}>Lưu</button>
            </div>
            </div>
        </div>
        )}

    </div>
  );
};

export default CreatorQuizDetail;