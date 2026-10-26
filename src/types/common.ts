export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}
export type Role = "PRINCIPAL" | "TEACHER" | "STUDENT";

export interface ClassSummary {
  id: number;
  name: string;
  gradeLevel: number;
  parallel: number;
  schoolYear: string;
}

export interface Subject {
  id: number;
  name: string;
}

// שגיאה מהשרת: 
export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  // 400: רשימת שדות שגויים. 422: המשקל המקסימלי שעוד אפשר
  details?: FieldError[] | { maxAllowed: number };
}

