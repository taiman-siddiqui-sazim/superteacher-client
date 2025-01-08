import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from "@/shared/components/shadui";

import { IForgotPasswordProps } from "./ForgotPassword.interfaces";

const ForgotPasswordModal: React.FC<IForgotPasswordProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-sm px-2">
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
          <p className="text-sm text-gray-400 w-3/4 text-left">Enter your registered email</p>
        </div>
        <div className="flex justify-between w-3/4 mx-auto mt-4">
          <Button onClick={onClose} className="bg-purple-600 text-white hover:bg-purple-500">
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(email)}
            className="bg-green-600 text-white hover:bg-green-500"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
