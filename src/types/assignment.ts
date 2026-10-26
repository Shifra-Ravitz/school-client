import type { ClassSummary, Person, Subject } from "./common";

export interface Assignment {
  id: number;
  class: ClassSummary;
  subject: Subject;
  teacher: Person;
  studentsCount: number;
}

export interface PeriodStatus {
  id: number;
  name: string;
  weight: number;
  sortOrder: number;
  examsCount: number;
  examsWeight: number;
  isComplete: boolean;
}

export interface PeriodsResponse {
  items: PeriodStatus[];
  totalWeight: number;
  canCalculateAnnual: boolean;
  problems: string[];
}
//טבלת הציונים של המורה (AllGrades)
export interface ExamSummary {
  id: number;
  title: string;
  date: string;
  weight: number;
}

export interface FinalPeriod extends PeriodStatus {
  exams: ExamSummary[];
}

export interface FinalStudentRow {
  studentId: number;
  firstName: string;
  lastName: string;
  // המפתח: מזהה מבחן (או תקופה) כמחרוזת
  scores: Record<string, number | null>;
  evaluations: Record<string, string | null>;
  periodGrades: Record<string, number | null>;
  annualGrade: number | null;
}

export interface FinalGradesResponse {
  // בלי studentsCount
  assignment: Omit<Assignment, "studentsCount">;
  periods: FinalPeriod[];
  periodsWeight: number;
  canCalculateAnnual: boolean;
  problems: string[];
  students: FinalStudentRow[];
}