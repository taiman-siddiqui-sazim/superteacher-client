export type TClassroom = {
    id?: number;
    title: string;
    subject: string;
    class_time: string;
    days_of_week: Array<string>;
    teacher_id: number;
  };

export type TClassroomResponse = {
    id: number;
    title: string;
    subject: string;
    class_time: string;
    days_of_week: Array<string>;
  };
