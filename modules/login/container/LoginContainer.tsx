import React, { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import ForgotPasswordModal from "@/modules/forgot-password/components/ForgotPasswordModal";

const LoginContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [clearErrors, setClearErrors] = useState(false);

  const handleForgotPasswordSubmit = (email: string) => {
    setForgotPasswordEmail(email);
    setIsModalOpen(false);
  };

  const handleForgotPasswordClick = () => {
    setClearErrors(true);
    setIsModalOpen(true);
    setTimeout(() => setClearErrors(false), 0);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="max-w-lg w-1/2">
        <h1 className="text-2xl text-center text-green-500 mb-4">LOGIN</h1>
        <LoginForm clearErrors={clearErrors} />
        <ForgotPasswordModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleForgotPasswordSubmit}
        />
        <div className="flex flex-col items-center mt-4 space-y-2">
          <button
            onClick={handleForgotPasswordClick}
            className="text-sm text-green-500 hover:underline bg-transparent border-none p-0"
          >
            Forgot Password
          </button>
          <div className="flex items-center space-x-2">
            <a href="/register" className="text-sm text-green-500 hover:underline">
              Don't have an account?
            </a>
            <span className="text-sm text-white-500">Get back and Register</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
