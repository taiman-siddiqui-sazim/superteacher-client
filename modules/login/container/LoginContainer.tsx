import React, { useState } from "react";

import Link from "next/link";

import ForgotPasswordModal from "@/modules/forgot-password/components/ForgotPasswordModal";

import LoginForm from "../components/LoginForm/LoginForm";

const LoginContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clearErrors, setClearErrors] = useState(false);

  const handleForgotPasswordSubmit = () => {
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
      <div className="form-styles">
        <h1 className="text-2xl text-center text-green-500 mb-4">LOGIN</h1>
        <LoginForm clearErrors={clearErrors} />
        <div className="mt-8">
          <ForgotPasswordModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleForgotPasswordSubmit}
          />
        </div>
        <div className="flex flex-col items-center mt-4 space-y-4">
          <button
            onClick={handleForgotPasswordClick}
            className="sm:text-base lg:text-sm text-green-500 hover:underline bg-transparent border-none p-0"
          >
            Forgot Password
          </button>
          <div className="flex items-center space-x-2">
            <span className="sm:text-base lg:text-sm text-white-500">Don&apos;t have an account?</span>
            <Link href="/register" className="sm:text-base lg:text-sm text-green-500 hover:underline">
              Get back and register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
