import { TClassroom } from '@/shared/redux/rtk-apis/classrooms/classroom.types';

export interface IEditClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroom: TClassroom;
}

export interface IDeleteClassroomModalProps {
    isOpen: boolean;
    onClose: () => void;
    classroomId: number;
}
