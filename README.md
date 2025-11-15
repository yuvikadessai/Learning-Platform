# 🎓 Learning Platform

A comprehensive web-based learning management system with role-based authentication, course management, and separate dashboards for students and administrators.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Default Credentials](#default-credentials)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Authentication System
- **User Registration** - New users can create accounts (default role: student)
- **User Login** - Secure authentication with role-based routing
- **Role-Based Access Control** - Different dashboards for students and admins

### Student Features
- 📚 Browse and enroll in courses
- 📊 View personalized dashboard with progress tracking
- 📈 Track enrolled courses and completion status
- ⏱️ Monitor learning hours
- 🎯 View course progress with visual indicators

### Admin Features
- 👥 View all registered users
- 📋 Manage course catalog
- 📊 Monitor platform statistics
- 👨‍🎓 Track total enrollments
- 📈 View user roles and activity

### Course Management
- Multiple courses with detailed information
- Course instructors and duration
- Difficulty levels (Beginner, Intermediate, Advanced)
- Student enrollment tracking
- Progress monitoring

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (Custom styling with gradients and animations)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- MySQL/Database connection

**Additional:**
- RESTful API architecture
- MVC design pattern
- Responsive design

## 📁 Project Structure

```
LEARNING_PLATFORM/
│
├── config/
│   └── db.js                      # Database configuration
│
├── controllers/
│   ├── adminDashboardController.js    # Admin dashboard logic
│   ├── contactControllers.js          # Contact form handling
│   ├── courseControllers.js           # Course management
│   ├── studentDashboardController.js  # Student dashboard logic
│   ├── subjectsController.js          # Subject management
│   └── userController.js              # User authentication & management
│
├── node_modules/                  # Dependencies (not in git)
│
├── routes/
│   ├── adminDashboardRoutes.js    # Admin routes
│   ├── contactRoutes.js           # Contact routes
│   ├── courseRoutes.js            # Course routes
│   ├── studentDashboardRoutes.js  # Student routes
│   ├── subjectsRoutes.js          # Subject routes
│   └── userRoutes.js              # User authentication routes
│
├── .env                           # Environment variables (not in git)
├── .gitignore                     # Git ignore file
├── index.html                     # Main frontend HTML
├── package-lock.json              # Locked dependencies
├── package.json                   # Project dependencies
├── README.md                      # Project documentation
├── script.js                      # Frontend JavaScript
├── server.js                      # Express server entry point
└── styles.css                     # Frontend styles
```

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/learning-platform.git
   cd learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/learning_platform
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🚀 Usage

### For Students

1. **Register**: Create a new account (automatically assigned student role)
2. **Login**: Access your account
3. **Browse Courses**: View available courses
4. **Enroll**: Click "Enroll Now" on desired courses
5. **Dashboard**: Track your progress and enrolled courses

### For Administrators

1. **Login**: Use admin credentials
2. **Dashboard**: Automatically redirected to admin panel
3. **Manage Users**: View all registered users and their roles
4. **Monitor Courses**: Track course statistics and enrollments
5. **Platform Overview**: View overall platform metrics

## 🔌 API Endpoints

### Authentication
```
POST   /api/users/register       # Register new user
POST   /api/users/login          # User login
GET    /api/users/profile        # Get user profile
```

### Courses
```
GET    /api/courses              # Get all courses
GET    /api/courses/:id          # Get course by ID
POST   /api/courses              # Create course (admin)
PUT    /api/courses/:id          # Update course (admin)
DELETE /api/courses/:id          # Delete course (admin)
POST   /api/courses/enroll       # Enroll in course
```

### Admin
```
GET    /api/admin/users          # Get all users
GET    /api/admin/stats          # Get platform statistics
PUT    /api/admin/users/:id      # Update user role
```

### Student Dashboard
```
GET    /api/student/dashboard    # Get student dashboard data
GET    /api/student/courses      # Get enrolled courses
GET    /api/student/progress     # Get learning progress
```

## 🔐 Default Credentials

### Admin Account
```
Email: admin@learn.com
Password: admin123
```

### Student Account
```
Email: student@learn.com
Password: student123
```

> ⚠️ **Important**: Change these credentials in production!

# Contributions

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow MVC architecture
- Use ESLint for code consistency
- Write meaningful commit messages
- Add comments for complex logic
- Test before pushing

## 🐛 Known Issues

- Progress tracking is currently simulated (needs backend integration)
- File upload for profile pictures not yet implemented
- Email verification pending

## 🔮 Future Enhancements

- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Real-time notifications
- [ ] Video course content
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Discussion forums
- [ ] Mobile app version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern learning platforms
- Built with love for education

## 📞 Support

For support, email support@learningplatform.com or open an issue in the repository.

---

**Happy Learning! 🎉**
