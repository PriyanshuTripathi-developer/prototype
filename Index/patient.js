document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bars animation
    document.querySelectorAll('.progress-fill').forEach(progressBar => {
        const width = progressBar.getAttribute('data-width') + '%';
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = width;
        }, 300);
    });
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected page
            const pageId = this.getAttribute('data-page') + '-page';
            document.getElementById(pageId).classList.add('active');
            
            // If progress page is selected, initialize chart
            if (pageId === 'progress-page') {
                initializeProgressChart();
            }
            
            // If schedule page is selected, initialize calendar
            if (pageId === 'schedule-page') {
                initializeCalendar();
            }
        });
    });
    
    // Notification panel functionality
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const closePanelBtn = document.querySelector('.close-panel');
    
    notificationsBtn.addEventListener('click', function() {
        notificationPanel.classList.add('open');
    });
    
    closePanelBtn.addEventListener('click', function() {
        notificationPanel.classList.remove('open');
    });
    
    // Close notification panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationPanel.contains(e.target) && e.target !== notificationsBtn) {
            notificationPanel.classList.remove('open');
        }
    });
    
    // Feeling scale functionality
    const scaleItems = document.querySelectorAll('.scale-item');
    
    scaleItems.forEach(item => {
        item.addEventListener('click', function() {
            scaleItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Submit feedback functionality
    const submitFeedbackBtn = document.getElementById('submit-feedback');
    
    submitFeedbackBtn.addEventListener('click', function() {
        const therapySelect = document.getElementById('therapy-select');
        const feedbackText = document.getElementById('feedback-text');
        const selectedFeeling = document.querySelector('.scale-item.active');
        
        if (!therapySelect.value) {
            alert('Please select a therapy');
            return;
        }
        
        if (!feedbackText.value) {
            alert('Please provide your feedback');
            return;
        }
        
        // In a real application, this would send data to the server
        alert('Thank you for your feedback! Your response has been recorded.');
        
        // Reset form
        therapySelect.value = '';
        feedbackText.value = '';
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            // In a real application, this would redirect to login page
            alert('Logging out...');
        }
    });
    
    // Initialize progress chart
    function initializeProgressChart() {
        const ctx = document.getElementById('progress-chart').getContext('2d');
        
        // Sample data for the chart
        const data = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [
                {
                    label: 'Energy Level',
                    data: [3, 5, 6, 7, 8, 9],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Pain Level',
                    data: [8, 7, 6, 5, 4, 3],
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };
        
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Therapy Progress Over Time',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Level (0-10)'
                        }
                    }
                }
            }
        };
        
        new Chart(ctx, config);
    }
    
    // Initialize calendar
    function initializeCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'header');
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Add days
        const totalDays = 30; // September has 30 days
        const startDay = 5; // September 1st is Friday (0=Sun, 1=Mon, ..., 5=Fri, 6=Sat)
        
        // Add empty cells for days before the first
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add actual days
        for (let i = 1; i <= totalDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = i;
            
            // Mark current day
            if (i === 15) {
                dayElement.classList.add('current');
            }
            
            // Mark days with events (sample data)
            if ([5, 8, 12, 15, 19, 22, 26, 29].includes(i)) {
                dayElement.classList.add('has-event');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Initialize calendar on page load if schedule page is active
    if (document.getElementById('schedule-page').classList.contains('active')) {
        initializeCalendar();
    }
});