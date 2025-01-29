import React, { useState, useEffect } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from "@/shared/components/shadui";
import { useCheckOtpMutation } from "@/shared/redux/rtk-apis/auth/auth.api";

import { IOtpModalProps } from "./ForgotPassword.interfaces";
import ResetPassword from "./ResetPassword";

const OtpModal: React.FC<IOtpModalProps> = ({ email, onClose }) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkOtp, { isLoading }] = useCheckOtpMutation();
  const registeredEmail = email;
  const [isOpen, setIsOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  useEffect(() => {
    if (email) {
      setIsOpen(true);
    }
  }, [email]);

  const handleSubmit = async () => {
    if (!otp) {
      setErrorMessage("OTP is required");
      return;
    }

    try {
      const response = await checkOtp({ email: registeredEmail, otp: otp }).unwrap();
      if (response) {
        toast.success(response.message);
        setErrorMessage(null);
        setIsOpen(false);
        setIsResetPasswordOpen(true);
      }
    } catch (error) {
      setErrorMessage(
        (error as { data?: { error?: string } })?.data?.error || "Failed to verify OTP.",
      );
    }
  };

  const handleCancel = () => {
    setOtp("");
    setErrorMessage(null);
    setIsOpen(false);
    onClose();
  };

  const handleResetPasswordClose = () => {
    setIsResetPasswordOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="bg-white max-w-xs px-2">
          <DialogHeader>
            <DialogTitle className="text-xl text-center text-green-500 mb-4">
              Enter OTP code
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center w-full mb-2">
            <Input
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="w-3/4 text-black mb-1"
            />
            {errorMessage && <p className="text-sm text-red-500 w-3/4 text-left">{errorMessage}</p>}
            <p className="text-sm text-gray-400 w-3/4 text-left">
              Enter the OTP sent to your email
            </p>
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
      {isResetPasswordOpen && (
        <ResetPassword email={registeredEmail} otp={otp} onClose={handleResetPasswordClose} />
      )}
    </>
  );
};

export default OtpModal;
