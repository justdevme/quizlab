import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Share2, Download, Play, Clock, Users, BookOpen, Star, Heart, MessageCircle, Search, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import axios from 'axios';
import styles from './Detail.module.css';
import ava from '../../assets/ava.png';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


// Component biểu đồ câu trả lời sai
const WrongAnswerChart = ({ data }) => {
  // Gán nhãn "Câu 1", "Câu 2", v.v. + giữ nội dung gốc cho tooltip
  const chartData = data.map((q, index) => ({
    questionLabel: `Câu ${index + 1}`,
    questionText: q.question,
    wrongCount: q.wrongCount
  }));

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '30px'
    }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>Câu bị trả lời sai nhiều nhất</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="questionLabel" stroke="#FFB300" />
          <YAxis allowDecimals={false} stroke="#FFB300" />

          <Tooltip
            formatter={(value) => [`${value} lượt`, 'Sai']}
            labelFormatter={(label) => {
              const match = chartData.find(item => item.questionLabel === label);
              return match?.questionText || label;
            }}
            contentStyle={{
              backgroundColor: '#FFF8E1',
              border: '1px solid #FFD700',
              color: '#333'
            }}
          />

          <Bar dataKey="wrongCount" fill="#FFD700" barSize={40}>
            <LabelList dataKey="wrongCount" position="top" fill="#333" fontWeight="bold" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};




const QuizDetail = () => {
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
  const [flashcards, setFlashcards] = useState([]);
  const [flashIndex, setFlashIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [wrongStats, setWrongStats] = useState([]);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(30); // mặc định 30 phút

  const { id } = useParams()
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?.id;
  const quizId = id;

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:8017/v1/api/favorites/${userId}/${quizId}`);
        setIsSaved(res.data.saved); // true hoặc false
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái lưu:", error);
      }
    };

    if (userId && quizId) {
      checkFavoriteStatus();
    }
  }, [userId, quizId]);

  
  useEffect(() => {
    const fetchWrongStats = async () => {
      try {
        const res = await axios.get(`http://localhost:8017/v1/api/quizzes/${id}/stats/wrong-questions`);
        console.log("📊 Dữ liệu thống kê:", res.data); 
        setWrongStats(res.data);
      } catch (error) {
        console.error("Lỗi khi fetch thống kê sai:", error);
      }
    };
    if (activeTab === 'stats') fetchWrongStats();
  }, [activeTab, id]);

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
  const FlashcardApp = ({ flashcards }) => {
    return (
      <div>
        {flashcards.map((card, index) => (
          <div key={card._id || index}>
            <strong>Q:</strong> {card.front_text} <br />
            <strong>A:</strong> {card.back_text}
          </div>
        ))}
      </div>
    );
  };
  const handleStartQuizNow = () => {
    setShowTimeModal(true); // Mở modal thay vì navigate ngay
  };

  const handleConfirmStart = async () => {
  try {
    const res = await axios.get(`http://localhost:8017/v1/questions/by-quiz/${id}`);
    const fetchedQuestions = res.data;

    navigate('/take-quiz', {
      state: {
        _id: quizData._id,
        title: quizData.title,
        timeLimit: selectedTime, // Sử dụng thời gian được chọn
        questions: fetchedQuestions.map((q) => ({
          _id: q._id,
          text: q.question,
          type: q.type || (q.options?.length > 1 ? 'single' : 'text'),
          options: q.options || [],
          correctAnswer: q.correctAnswer
        }))
      }
    });
  } catch (error) {
    console.error('Lỗi khi tải câu hỏi:', error);
  }
};


const handleSave = async () => {
  if (!userId || !quizId) return;

  try {
    if (!isSaved) {
      // Lưu quiz
      const res = await axios.post('http://localhost:8017/v1/api/favorites', {
        user_id: userId,
        quiz_id: quizId
      });

      if (res.data.saved) {
        setIsSaved(true);
      }
    } else {
      // Gỡ quiz
      const res = await axios.delete('http://localhost:8017/v1/api/favorites', {
        data: {
          user_id: userId,
          quiz_id: quizId
        }
      });

      if (!res.data.saved) {
        setIsSaved(false);
      }
    }
  } catch (error) {
    console.error('Lỗi khi xử lý favorite:', error);
  }
};



  const handleSendComment = async () => {
      console.log("Bấm gửi bình luận"); 
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
         setQuizData(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            comments: prev.stats.comments + 1
          }
        }));
        // Reload lại bình luận sau khi gửi
        const res = await axios.get(`http://localhost:8017/v1/api/comments/${id}`);
        console.log("Fetched comments:", res.data);
        setComments(res.data);
      } catch (err) {
        console.error("Lỗi khi gửi bình luận:", err);
      }
    };

useEffect(() => {
  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(`http://localhost:8017/v1/api/flashcard/${id}`);
      setFlashcards(res.data);
    } catch (err) {
      console.error("Lỗi khi fetch flashcards:", err);
    }
  };

  if (id) {
    fetchFlashcards();
  }
}, [id]);
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
    { id: 'stats', label: 'Thống kê ôn tập' }
  ];


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
                            <span>{quizData.date}</span>
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
                      <p className={styles.questionText}>{question.question}</p>
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

                {activeTab === 'stats' && (
                  <>
                    <WrongAnswerChart data={wrongStats} />
                  </>
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
                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setQuizData(prev => ({
                      ...prev,
                      stats: {
                        ...prev.stats,
                        likes: isLiked ? prev.stats.likes - 1 : prev.stats.likes + 1
                      }
                    }));
                  }}
                  className={`${styles.likeButton} ${isLiked ? styles.likedButton : styles.notLikedButton}`}
                >
                  <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{isLiked ? 'Đã thích' : 'Thích'}</span>
                </button>

                <button
                  onClick={handleSave}
                  className={`${styles.saveButton} ${isSaved ? styles.savedButton : styles.notSavedButton}`}
                >
                  <Star size={16} fill={isSaved ? 'currentColor' : 'none'} />
                  <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      {showTimeModal && (
        <div className={styles.modalOverlay} onClick={() => setShowTimeModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Chọn thời gian làm bài</h3>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
              style={{ marginBottom: '12px' }}
            >
              <option value={10}>10 phút</option>
              <option value={20}>20 phút</option>
              <option value={30}>30 phút</option>
              <option value={45}>45 phút</option>
              <option value={60}>60 phút</option>
              <option value={0}>Không giới hạn</option>
            </select>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowTimeModal(false)}>Hủy</button>
              <button onClick={handleConfirmStart}>Bắt đầu</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Flashcard */}
      {showFlashcard && (
        <div className={styles.modalOverlay} onClick={() => setShowFlashcard(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalButton} onClick={() => setShowFlashcard(false)}>×</button>
            {flashcards.length > 0 ? (
          <div style={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '350px',
            margin: '0 auto'
          }}>
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                width: '100%',
                height: '200px',
                borderRadius: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                padding: '20px',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.6s',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{
                position: 'absolute',
                backfaceVisibility: 'hidden'
              }}>
                <strong>Q:</strong> {flashcards[flashIndex]?.front_text}
              </div>
              <div style={{
                position: 'absolute',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden'
              }}>
                <strong>A:</strong> {flashcards[flashIndex]?.back_text}
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={() => {
                setIsFlipped(false);
                setFlashIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
              }}
              style={{
                backgroundColor: '#FFD700',  // vàng
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              >←</button>
              <span>{flashIndex + 1} / {flashcards.length}</span>
              <button onClick={() => {
                setIsFlipped(false);
                setFlashIndex((prev) => (prev + 1) % flashcards.length);
              }}
              style={{
                backgroundColor: '#FFD700',  // vàng
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              >→</button>
            </div>
          </div>
        ) : (
          <p>Không có flashcard.</p>
        )}

                  </div>
                </div>
              )}

    </div>
  );
};

export default QuizDetail;