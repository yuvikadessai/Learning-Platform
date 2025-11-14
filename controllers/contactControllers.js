const db = require("../config/db");
const nodemailer = require("nodemailer");

// Show Contact Form
const showContactForm = (req, res) => {
    res.render("contact");
};

// Handle form submission
const submitContactForm = (req, res) => {
    const { name, email, subject, message } = req.body;

    // Insert into database
    const sql = "INSERT INTO contact (name, email,message) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("Error saving message to database");
        }

        // Send email notification
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS  // your app password
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                return res.send("Message saved, but email failed to send");
            }
            res.send("Message sent successfully!");
        });
    });
};

module.exports = {
    showContactForm,
    submitContactForm
};
