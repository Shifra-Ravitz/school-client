import type { ClassSummary, Role } from "./common";

export interface User {
  id: number;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string | null;
  phone: string | null;
  address: string | null;
  birthDate: string | null;
  hebrewBirthDate: string | null;
  classId: number | null;
  class: ClassSummary | null;
  isActive: boolean;
  createdAt: string;
}

export interface UserWithSchool extends User {
  school: {
    id: number;
    name: string;
    city: string | null;
  };
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: string;
  user: UserWithSchool;
}

export interface MeResponse {
  user: UserWithSchool;
}
