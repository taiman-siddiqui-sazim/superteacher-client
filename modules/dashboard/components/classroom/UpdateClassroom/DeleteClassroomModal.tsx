import React from 'react';

import { toast } from 'sonner';

import { Dialog, DialogContent, Button } from '@/shared/components/shadui';
import { useDeleteClassroomMutation } from '@/shared/redux/rtk-apis/classrooms/classroom.api';

import { IDeleteClassroomModalProps } from './UpdateClassroom.interfaces';


const DeleteClassroomModal: React.FC<IDeleteClassroomModalProps> = ({ isOpen, onClose, classroomId }) => {
  const [deleteClassroom] = useDeleteClassroomMutation();

  const handleDelete = async () => {
    try {
      await deleteClassroom(classroomId.toString()).unwrap();
      toast.success("Classroom deleted successfully!");
      onClose();
    } catch (error) {
      const errorMessage = (error as { data?: { message?: string[] } })?.data?.message?.[0] || "Something went wrong";
      toast.error("Classroom deletion failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-xs md:max-w-md px-4">
        <div className="p-4 text-center text-black text-lg font-bold">
          <p>Are you sure you want to delete this classroom?</p>
        </div>
        <div className="flex justify-between p-2">
          <Button className="bg-gray-600 text-white text-lg hover:bg-gray-500" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-red-600 text-white text-lg hover:bg-red-500" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteClassroomModal;
