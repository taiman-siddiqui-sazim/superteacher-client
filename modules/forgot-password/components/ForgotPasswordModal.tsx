import React, { useState, useEffect } from "react";

import { toast } from "sonner";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from "@/shared/components/shadui";
import { useForgotPasswordMutation } from "@/shared/redux/rtk-apis/auth/auth.api";

import { IForgotPasswordProps } from "./ForgotPassword.interfaces";
import OtpModal from "./OtpModal";

const emailSchema = z.string().email("Invalid email address");

const ForgotPasswordModal: React.FC<IForgotPasswordProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [otpEmail, setOtpEmail] = useState<string | null>(null);

  useEffect(() => {
    if (emailError) {
      setEmailError(null);
    }
  }, [email, emailError]);

  const handleSubmit = async () => {
    try {
      emailSchema.parse(email);
      setEmailError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0]?.message || "Invalid email address");
        return;
      }
    }

    try {
      const response = await forgotPassword(email).unwrap();
      toast.success(response.message);
      setEmail("");
      onSubmit(email);
      setOtpEmail(email);
    } catch (error) {
      toast.error("Failed to send forgot password request.");
    }
  };

  const handleCancel = () => {
    setEmail("");
    setEmailError(null);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="bg-white max-w-xs px-2">
          <DialogHeader>
            <DialogTitle className="text-xl text-center text-green-500 mb-4">
              FORGOT PASSWORD
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center w-full mb-2">
            <h2 className="text-lg text-green-500 mb-2 w-3/4 text-left">Email</h2>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-3/4 text-black mb-1"
            />
            {emailError && <p className="text-sm text-red-500 w-3/4 text-left">{emailError}</p>}
            <p className="text-sm text-gray-400 w-3/4 text-left">Enter your registered email</p>
          </div>
          <div className="flex justify-between w-3/4 mx-auto mt-4">
            <Button onClick={handleCancel} className="bg-purple-600 text-white hover:bg-purple-500">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-600 text-white hover:bg-green-500"
              disabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {otpEmail && <OtpModal email={otpEmail} onClose={() => setOtpEmail(null)} />}
    </>
  );
};

export default ForgotPasswordModal;
