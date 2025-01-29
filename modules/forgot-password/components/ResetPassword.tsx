import React, { useState } from "react";

import { toast } from "sonner";

import { PasswordInput } from "@/shared/components/Form/PasswordInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/components/shadui";
import { useResetPasswordMutation } from "@/shared/redux/rtk-apis/auth/auth.api";


import { IResetPasswordProps } from "./ForgotPassword.interfaces";

const ResetPassword: React.FC<IResetPasswordProps> = ({ email, otp, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const registeredEmail = email;
  const valid_otp = otp;

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({ email: registeredEmail, otp: valid_otp, password: newPassword }).unwrap();
      if (response) {
        toast.success(response.message);
        onClose();
      }
    } catch (error) {
        setErrorMessage((error as { data?: { error?: string } })?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white bg-opacity-90 max-w-xs px-2">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-green-500 mb-4">
            Reset Password
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center w-full mb-2">
          <PasswordInput
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="w-full text-black mb-6"
          />
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full text-black mb-1"
          />
          {errorMessage && <p className="text-sm text-red-500 w-3/4 text-left">{errorMessage}</p>}
        </div>
        <div className="flex justify-between w-3/4 mx-auto mt-4">
          <Button onClick={onClose} className="bg-purple-600 text-white hover:bg-purple-500">
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
  );
};

export default ResetPassword;
