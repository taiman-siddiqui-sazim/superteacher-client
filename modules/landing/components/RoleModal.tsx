import React, { useState } from "react";

import { useRouter } from "next/router";

import { LuGraduationCap } from "react-icons/lu";
import { TbBooks } from "react-icons/tb";

import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/shadui/dialog";

import { TRoleModalProps } from "./RoleModal.types";


const RoleModal: React.FC<TRoleModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentClick = () => {
    setIsLoading(true);
    onClose();
    router.push("/register/student");
  };

  const handleTeacherClick = () => {
    setIsLoading(true);
    onClose();
    router.push("/register/teacher");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="relative inset-0 bg-black opacity-50" />
      <DialogContent className="bg-white w-[80%] lg:w-[60%] lg:h-[60vh] rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full sm:h-auto md:w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-center text-black font-bold">Choose your role</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row justify-center items-center text-black p-4 pt-2">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div onClick={handleStudentClick} className="common-box-styles mb-4 lg:mb-0 lg:mr-4">
                <TbBooks size={28} className="mr-1" />
                <span>Student</span>
              </div>
              <div onClick={handleTeacherClick} className="common-box-styles">
                <LuGraduationCap size={28} className="mr-1" />
                <span>Teacher</span>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleModal;
