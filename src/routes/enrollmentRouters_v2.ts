import { Router, type Request, type Response } from "express";
import { zEnrollmentBody } from "../libs/zodValidators.js";

import { enrollments } from "../db/db.js";
import type { Enrollment } from "../libs/types.js";

const router = Router();

router.delete("/", (req: Request, res: Response) => {
    try{
    const { studentId, courseNo } = req.body;

    const re_name = {
      studentId: studentId,
      courseId: courseNo,
    };
    const val = zEnrollmentBody.safeParse(re_name);
    
    if (!val.success) {
      return res.status(400).json({
        ok : false,
        message: val.error.issues[0]?.message,
      });
    }
    const foundIndex = enrollments.findIndex(
        (s) => s.studentId === val.data.studentId && s.courseId === val.data.courseId);

    if (foundIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Enrollment does not exist",
      });
    }
      enrollments.splice(foundIndex ,1)
      return res.status(200).json({
        success: true,
        message: `Enrollment has been deleted`,
      });
    
  } catch (err){
    return res.json({
      success: false,
      message: "Somthing is wrong, please try again",
      error: err,
    });
  }
});

export default router;