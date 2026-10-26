import type { Person, Subject } from "./common";




// הציונים של התלמידה (Grades)

export interface MyExam {
  id: number;
  title: string;
  date: string;
  weight: number;
  score: number | null;
  evaluation: string | null;
}

export interface MyPeriod {
  id: number;
  name: string;
  weight: number;
  examsWeight: number;
  isComplete: boolean;
  grade: number | null;
  exams: MyExam[];
}

export interface MySubject {
  assignmentId: number;
  subject: Subject;
  teacher: Person;
  periods: MyPeriod[];
  annualGrade: number | null;
  canCalculateAnnual: boolean;
  problems: string[];
}

export interface MyGradesResponse {
  subjects: MySubject[];
}
