import React, { useState } from "react";

import { useRouter } from "next/router";

import ForgotPasswordModal from "@/modules/forgot-password/components/ForgotPasswordModal";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";

import LoginForm from "../components/LoginForm/LoginForm";

const LoginContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clearErrors, setClearErrors] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

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

  const handleRegisterClick = () => {
    setIsNavigating(true);
    router.push("/");
  };

  if (isNavigating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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
            <span className="sm:text-base lg:text-sm text-white-500">
              Don&apos;t have an account?
            </span>
            <button
              onClick={handleRegisterClick}
              className="sm:text-base lg:text-sm text-green-500 hover:underline bg-transparent border-none p-0"
            >
              Get back and register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
