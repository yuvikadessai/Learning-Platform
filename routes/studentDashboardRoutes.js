const express = require("express");
const router = express.Router();
const { isLoggedIn, showDashboard } = require("../controllers/studentDashboardController");

// GET Dashboard
router.get("/dashboard", isLoggedIn, showDashboard);

module.exports = router;
