document.addEventListener('DOMContentLoaded', function() {
            // Initialize progress bars animation
            document.querySelectorAll('.progress-fill').forEach(progressBar => {
                const width = progressBar.style.width;
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
                    
                    // If appointments page is selected, initialize calendar
                    if (pageId === 'appointments-page') {
                        initAppointmentsCalendar();
                    }
                });
            });
            
            // Notification panel functionality
            const notificationsBtn = document.getElementById('notifications-btn');
            const notificationPanel = document.getElementById('notification-panel');
            const closePanelBtn = document.querySelector('.close-panel');
            
            notificationsBtn.addEventListener('click', function() {
                notificationPanel.classList.add('open');
                
                // Mark notifications as read
                document.querySelectorAll('.notification-item.unread').forEach(item => {
                    item.classList.remove('unread');
                });
                
                // Clear notification badge
                document.querySelector('.notification-badge').style.display = 'none';
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
            
            // Quick action modal functionality
            const quickActionBtn = document.getElementById('quick-action-btn');
            const quickActionModal = document.getElementById('quick-action-modal');
            const closeModalBtn = document.querySelector('.close-modal');
            
            quickActionBtn.addEventListener('click', function() {
                quickActionModal.style.display = 'flex';
            });
            
            closeModalBtn.addEventListener('click', function() {
                quickActionModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === quickActionModal) {
                    quickActionModal.style.display = 'none';
                }
            });
            
            // Logout functionality
            const logoutBtn = document.getElementById('logout-btn');
            
            logoutBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to logout?')) {
                    // In a real application, this would redirect to login page
                    alert('Logging out...');
                }
            });
            
            // Initialize patient distribution chart
            function initPatientChart() {
                const ctx = document.getElementById('patient-chart').getContext('2d');
                
                // Sample data for the chart
                const data = {
                    labels: ['Abhyanga', 'Shirodhara', 'Basti', 'Nasya', 'Swedana'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#4CAF50',
                            '#FF9800',
                            '#2196F3',
                            '#9C27B0',
                            '#607D8B'
                        ],
                        borderWidth: 0
                    }]
                };
                
                const config = {
                    type: 'doughnut',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: {
                                        size: 12
                                    },
                                    padding: 20
                                }
                            }
                        },
                        cutout: '70%'
                    }
                };
                
                new Chart(ctx, config);
            }
            
            // Initialize charts
            initPatientChart();
            
            // Add action button functionality
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.querySelector('i').className;
                    const appointment = this.closest('.appointment-item');
                    const patientName = appointment.querySelector('h4').textContent;
                    
                    if (action.includes('eye')) {
                        alert(`View details for ${patientName}`);
                    } else if (action.includes('pencil-alt')) {
                        alert(`Edit appointment for ${patientName}`);
                    } else if (action.includes('times')) {
                        if (confirm(`Cancel appointment for ${patientName}?`)) {
                            appointment.style.opacity = '0.5';
                            appointment.querySelector('.appointment-time').innerHTML = '<s>10:30 AM</s>';
                            appointment.querySelector('.appointment-time').style.background = '#ffcdd2';
                            appointment.querySelector('.appointment-time').style.color = '#c62828';
                        }
                    }
                });
            });
            
            // Add priority action button functionality
            document.querySelectorAll('.activity-item .btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const activity = this.closest('.activity-item');
                    const activityTitle = activity.querySelector('.activity-title').textContent;
                    
                    alert(`Taking action on: ${activityTitle}`);
                    
                    // Mark as completed
                    activity.style.opacity = '0.7';
                    this.textContent = 'Completed';
                    this.disabled = true;
                });
            });
            
            // Simulate live system status updates
            setInterval(() => {
                const statusIndicators = document.querySelectorAll('.status-indicator');
                statusIndicators.forEach(indicator => {
                    if (Math.random() > 0.8) {
                        indicator.classList.toggle('active');
                    }
                });
            }, 5000);
            
            // Initialize appointments calendar
            function initAppointmentsCalendar() {
                // This would initialize a calendar view for appointments
                console.log("Initializing appointments calendar...");
            }
        });