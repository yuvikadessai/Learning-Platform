const db = require("../config/db");

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
}

// Show all courses for selection
const showCourses = (req, res) => {
    const user = req.session.user;

    // Check if student already has a course selected
    if (user.course_id) {
        return res.redirect("/dashboard");
    }

    db.query("SELECT * FROM course", (err, courses) => {
        if (err) throw err;
        res.render("selectCourse", { user, courses });
    });
};

// Handle course selection
const selectCourse = (req, res) => {
    const userId = req.session.user.id;
    const { course_id } = req.body;

    db.query(
        "UPDATE users SET course_id = ? WHERE user_id = ?",
        [course_id, userId],
        (err, result) => {
            if (err) throw err;

            // Update session info
            req.session.user.course_id = course_id;

            res.redirect("/dashboard");
        }
    );
};

module.exports = {
    isLoggedIn,
    showCourses,
    selectCourse
};
