import React, { useState } from 'react';

import { FaCalendarAlt, FaClock, FaUsers, FaEllipsisV } from 'react-icons/fa';
import { v5 as uuidv5 } from 'uuid';

import DeleteClassroomModal from '@/modules/dashboard/components/classroom/UpdateClassroom/DeleteClassroomModal';
import EditClassroomModal from '@/modules/dashboard/components/classroom/UpdateClassroom/EditClassroomModal';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/shadui';
import { ID_NAMESPACE } from '@/shared/constants/app.constants';
import { TClassroom } from '@/shared/redux/rtk-apis/classrooms/classroom.types';
import { ESubjects } from "@/shared/typedefs/enums";

import { getColorForSubject } from './ClassroomCard.helpers';


const NAMESPACE = ID_NAMESPACE;

const ClassroomCard = ({ classroom }: { classroom: TClassroom }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    if (hours && minutes) {
      date.setHours(parseInt(hours), parseInt(minutes));
    } else {
      return timeString;
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const classroomUUID = uuidv5((classroom.id ?? '').toString(), NAMESPACE);

  const handleDeleteClassroom = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Card className="max-w-xs bg-white rounded-lg mt-2 relative">
        <CardHeader className={`${getColorForSubject(classroom.subject as ESubjects)} rounded-t-lg`}>
          <div className="flex justify-between w-full">
            <div>
              <CardTitle className="text-2xl font-semibold">{classroom.title}</CardTitle>
              <p className='mt-1 text-sm'>{classroom.subject}</p>
            </div>
            <FaEllipsisV className="text-white cursor-pointer mt-2" onClick={toggleMenu} />
          </div>
          {isMenuOpen && (
            <div className="absolute top-12 right-0 bg-gray-800 text-white p-2 rounded shadow-lg z-10">
              <ul>
                <li className="py-3 px-4 text-lg hover:bg-gray-700 cursor-pointer" onClick={handleOpenEditModal}>
                  Edit
                </li>
                <li className="py-3 px-4 text-lg hover:bg-gray-700 cursor-pointer" onClick={handleDeleteClassroom}>
                  Delete
                </li>
              </ul>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-2 bg-gray-800 text-sm text-white p-4 ">
          <div className="flex items-center text-gray-400">
            <FaCalendarAlt className="mr-2" />
            <p>{classroom.days_of_week.join(', ')}</p>
          </div>
          <div className="flex items-center text-gray-400">
            <FaClock className="mr-2" />
            <p>{formatTime(classroom.class_time)}</p>
          </div>
          <div className="flex items-center text-gray-400">
            <FaUsers className="mr-2" />
            <p>0</p>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-700 rounded-b-lg flex items-center p-3">
          <span className='text-gray-500'>ID: {classroomUUID}</span>
        </CardFooter>
      </Card>
      <EditClassroomModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} classroom={classroom} />
      {classroom.id !== undefined && (
        <DeleteClassroomModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} classroomId={classroom.id} />
      )}
    </>
  );
};

export default ClassroomCard;
