 // Database simulation
 let users = [
    { id: 1, name: 'Admin User', email: 'admin@learn.com', password: 'admin123', role: 'admin' },
    { id: 2, name: 'John Student', email: 'student@learn.com', password: 'student123', role: 'student', enrolledCourses: [] }
];

const courses = [
    { id: 1, title: 'Web Development Fundamentals', instructor: 'Dr. Sarah Johnson', duration: '12 weeks', students: 234, level: 'Beginner', description: 'Learn HTML, CSS, and JavaScript from scratch', progress: 45 },
    { id: 2, title: 'Advanced React & Node.js', instructor: 'Prof. Michael Chen', duration: '10 weeks', students: 156, level: 'Advanced', description: 'Build full-stack applications with React and Node.js', progress: 30 },
    { id: 3, title: 'Data Science with Python', instructor: 'Dr. Emily Brown', duration: '14 weeks', students: 189, level: 'Intermediate', description: 'Master data analysis and machine learning', progress: 60 },
    { id: 4, title: 'UI/UX Design Principles', instructor: 'Sarah Williams', duration: '8 weeks', students: 201, level: 'Beginner', description: 'Create beautiful and intuitive user interfaces', progress: 80 },
    { id: 5, title: 'Cloud Computing with AWS', instructor: 'James Anderson', duration: '12 weeks', students: 145, level: 'Advanced', description: 'Deploy and manage applications on AWS', progress: 20 },
    { id: 6, title: 'Mobile App Development', instructor: 'Lisa Martinez', duration: '16 weeks', students: 178, level: 'Intermediate', description: 'Build iOS and Android apps with React Native', progress: 55 }
];

let currentUser = null;

// Show/Hide pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        document.getElementById('loginError').style.display = 'none';
        
        if (user.role === 'admin') {
            document.getElementById('userNameAdmin').textContent = user.name;
            loadAdminDashboard();
            showPage('adminDashboard');
        } else {
            document.getElementById('userNameCourse').textContent = user.name;
            document.getElementById('userNameStudent').textContent = user.name;
            loadCourses();
            showPage('courseSelectionPage');
        }
    } else {
        document.getElementById('loginError').textContent = 'Invalid email or password';
        document.getElementById('loginError').style.display = 'block';
    }
});

// Register
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    document.getElementById('registerError').style.display = 'none';
    document.getElementById('registerSuccess').style.display = 'none';
    
    if (password !== confirmPassword) {
        document.getElementById('registerError').textContent = 'Passwords do not match';
        document.getElementById('registerError').style.display = 'block';
        return;
    }
    
    if (users.find(u => u.email === email)) {
        document.getElementById('registerError').textContent = 'Email already exists';
        document.getElementById('registerError').style.display = 'block';
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        role: 'student',
        enrolledCourses: []
    };
    
    users.push(newUser);
    
    document.getElementById('registerSuccess').textContent = 'Registration successful! Please login.';
    document.getElementById('registerSuccess').style.display = 'block';
    document.getElementById('registerForm').reset();
    
    setTimeout(() => showPage('loginPage'), 2000);
});

// Load courses
function loadCourses() {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = '';
    
    courses.forEach(course => {
        const isEnrolled = currentUser.enrolledCourses && currentUser.enrolledCourses.includes(course.id);
        
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <div class="course-meta">
                <strong>Instructor:</strong> ${course.instructor}<br>
                <strong>Duration:</strong> ${course.duration}
            </div>
            <div class="course-description">${course.description}</div>
            <span class="course-level">${course.level}</span>
            <button class="enroll-btn" onclick="enrollCourse(${course.id})" ${isEnrolled ? 'disabled' : ''}>
                ${isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
            </button>
        `;
        grid.appendChild(card);
    });
}

// Enroll in course
function enrollCourse(courseId) {
    if (!currentUser.enrolledCourses) {
        currentUser.enrolledCourses = [];
    }
    
    if (!currentUser.enrolledCourses.includes(courseId)) {
        currentUser.enrolledCourses.push(courseId);
        
        // Update user in database
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        users[userIndex] = currentUser;
        
        loadCourses();
        updateStudentDashboard();
        showPage('studentDashboard');
    }
}

// Update student dashboard
function updateStudentDashboard() {
    const enrolledCourses = currentUser.enrolledCourses || [];
    document.getElementById('enrolledCount').textContent = enrolledCourses.length;
    document.getElementById('completedCount').textContent = Math.floor(enrolledCourses.length * 0.3);
    document.getElementById('hoursSpent').textContent = enrolledCourses.length * 15;
    
    const coursesList = document.getElementById('myCoursesList');
    coursesList.innerHTML = '';
    
    enrolledCourses.forEach(courseId => {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            const item = document.createElement('div');
            item.className = 'course-item';
            item.innerHTML = `
                <h4>${course.title}</h4>
                <p style="color: #666; font-size: 14px;">Instructor: ${course.instructor}</p>
                <div style="margin-top: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-size: 14px; color: #666;">Progress</span>
                        <span style="font-size: 14px; color: #667eea; font-weight: 600;">${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
            `;
            coursesList.appendChild(item);
        }
    });
}

// Load admin dashboard
function loadAdminDashboard() {
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalCourses').textContent = courses.length;
    
    let totalEnrollments = 0;
    users.forEach(user => {
        if (user.enrolledCourses) {
            totalEnrollments += user.enrolledCourses.length;
        }
    });
    document.getElementById('totalEnrollments').textContent = totalEnrollments;
    
    // Users table
    const usersTable = document.getElementById('usersTableBody');
    usersTable.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge badge-${user.role}">${user.role.toUpperCase()}</span></td>
            <td>${user.enrolledCourses ? user.enrolledCourses.length : 0}</td>
        `;
        usersTable.appendChild(row);
    });
    
    // Courses table
    const coursesTable = document.getElementById('coursesTableBody');
    coursesTable.innerHTML = '';
    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td>${course.duration}</td>
            <td>${course.students}</td>
        `;
        coursesTable.appendChild(row);
    });
}

// Logout
function logout() {
    currentUser = null;
    document.getElementById('loginForm').reset();
    showPage('loginPage');
}