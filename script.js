document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }

    // Database Generator Logic
    const initDatabase = () => {
        if (!localStorage.getItem('rockstar_students')) {
            const firstNames = ["Ahmad", "Muhammad", "Abdullah", "Ali", "Yusuf", "Umar", "Hasan", "Husain", "Zaid", "Faris", "Hamzah", "Bilal", "Ibrahim", "Yahya", "Idris", "Sulaiman", "Dawud", "Adam", "Isa", "Musa"];
            const lastNames = ["Fauzan", "Rahman", "Hidayat", "Pratama", "Siddiq", "Hakim", "Zaki", "Arifin", "Maulana", "Ihsan", "Fikri", "Akbar", "Syahputra", "Munir", "Aziz", "Karim", "Latif", "Nasir", "Wafi", "Ghazali"];
            const levels = ["Early Childhood", "Kindergarten", "Primary School", "Secondary School"];
            const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

            const students = [];
            for (let i = 1; i <= 200; i++) {
                const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const level = levels[Math.floor(Math.random() * levels.length)];
                const grade = grades[Math.floor(Math.random() * grades.length)];
                const tahfizh = Math.floor(Math.random() * 31); // 0 to 30 Juz
                const score = 70 + Math.floor(Math.random() * 30); // 70 to 100

                students.push({
                    id: `STU${1000 + i}`,
                    name: `${fName} ${lName}`,
                    level: level,
                    grade: grade,
                    tahfizh: tahfizh,
                    score: score,
                    status: Math.random() > 0.1 ? "Active" : "Inactive"
                });
            }
            localStorage.setItem('rockstar_students', JSON.stringify(students));
        }

        if (!localStorage.getItem('rockstar_teachers')) {
            const teachers = [];
            const subjects = ["Tahfizh", "Arabic", "Islamic Studies", "Mathematics", "Science", "English", "History", "Computer Science"];
            const ustadzNames = ["Ahmad Rahman", "Muhammad Ali", "Abdullah Yusuf", "Umar Faruq", "Hasan Basri", "Husain Kamil", "Zaid Harithah", "Faris Akram", "Hamzah Khalid", "Bilal Habashi", "Ibrahim Khalil", "Yahya Zakaria", "Idris Nuh", "Sulaiman Daud", "Adam Hawa", "Isa Maryam", "Musa Harun", "Yusuf Yaqub", "Luth Shuaib", "Salih Hud", "Ayyub Yunus", "Zakaria Yahya", "Al-Ghazali", "Ibn Sina", "Al-Khwarizmi"];

            for (let i = 0; i < 25; i++) {
                teachers.push({
                    id: `TCH${2000 + i}`,
                    name: `Ustadz ${ustadzNames[i % ustadzNames.length]}`,
                    subject: subjects[Math.floor(Math.random() * subjects.length)],
                    education: "Islamic University of Madinah / Al-Azhar University",
                    experience: `${3 + Math.floor(Math.random() * 15)} Years`
                });
            }
            localStorage.setItem('rockstar_teachers', JSON.stringify(teachers));
        }

        if (!localStorage.getItem('rockstar_achievements')) {
            const achievements = [];
            const competitions = ["International Robotics Olympiad", "Regional Tahfizh Competition", "Global Arabic Debate", "National Science Fair", "Islamic Calligraphy Contest", "Quranic Recitation Award", "Young Muslim Entrepreneur Summit", "Asian Mathematics Challenge"];
            const awards = ["Gold Medal", "First Place", "Second Place", "Best Speaker", "Excellence Award", "Silver Medal", "Innovation Prize"];
            const students = JSON.parse(localStorage.getItem('rockstar_students'));

            for (let i = 0; i < 50; i++) {
                const student = students[Math.floor(Math.random() * students.length)];
                achievements.push({
                    competition: competitions[Math.floor(Math.random() * competitions.length)],
                    student: student.name,
                    year: 2024 + Math.floor(Math.random() * 3),
                    award: awards[Math.floor(Math.random() * awards.length)]
                });
            }
            localStorage.setItem('rockstar_achievements', JSON.stringify(achievements));
        }
    };

    initDatabase();

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            const isSubpage = !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/';
            if (!isSubpage) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Login Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email === 'admin@rockstar.sch.id' && password === 'admin123') {
                localStorage.setItem('rockstar_user_role', 'admin');
                window.location.href = 'admin-dashboard.html';
            } else if (email === 'student@rockstar.sch.id' && password === 'student123') {
                localStorage.setItem('rockstar_user_role', 'student');
                window.location.href = 'student-dashboard.html';
            } else {
                alert('Invalid credentials! Hint: admin@rockstar.sch.id / admin123 or student@rockstar.sch.id / student123');
            }
        });
    }

    // Admin Dashboard Logic
    if (window.location.pathname.endsWith('admin-dashboard.html')) {
        const students = JSON.parse(localStorage.getItem('rockstar_students'));
        const teachers = JSON.parse(localStorage.getItem('rockstar_teachers'));
        const achievements = JSON.parse(localStorage.getItem('rockstar_achievements'));

        // Populate Stats
        document.getElementById('total-students').innerText = students.length;
        document.getElementById('total-teachers').innerText = teachers.length;
        document.getElementById('total-achievements').innerText = achievements.length;
        document.getElementById('tahfizh-stars').innerText = students.filter(s => s.tahfizh >= 15).length;

        // Populate Student Table
        const tableBody = document.getElementById('student-table-body');
        if (tableBody) {
            students.slice(0, 10).forEach(s => {
                const row = `
                    <tr>
                        <td>${s.name}</td>
                        <td>${s.grade}</td>
                        <td>
                            <div class="progress-container-small">
                                <div class="progress-bar-small" style="width: ${(s.tahfizh/30)*100}%"></div>
                                <span>${s.tahfizh} Juz</span>
                            </div>
                        </td>
                        <td>${s.score}</td>
                        <td><span class="status-badge ${s.status.toLowerCase()}">${s.status}</span></td>
                        <td>
                            <button class="action-btn view"><i class="fas fa-eye"></i></button>
                            <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }

        // Charts Logic
        if (typeof Chart !== 'undefined') {
            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: window.innerWidth < 480 ? 'bottom' : 'top',
                    }
                }
            };

            const ctx1 = document.getElementById('tahfizhChart').getContext('2d');
            new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: ['0-5 Juz', '6-10 Juz', '11-15 Juz', '16-20 Juz', '21-25 Juz', '26-30 Juz'],
                    datasets: [{
                        label: 'Student Count',
                        data: [
                            students.filter(s => s.tahfizh <= 5).length,
                            students.filter(s => s.tahfizh > 5 && s.tahfizh <= 10).length,
                            students.filter(s => s.tahfizh > 10 && s.tahfizh <= 15).length,
                            students.filter(s => s.tahfizh > 15 && s.tahfizh <= 20).length,
                            students.filter(s => s.tahfizh > 20 && s.tahfizh <= 25).length,
                            students.filter(s => s.tahfizh > 25).length
                        ],
                        backgroundColor: '#D4AF37'
                    }]
                },
                options: chartOptions
            });

            const ctx2 = document.getElementById('scoreChart').getContext('2d');
            new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'],
                    datasets: [{
                        label: 'Average Score',
                        data: [82, 85, 84, 88, 87, 90],
                        borderColor: '#002D62',
                        fill: false
                    }]
                },
                options: chartOptions
            });
        }
    }

    // Student Dashboard Logic
    if (window.location.pathname.endsWith('student-dashboard.html')) {
        const student = JSON.parse(localStorage.getItem('rockstar_students'))[0]; // Demo: First student
        document.getElementById('stu-name').innerText = student.name;
        document.getElementById('stu-id').innerText = student.id;
        document.getElementById('stu-class').innerText = student.grade;
        
        const progressPercent = (student.tahfizh / 30) * 100;
        document.getElementById('tahfizh-progress-bar').style.width = `${progressPercent}%`;
        document.getElementById('tahfizh-text').innerText = `${student.tahfizh} / 30 Juz Completed`;

        const juzList = document.getElementById('juz-list');
        for (let i = 1; i <= 10; i++) { // Demo: Show first 10
            const status = i <= student.tahfizh ? '<span class="text-success">✔ Completed</span>' : (i === student.tahfizh + 1 ? '<span class="text-warning">In Progress</span>' : '<span class="text-muted">Not Started</span>');
            juzList.innerHTML += `<li>Juz ${i}: ${status}</li>`;
        }
    }

    // Tahfizh Tracker Page Logic
    if (window.location.pathname.endsWith('tahfizh-tracker.html')) {
        const students = JSON.parse(localStorage.getItem('rockstar_students'));
        const trackerBody = document.getElementById('tahfizh-tracker-body');
        if (trackerBody) {
            students.slice(0, 20).forEach(s => {
                let juzCells = '';
                for (let j = 1; j <= 7; j++) {
                    const statusClass = j <= s.tahfizh ? 'completed' : (j === s.tahfizh + 1 ? 'in-progress' : 'not-started');
                    const statusText = j <= s.tahfizh ? 'Done' : (j === s.tahfizh + 1 ? 'Next' : '-');
                    juzCells += `<td class="juz-cell ${statusClass}">${statusText}</td>`;
                }
                const row = `
                    <tr>
                        <td><strong>${s.name}</strong></td>
                        ${juzCells}
                        <td>
                            <div class="progress-container-small">
                                <div class="progress-bar-small" style="width: ${(s.tahfizh/30)*100}%"></div>
                                <span>${Math.round((s.tahfizh/30)*100)}%</span>
                            </div>
                        </td>
                    </tr>
                `;
                trackerBody.innerHTML += row;
            });
        }
    }

    // Teachers Page Logic
    if (window.location.pathname.endsWith('teachers.html')) {
        const teachers = JSON.parse(localStorage.getItem('rockstar_teachers'));
        const teacherGrid = document.getElementById('teacher-grid');
        if (teacherGrid) {
            teachers.forEach(t => {
                teacherGrid.innerHTML += `
                    <div class="program-card" data-aos="fade-up">
                        <div class="founder-img" style="width: 100px; height: 100px; margin-bottom: 15px;">
                            <i class="fas fa-user-tie" style="font-size: 3rem;"></i>
                        </div>
                        <h3>${t.name}</h3>
                        <p class="text-secondary"><strong>${t.subject}</strong></p>
                        <p class="small mt-2">${t.education}</p>
                        <p class="small">Experience: ${t.experience}</p>
                    </div>
                `;
            });
        }
    }

    // Achievements Page Logic
    if (window.location.pathname.endsWith('achievements.html')) {
        const achievements = JSON.parse(localStorage.getItem('rockstar_achievements'));
        const achievementGrid = document.getElementById('achievement-grid');
        if (achievementGrid) {
            achievements.forEach(a => {
                achievementGrid.innerHTML += `
                    <div class="card" data-aos="zoom-in">
                        <div class="card-icon"><i class="fas fa-trophy"></i></div>
                        <h3>${a.competition}</h3>
                        <p class="text-secondary"><strong>${a.award}</strong></p>
                        <p class="mt-2">Winner: ${a.student}</p>
                        <p class="small text-muted">Year: ${a.year}</p>
                    </div>
                `;
            });
        }
    }

    // Admission Upgrade Logic
    const admissionForm = document.getElementById('admission-form-large');
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('stu-name').value,
                dob: document.getElementById('stu-dob').value,
                parent: document.getElementById('parent-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                level: document.getElementById('level').value,
                id: `APP${Date.now().toString().slice(-4)}`,
                tahfizh: 0,
                score: 0,
                grade: "Pending",
                status: "Pending"
            };

            const students = JSON.parse(localStorage.getItem('rockstar_students'));
            students.unshift(formData);
            localStorage.setItem('rockstar_students', JSON.stringify(students));

            alert('Application submitted successfully! Redirecting to homepage...');
            window.location.href = 'index.html';
        });
    }
});
