const db = require("../config/db");

// Middleware to check login
function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
}

// Get subjects for logged-in student
const getSubjectsForStudent = (req, res, next) => {
    const user = req.session.user;

    if (!user.course_id) {
        // If no course selected, skip subjects
        req.subjects = [];
        return next();
    }

    db.query(
        "SELECT * FROM subjects WHERE course_id = ?",
        [user.course_id],
        (err, result) => {
            if (err) throw err;
            req.subjects = result;
            next();
        }
    );
};

module.exports = {
    isLoggedIn,
    getSubjectsForStudent
};
