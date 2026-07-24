import { type Student, type Course, type Enrollment } from "../libs/types.js";

export let students: Student[] = [
  {
    studentId: "680610001",
    firstName: "Matt",
    lastName: "Damon",
    program: "CPE",
    programId: 101,
  },
  {
    studentId: "680610002",
    firstName: "Cillian",
    lastName: "Murphy",
    program: "CPE",
    programId: 101,
    courses: ["261207", "261497"],
  },
  {
    studentId: "680615003",
    firstName: "Emily",
    lastName: "Blunt",
    program: "ISNE",
    programId: 102,
    courses: ["269101", "261497"],
  },
];

export let courses: Course[] = [
  {
    courseId: "261207",
    courseTitle: "Basic Computer Engineering Lab",
    instructors: ["Dome", "Chanadda"],
  },
  {
    courseId: "261497",
    courseTitle: "Full Stack Development",
    instructors: ["Dome", "Nirand", "Chanadda"],
  },
  {
    courseId: "269101",
    courseTitle: "Introduction to Information Systems and Network Engineering",
    instructors: ["KENNETH COSH"],
  },
];

export let enrollments: Enrollment[] = [
  {
    studentId: "680610002",
    courseId: "261207",
  },
  {
    studentId: "680610002",
    courseId: "261497",
  },
  {
    studentId: "680615003",
    courseId: "269101",
  },
  {
    studentId: "680615003",
    courseId: "261497",
  },
];

export const DB = {
  students,
  courses,
  enrollments,
};

// For resetting the database to its original state
// const org_users = structuredClone(users);
const org_students = structuredClone(students);
const org_courses = structuredClone(courses);
const org_enrollments = structuredClone(enrollments);

export function reset_db() {
  // users = structuredClone(org_users);
  students = structuredClone(org_students);
  courses = structuredClone(org_courses);
  enrollments = structuredClone(org_enrollments);
}

export function reset_users() {
  // users = structuredClone(org_users);
}
export function reset_students() {
  students = structuredClone(org_students);
}
export function reset_courses() {
  courses = structuredClone(org_courses);
}
export function reset_enrollments() {
  enrollments = structuredClone(org_enrollments);
}