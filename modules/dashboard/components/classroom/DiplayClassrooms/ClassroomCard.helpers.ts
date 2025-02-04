import { ESubjects } from "@/shared/typedefs/enums";

const subjectColors: { [key in ESubjects]: string } = {
  [ESubjects.Physics]: "bg-teal-500",
  [ESubjects.Mathematics]: "bg-indigo-500",
  [ESubjects.Chemistry]: "bg-purple-500",
  [ESubjects.Biology]: "bg-blue-500",
  [ESubjects.English]: "bg-green-500",
  [ESubjects.Bangla]: "bg-red-500",
};

export const getColorForSubject = (subject: ESubjects): string =>
  subjectColors[subject] || "bg-gray-500";
