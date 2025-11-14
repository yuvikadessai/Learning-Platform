const db = require("../config/db");

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
}

// Show dashboard
const showDashboard = (req, res) => {
    const user = req.session.user;

    // Fetch course name if course_id exists
    if (user.course_id) {
        db.query(
            "SELECT course_name FROM course WHERE course_id = ?",
            [user.course_id],
            (err, result) => {
                if (err) throw err;

                const courseName = result.length ? result[0].course_name : "Not selected";
                res.render("dashboard", { user, courseName });
            }
        );
    } else {
        res.render("dashboard", { user, courseName: "Not selected" });
    }
};

module.exports = {
    isLoggedIn,
    showDashboard
};
