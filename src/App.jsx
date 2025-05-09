import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import PasswordRecovery from "./pages/auth/PasswordRecovery";
import TakeQuizPage from "./pages/quiz/TakeQuizPage";
import HomePage from "./pages/homepage/HomePage";
import ResultPage from "./pages/Result/ResultPage"; 
import CreatePage from "./pages/create/CreatePage";
import Dashboard from "./pages/dashboard/Dashboard";
import QuizDetailPage from "./pages/quiz/QuizDetailPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/quiz/:quizId" element={< QuizDetailPage/>} />
        <Route path="/quiz/:id/take-quiz" element={<TakeQuizPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/result/:resultId" element={<ResultPage />} />
        <Route path="/create" element={<CreatePage />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}