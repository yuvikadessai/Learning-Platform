const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = adminController;

// Admin dashboard
router.get("/admin", isAdmin, adminController.showAdminDashboard);

// View students
router.get("/admin/students", isAdmin, adminController.viewStudents);

// View courses
router.get("/admin/courses", isAdmin, adminController.viewCourses);

// View subjects
router.get("/admin/subjects", isAdmin, adminController.viewSubjects);

// Add course
router.get("/admin/course/add", isAdmin, adminController.showAddCourseForm);
router.post("/admin/course/add", isAdmin, adminController.addCourse);

// Add subject
router.get("/admin/subject/add", isAdmin, adminController.showAddSubjectForm);
router.post("/admin/subject/add", isAdmin, adminController.addSubject);

module.exports = router;
