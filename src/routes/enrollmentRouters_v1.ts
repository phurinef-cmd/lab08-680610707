import { Router, type Request, type Response } from "express";

import {
  zStudentPostBody,
  zStudentPutBody,
  zStudentId,
  zCourseId,
} from "../libs/zodValidators.js";

import type { Student, Course } from "../libs/types.js";

// import database
import { students, courses, enrollments } from "../db/db.js";
import { en } from "zod/locales";
// create a new router

const router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const courseNo = req.query.courseNo ;
    const studentId = req.query.studentId ;

    if((!courseNo && !studentId)||(courseNo && studentId)){
      return res.status(400).json({
        ok : false ,
        message: "Please provide either studentId or CourseNo and not both",
      });
    }

    else if (courseNo){
      const c_course = zCourseId.safeParse(courseNo);
      if(!c_course.success){
        return res.status(400).json({
          ok : false,
          message : c_course.error.issues[0]?.message,
        });
      }
      let student_list = [];
      for (const e of enrollments){
        if(e.courseId === courseNo){
          student_list.push(e.studentId);
        }
      }
      
      let result_data = [];
      for(const s of students){
        if (student_list.includes(s.studentId)){
          result_data.push({
            studentId: s.studentId,
            firstName: s.firstName,
            lastName: s.lastName,
            program: s.program,
            programId : s.programId,
          });
        }
      }
      return res.status(200).json({
        ok : true,
        students : result_data,
      });
    } 
    else if(studentId){
      const c_student = zStudentId.safeParse(studentId);
      if (!c_student.success){
        return res.status(400).json({
          ok : false,
          massage : c_student.error.issues[0]?.message,
        });
      }
      let course_list = [];
      for (const e of enrollments){
        if (e.studentId === studentId){
          course_list.push(e.courseId);
        }
      }

      let result_data = [];
      for (const c of courses) {
        if (course_list.includes(c.courseId)) {
          result_data.push({
            courseNo: c.courseId,
            title: c.courseTitle,
          });
        }
      }
      return res.status(200).json({
        ok : true,
        courses : result_data,
      });

    }

    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

// GET /api/v2/students/{studentId}
router.get("/:studentId", (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = zStudentId.safeParse(studentId);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues[0]?.message,
      });
    }

    const foundIndex = students.findIndex(
      (std: Student) => std.studentId === studentId
    );

    if (foundIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Student does not exists",
      });
    }

    res.json({
      success: true,
      data: students[foundIndex],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

export default router;