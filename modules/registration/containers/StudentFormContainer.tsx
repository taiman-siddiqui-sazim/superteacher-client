import React from "react";

import Link from "next/link";

import StudentForm from "@/modules/registration/components/student/StudentForm";

const StudentFormContainer: React.FC = () => (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 md:px-10 py-10">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mb-6 text-center">
        REGISTER AS A STUDENT
      </h1>
      <div className="w-full max-w-3xl">
        <StudentForm />
      </div>
      <div className="flex items-center space-x-2 mt-10">
        <span className="sm:text-base text-white-500">Already have an account?</span>
        <Link href="/login" className="sm:text-base text-green-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );

export default StudentFormContainer;
