import React, { useState } from "react";

import { FaPlus } from "react-icons/fa";

import ClassroomModal from "@/modules/dashboard/components/classroom/CreateClassroom/ClassroomModal";
import DisplayClassrooms from "@/modules/dashboard/components/classroom/DiplayClassrooms/DisplayClassrooms";
import Navbar from "@/shared/components/Navbar";
import { Button } from "@/shared/components/shadui";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { useGetClassroomsQuery } from "@/shared/redux/rtk-apis/classrooms/classroom.api";

const TeacherDashboardContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useSessionContext();
  const {
    data: classrooms,
    isLoading,
    isError,
  } = useGetClassroomsQuery(user?.id ? user.id.toString() : "");

  const handleOpenClassroomModal = () => {
    setIsDialogOpen(true);
  };

  const handleCloseClassroomModal = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setIsDialogOpen={setIsDialogOpen} />
      <div className="flex flex-1 flex-col items-center justify-start w-full h-full px-2">
        {isLoading ? (
          <div className="flex flex-1 justify-center items-center w-full">
            <p>Loading...</p>
          </div>
        ) : !isError && classrooms && classrooms.length > 0 ? (
          <DisplayClassrooms classrooms={classrooms} />
        ) : (
          <div className="flex flex-1 justify-center items-center w-full">
            <Button
              onClick={handleOpenClassroomModal}
              className="flex items-center bg-transparent text-white-600 text-lg md:text-2xl lg:text-xl hover:bg-blue-700 border border-white-500 p-6 rounded-full"
            >
              <FaPlus size={24} />
              <span className="ml-3">Create Classroom</span>
            </Button>
          </div>
        )}
        <ClassroomModal isOpen={isDialogOpen} onClose={handleCloseClassroomModal} />
      </div>
    </div>
  );
};

export default TeacherDashboardContainer;
