const express = require("express");
const router = express.Router();
const { showContactForm, submitContactForm } = require("../controllers/contactController");

// GET Contact Form
router.get("/contact", showContactForm);

// POST Contact Form
router.post("/contact", submitContactForm);

module.exports = router;
