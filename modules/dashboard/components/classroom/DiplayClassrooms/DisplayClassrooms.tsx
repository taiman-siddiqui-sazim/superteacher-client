import React from "react";

import { TClassroom } from "@/shared/redux/rtk-apis/classrooms/classroom.types";

import ClassroomCard from "./ClassroomCard";

interface DisplayClassroomsProps {
  classrooms: TClassroom[];
}

const DisplayClassrooms: React.FC<DisplayClassroomsProps> = ({ classrooms }) => (
  <div className="w-3/4 md:w-4/5 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {classrooms.map((classroom) => (
      <div key={classroom.id} className="p-2">
        <ClassroomCard classroom={classroom} />
      </div>
    ))}
  </div>
);

export default DisplayClassrooms;
