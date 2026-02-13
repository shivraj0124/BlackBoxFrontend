import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/Home";
import SignUpPage from "./components/Signup";
import LoginPage from "./components/Login";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/authContext";
import Leaderboard from "./components/LeaderBoard";
import FileExplorerPage from "./components/FileExplorerPage";
import ProtectedRoute from "./components/ProtectRoute";
import RateLimit from "./components/RateLimit";
export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/file-explorer" element={<ProtectedRoute><FileExplorerPage /></ProtectedRoute>} />
            {/* <Route path="/rate-limit" element={<ProtectedRoute><RateLimit /></ProtectedRoute>} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>

  );
}
