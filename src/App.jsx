import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import PasswordRecovery from "./pages/auth/PasswordRecovery";
import TakeQuizPage from "./pages/quiz/TakeQuizPage";
import HomePage from "./pages/homepage/HomePage";
import ResultPage from "./pages/Result/ResultPage";
import CreatePage from "./pages/create/CreatePage";
import Dashboard from "./pages/dashboard/Dashboard";
import SearchQuizPage from "./pages/searchquiz/SearchQuizPage";
import AdminPage from "./pages/admin/AdminPage";
import PreviewModal from "./pages/dashboard/PreviewModal"; // Thêm import modal
import SideBar from "./components/SideBar";
import CreateQuizPage from "./pages/create/CreatePage";
import UserProfilePage from "./pages/user/UserProfilePage";
import Detail from "./pages/searchquiz/Detail";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserQuizPage from "./pages/quiz/UserQuizPage";
import CreatorQuizDetail from "./pages/quiz/CreatorQuizDetail";
import AdminAllQuizzes from "./pages/admin/AdminAllQuizzes";
// Tạo layout có sidebar
function LayoutWithSidebar() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <SideBar />
      {/* Thêm style marginLeft vào đây */}
      <div className="flex-grow-1 overflow-auto p-3" style={{ marginLeft: '220px' }}> 
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchQuizPage />} />
          <Route path="/quiz-detail/:id" element={<Detail />} />
          <Route path="/creator/quizzes/:id" element={<CreatorQuizDetail />} />
          <Route path="/create" element={<CreatePage />} />         {/* Danh sách bài quiz */}
          <Route path="/create/multiple" element={<CreatePage />} />        {/* Tạo trắc nghiệm */}
          <Route path="/result/:resultId" element={<ResultPage />} />
          <Route path="/result" element={<ResultPage />} />
        
          <Route path="/take-quiz" element={<TakeQuizPage />} />
          <Route path="/my-quizzes" element={<UserQuizPage />} />
          <Route path="/preview" element={<PreviewModal quiz={null} />} /> 
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />

        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Trang không dùng sidebar */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/dashboard-admin" element={<AdminDashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
          <Route path="/all-quizzes" element={<AdminAllQuizzes />} />
        {/* Các route có sidebar */}
        <Route path="/*" element={<LayoutWithSidebar />} />
      </Routes>
    </Router>
  );
}
