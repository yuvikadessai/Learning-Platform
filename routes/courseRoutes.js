const express = require("express");
const router = express.Router();
const { isLoggedIn, showCourses, selectCourse } = require("../controllers/courseControllers");

// GET route to show courses
router.get("/select-course", isLoggedIn, showCourses);

// POST route to save selected course
router.post("/select-course", isLoggedIn, selectCourse);

module.exports = router;
