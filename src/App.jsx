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
import PreviewModal from "./pages/dashboard/PreviewModal"; // ✅ Thêm import modal
import SideBar from "./components/SideBar";

// Tạo layout có sidebar
function LayoutWithSidebar() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <SideBar />
      <div className="flex-grow-1 overflow-auto p-3">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchQuizPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/take-quiz" element={<TakeQuizPage />} />
          <Route path="/preview" element={<PreviewModal quiz={null} />} /> {/* ✅ Tạm route độc lập */}
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

        {/* Các route có sidebar */}
        <Route path="/*" element={<LayoutWithSidebar />} />
      </Routes>
    </Router>
  );
}
