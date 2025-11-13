const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// ======= Show Register Form =======
router.get("/register", (req, res) => {
  res.render("register");
});

// ======= Register User =======
router.post("/register", async (req, res) => {
  const { name, email, gender, phone_no, password, role, course_id } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate user_id
    db.query("SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1", (err, result) => {
      if (err) throw err;

      let lastId = result.length ? result[0].user_id : "us1000";
      let number = parseInt(lastId.slice(2)) + 1;
      let newUserId = "us" + number;

      // Insert user
      const sql = `INSERT INTO users (user_id, role, name, email, gender, phone_no, password, course_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(sql, [newUserId, role, name, email, gender, phone_no, hashedPassword, course_id], (err, result) => {
        if (err) {
          console.error(err);
          return res.send("Error registering user");
        }
        res.send("User registered successfully!");
      });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// ======= Show Login Form =======
router.get("/login", (req, res) => {
  res.render("login");
});

// ======= Login User =======
router.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  db.query("SELECT * FROM users WHERE email = ? AND role = ?", [email, role], async (err, result) => {
      if (err) throw err;

      if (result.length === 0) return res.send("Invalid email or role");

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.send("Invalid password");

      // Store user info in session
      req.session.user = {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role
      };

      res.redirect("/dashboard");  // redirect to dashboard after login
  });
});

module.exports = router;
