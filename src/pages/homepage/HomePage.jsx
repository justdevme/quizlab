import React from "react";
import styles from "./HomePage.module.css";
import { Container, Row, Col, Button, Card, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      {/* Header/Navigation */}
      <header className={styles.header}>
        <Navbar expand="lg" className={styles.navbar} fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/homepage" className={styles.navbarBrand}>
              <img src="../assets" alt="QuizLab" className={styles.logo} />

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/homepage" className={styles.navLink} active>Trang chủ</Nav.Link>
                <Nav.Link as={Link} to="/about" className={styles.navLink}>Giới thiệu</Nav.Link>
                
              </Nav>
              <div className={styles.navButtons}>
                <Button variant="outline-warning" className={styles.loginBtn}>Đăng nhập</Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Chào mừng đến với QuizLab</h1>
                <p className={styles.heroSubtitle}>
                Nền tảng tạo bài kiểm tra trực tuyến nhanh chóng, dễ sử dụng và hiệu quả
                </p>
                <div className={styles.heroBtns}>
                  <Button variant="warning" size="lg" className={styles.primaryBtn}>
                    Khám phá ngay
                  </Button>
                  <Button variant="outline-warning" size="lg" className={styles.secondaryBtn}>
                    Tổng quan
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className={styles.heroImage}>
                <img src="/hero-image.png" alt="Quiz Platform" className={styles.heroImg} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Vì sao chọn QuizLab?</h2>
            <p className={styles.sectionSubtitle}>Tối ưu trải nghiệm học tập và đánh giá trực tuyến cho người dùng mọi lứa tuổi</p>
          </div>
          <Row>
            {[
              { title: "Tạo bài nhanh chóng", icon: "bi-briefcase-fill", desc: "  Chỉ vài bước đơn giản để tạo ra bài kiểm tra hấp dẫn với nhiều định dạng câu hỏi" },
              { title: "Phân tích tức thì", icon: "bi-code-square", desc: "Kết quả được thống kê tự động và trực quan để bạn dễ dàng theo dõi" },
              { title: "Chia sẻ tiện lợi", icon: "bi-graph-up", desc: "Gửi link bài kiểm tra đến bạn bè, học sinh hoặc đồng nghiệp chỉ với 1 cú nhấp chuột" }
            ].map((service, idx) => (
              <Col lg={4} md={6} sm={12} key={idx} className="mb-4">
                <Card className={styles.featureCard}>
                  <Card.Body>
                    <div className={styles.iconContainer}>
                      <i className={`bi ${service.icon}`}></i>
                    </div>
                    <Card.Title className={styles.cardTitle}>{service.title}</Card.Title>
                    <Card.Text className={styles.cardText}>
                      {service.desc}
                    </Card.Text>
                    <Button variant="outline-warning" className={styles.cardBtn}>Tìm hiểu thêm</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


            {/* About Section */}
            <section className={styles.aboutSection}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <div className={styles.aboutImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className={styles.aboutContent}>
                <h2 className={styles.sectionTitle}>Về QuizLab</h2>
                <p className={styles.aboutText}>
                QuizLab là nền tảng hàng đầu hỗ trợ bạn tạo bài kiểm tra trực 
                tuyến một cách nhanh chóng và hiệu quả. Với trải nghiệm đơn giản và trực quan, 
                chúng tôi đã đồng hành cùng hàng ngàn người dùng trong việc thiết kế bài thi, 
                luyện tập và đánh giá năng lực
                </p>
                <p className={styles.aboutText}>
                Sứ mệnh của chúng tôi là mang đến những công cụ học tập dễ sử dụng, 
                giúp bạn đạt được mục tiêu rèn luyện và kiểm tra kiến thức — mọi lúc, mọi nơi.
                </p>
                <div className={styles.aboutStats}>
                  <div className={styles.statItem}>
                    <h3 className={styles.statNumber}>6+</h3>
                    <p className={styles.statText}>Tuần thực hiện</p>
                  </div>
                  <div className={styles.statItem}>
                    <h3 className={styles.statNumber}>200+</h3>
                    <p className={styles.statText}>Bài đã tạo </p>
                  </div>
                  <div className={styles.statItem}>
                    <h3 className={styles.statNumber}>300+</h3>
                    <p className={styles.statText}>Người dùng</p>
                  </div>
                </div>
                <Button variant="warning" className={styles.primaryBtn}>
                  Tìm hiểu thêm về chúng tôi
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* What We Offer Section */}
      <section className={styles.offerSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Chúng tôi cung cấp</h2>
            <p className={styles.sectionSubtitle}>Các giải pháp toàn diện đáp ứng nhu cầu của bạn</p>
          </div>
          <Row>
            {[
              { title: "Tạo bài kiểm tra", icon: "bi-pencil-square", desc: "Dễ dàng tạo các bài kiểm tra với nhiều loại câu hỏi khác nhau" },
              { title: "Phân tích kết quả", icon: "bi-bar-chart-line", desc: "Phân tích chi tiết kết quả và hiệu suất của người tham gia" },
              { title: "Chia sẻ & Cộng tác", icon: "bi-people", desc: "Chia sẻ bài kiểm tra và cộng tác với đồng nghiệp" },
              { title: "Tùy chỉnh giao diện", icon: "bi-palette", desc: "Tùy chỉnh giao diện bài kiểm tra theo thương hiệu của bạn" },
              { title: "Bảo mật dữ liệu", icon: "bi-shield-lock", desc: "Bảo mật dữ liệu và quyền riêng tư của người dùng" },
              { title: "Hỗ trợ đa nền tảng", icon: "bi-laptop", desc: "Hoạt động trên mọi thiết bị và nền tảng" }
            ].map((offer, idx) => (
              <Col lg={4} md={6} sm={12} key={idx} className="mb-4">
                <div className={styles.offerCard}>
                  <div className={styles.offerIcon}>
                    <i className={`bi ${offer.icon}`}></i>
                  </div>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerText}>{offer.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Người dùng nói gì?</h2>
            <p className={styles.sectionSubtitle}>Cảm nhận từ những người đã trải nghiệm QuizLab</p>
          </div>
          <Row>
            {[{
              text: "Tôi có thể tạo bài kiểm tra cho lớp học chỉ trong vài phút. Rất tiện lợi và dễ dùng!",
              name: "Trần Minh Hằng",
              position: "Giáo viên Tiểu học"
            }, {
              text: "QuizLab giúp tôi luyện thi TOEIC hiệu quả nhờ phân tích kết quả chi tiết.",
              name: "Nguyễn Hoàng Phúc",
              position: "Sinh viên Đại học"
            }, {
              text: "Giao diện cực kỳ thân thiện, tôi có thể chia sẻ bài kiểm tra cho nhóm học trực tuyến dễ dàng.",
              name: "Lê Thị Lan",
              position: "Người học tự do"
            }].map((item, idx) => (
              <Col lg={4} md={6} sm={12} key={idx} className="mb-4">
                <Card className={styles.testimonialCard}>
                  <Card.Body>
                    <div className={styles.quoteIcon}>
                      <i className="bi bi-quote"></i>
                    </div>
                    <Card.Text className={styles.testimonialText}>
                      "{item.text}"
                    </Card.Text>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.authorAvatar}>
                        <div className={styles.avatarPlaceholder}></div>
                      </div>
                      <div className={styles.authorInfo}>
                        <h5 className={styles.authorName}>{item.name}</h5>
                        <p className={styles.authorPosition}>{item.position}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Sẵn sàng tạo bài kiểm tra đầu tiên?
            </h2>
            <p className={styles.ctaText}>
            Bắt đầu ngay với QuizLab để khám phá cách tạo bài kiểm tra trực tuyến thật đơn giản và hiệu quả. Không cần kỹ thuật, chỉ cần ý tưởng!
            </p>
            <Button variant="warning" size="lg" className={styles.ctaBtn}>
              Khám phá ngay
            </Button>
          </div>
        </Container>
      </section>


      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <Container>
            <Row>
              <Col lg={3} md={6} sm={12} className="mb-4">
                <div className={styles.footerInfo}>
                  
                  
                  <div className={styles.footerSocial}>
                    <a href="#" className={styles.socialIcon}><i className="bi bi-facebook"></i></a>
                    <a href="#" className={styles.socialIcon}><i className="bi bi-twitter"></i></a>
                    <a href="#" className={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                    <a href="#" className={styles.socialIcon}><i className="bi bi-instagram"></i></a>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12} className="mb-4">
                <div className={styles.footerLinks}>
                  <h4 className={styles.footerTitle}>Liên kết nhanh</h4>
                  <ul className={styles.footerMenu}>
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="#">Giới thiệu</a></li>
                  </ul>
                </div>
              </Col>
              
            </Row>
          </Container>
        </div>
        <div className={styles.footerBottom}>
          <Container>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} QuizLab. Tất cả các quyền được bảo lưu.
            </p>
          </Container>
        </div>
      </footer>
    </div>
  );
}