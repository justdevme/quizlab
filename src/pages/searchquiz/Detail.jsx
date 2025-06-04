import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Download, Play, Clock, Users, BookOpen, Star, Heart, MessageCircle, Search, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import axios from 'axios';
import styles from './Detail.module.css';
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

// Mock data
const mockQuizData = {
  id: '683bf0109f45e68e4042498b',
  title: "Kinh tế chính trị Mác-Lênin - Phiên bản cập nhật 2025",
  subject: "Kinh tế chính trị",
  date: "15/12/2025",
  stats: {
    questions: "320 câu hỏi",
    participants: "87 người tham gia",
    likes: "14 lượt thích",
    comments: "5 bình luận"
  },
  chapters: [
    {
      id: 1,
      title: "Chủ nghĩa tư bản và quy luật giá trị",
      questions: [
        { id: 1, text: "Quy luật giá trị trong chủ nghĩa tư bản thể hiện như thế nào?", options: ["Thông qua cung cầu", "Thông qua lao động", "Thông qua thị trường", "Thông qua nhà nước"] },
        { id: 2, text: "Giá trị thặng dư được tạo ra từ đâu?", options: ["Lao động của công nhân", "Vốn của tư bản gia", "Máy móc thiết bị", "Thị trường tiêu thụ"] },
        { id: 3, text: "Đặc điểm cơ bản của chế độ tư hữu tư bản chủ nghĩa là gì?", options: ["Tư nhân sở hữu tư liệu sản xuất", "Nhà nước sở hữu", "Tập thể sở hữu", "Cộng đồng sở hữu"] }
      ]
    },
    {
      id: 2,
      title: "Chủ nghĩa xã hội và con đường phát triển",
      questions: [
        { id: 4, text: "Đặc trưng cơ bản của chế độ sở hữu xã hội chủ nghĩa?", options: ["Sở hữu toàn dân", "Sở hữu tư nhân", "Sở hữu tập thể", "Cả A và C"] },
        { id: 5, text: "Nguyên tắc phân phối trong chủ nghĩa xã hội?", options: ["Theo lao động", "Theo nhu cầu", "Theo vốn", "Theo địa vị"] }
      ]
    }
  ]
};

const QuizDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const [showFlashcard, setShowFlashcard] = useState(false);

  useEffect(() => {
    setQuizData(mockQuizData);
  }, []);

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

  const handleStartQuizNow = () => {
    navigate(`/take-quiz`);
  };

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
                        <span>{quizData.stats.questions}</span>
                      </div>
                      <div className={styles.statItem}>
                        <Users size={14} />
                        <span>{quizData.stats.participants}</span>
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
                    {quizData.chapters.map((chapter) => (
                      <div key={chapter.id}>
                        <div className={styles.chapterHeader}>
                          <span className={styles.chapterBadge}>Phần {chapter.id}</span>
                          <span className={styles.chapterTitle}>{chapter.title}</span>
                        </div>
                        {chapter.questions.map((question) => (
                          <div key={question.id} className={styles.questionCard}>
                            <h4 className={styles.questionTitle}>
                              Câu {question.id}: ({question.options.length > 1 ? 'Trắc nghiệm' : 'Điền khuyết'})
                            </h4>
                            <p className={styles.questionText}>{question.text}</p>
                            {question.options.length > 1 && (
                              <ul className={styles.optionsList}>
                                {question.options.map((option, index) => (
                                  <li key={index} className={styles.optionItem}>
                                    <span style={{ marginRight: '8px' }}>{String.fromCharCode(65 + index)}.</span>
                                    <span>{option}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
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
                    />
                    <button className={styles.sendButton}>
                        Gửi
                    </button>
                    </div>

                    <div className={styles.commentList}>
                    <div className={styles.commentItem}>
                        <img src="/avatars/1.png" alt="avatar" className={styles.commentAvatar} />
                        <div className={styles.commentContent}>
                        <div className={styles.commentHeader}>
                            <strong>Sildo</strong>
                            <span className={styles.commentTime}>3 giờ trước</span>
                        </div>
                        <div className={styles.commentText}>
                            Cần tìm bài tương tự
                        </div>
                        </div>
                    </div>

                    <div className={styles.commentItem}>
                        <img src="/avatars/2.png" alt="avatar" className={styles.commentAvatar} />
                        <div className={styles.commentContent}>
                        <div className={styles.commentHeader}>
                            <strong>Luckyly</strong>
                            <span className={styles.commentTime}>21 giờ trước</span>
                        </div>
                        <div className={styles.commentText}>
                            Bài hay dễ hiểu
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                )}

                {activeTab === 'results' && (
                  <div className={styles.emptyState}>
                    <BookOpen className={styles.emptyIcon} />
                    <p>Bạn chưa có kết quả ôn tập nào.</p>
                  </div>
                )}
                {activeTab === 'stats' && (
                  <div>
                    <h3 className={styles.sectionTitle}>Thống kê học tập</h3>
                    <WrongAnswerChart />
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
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${styles.likeButton} ${isLiked ? styles.likedButton : styles.notLikedButton}`}
                >
                  <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{isLiked ? 'Đã thích' : 'Thích'}</span>
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
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
      {/* Modal Flashcard */}
      {showFlashcard && (
        <div className={styles.modalOverlay} onClick={() => setShowFlashcard(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModalButton} onClick={() => setShowFlashcard(false)}>
                ×
            </button>
            <FlashcardApp />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDetail;