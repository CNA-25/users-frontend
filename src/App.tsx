import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyOrdersPage from "./pages/MyOrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TempHomePage from "./pages/TempHomePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full min-h-screen bg-zinc-200">
        <main className="w-full p-0 mx-0">
          <Routes>
            <Route path="/" element={<TempHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
