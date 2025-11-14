const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/studentDashboardRoutes");
const subjectsRoutes = require("./routes/subjectsRoutes");
const adminRoutes = require("./routes/adminRoutes");






dotenv.config();
const app = express();

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", userRoutes);
app.use("/", courseRoutes);
app.use("/", contactRoutes);
app.use("/", dashboardRoutes);
app.use("/", subjectsRoutes);
app.use("/", adminRoutes);

app.use(session({
    secret: "yourSecretKey",   // change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
