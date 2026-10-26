import type { Person } from "./common";

export interface Exam {
  id: number;
  title: string;
  date: string;
  weight: number;
  description: string | null;
  period: {
    id: number;
    name: string;
  };
  assignmentId: number;
  gradesCount: number;
  average: number | null;
}

// הטופס ב־ExamForm
export interface ExamInput {
  title: string;
  date: string;
  periodId: number;
  weight: number;
  description: string | null;
}

export interface ExamGradeItem {
  student: Person;
  score: number | null;
  evaluation: string | null;
}

export interface ExamGradesResponse {
  exam: Exam;
  items: ExamGradeItem[];
}

// נשלח ב־PUT /exams/{id}/grades בתוך { grades: [...] }
export interface GradeInput {
  studentId: number;
  score: number | null;
  evaluation?: string | null;
}
