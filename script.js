/**
 * Kidous Wiaam Portfolio
 * Main JavaScript File
 */

console.log('[DEBUG] script.js loading...');

// Wrap everything in try-catch to catch any errors
try {
    // Initialize AOS animations
    document.addEventListener('DOMContentLoaded', function() {
        console.log('[DEBUG] DOMContentLoaded fired');
        
        try {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 100
                });
                console.log('[DEBUG] AOS initialized');
            } else {
                console.warn('[DEBUG] AOS library not found - animations disabled');
            }
        } catch (aosError) {
            console.error('[DEBUG] AOS init error:', aosError);
        }
        
        // Initialize all features
        initNavbar();
        initMobileMenu();
        initTheme();
        initProjects();
        initContactForm();
        initScrollEffects();
        
        console.log('[DEBUG] All features initialized');
    });
} catch (mainError) {
    console.error('[DEBUG] Main script error:', mainError);
}

// ============================================
// PROJECTS DATA ARRAY - Your Real Projects
// ============================================
console.log('[DEBUG] script.js loaded');
const projects = [
    {
        title: "LUXE E-Commerce",
        description: "A luxury e-commerce website with elegant design, product catalog, shopping cart, and checkout functionality.",
        image: "assets/images/ecomarce site.png.png",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "file:///C:/Users/Shift/Desktop/My%20project/LUXE/index.html",
        github: "#",
        featured: true
    },
    {
        title: "Fitness Salle",
        description: "Modern gym website with class schedules, membership plans, trainer profiles, and contact forms.",
        image: "assets/images/fitness sale.png.png",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "file:///C:/Users/Shift/Desktop/My%20project/salle/index.html",
        github: "#",
        featured: true
    },
    {
        title: "Doll Store",
        description: "Adorable crochet doll store website with product gallery, shopping cart, and secure checkout.",
        image: "assets/images/doll store.png.png",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "file:///C:/Users/Shift/Desktop/My%20project/doll%20stor/index.html",
        github: "#",
        featured: true
    },
    {
        title: "Coffee Shop",
        description: "Cozy coffee shop website with menu, about page, and contact information.",
        image: "assets/images/coffeshop.png.png",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "file:///C:/Users/Shift/Desktop/My%20project/Coffe%20shop/index.html",
        github: "#",
        featured: true
    }
];

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isOpen = false;
    
    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            mobileMenu.classList.remove('hidden');
            menuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        }
    });
    
    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        });
    });
}

// ============================================
// THEME TOGGLE
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    
    // Check saved preference
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
    }
}

// ============================================
// PROJECTS
// ============================================
function initProjects() {
    console.log('[DEBUG] initProjects called');
    renderProjects(projects);
    initProjectFilters();
}

function renderProjects(projectsData) {
    const grid = document.getElementById('projects-grid');
    console.log('[DEBUG] renderProjects called, grid element:', grid);
    
    if (!grid) {
        console.error('[DEBUG] projects-grid element NOT FOUND');
        // Show visible error on page
        grid.innerHTML = '<p class="text-red-500">Error: Projects container not found. Please check console for details.</p>';
        return;
    }
    
    if (!projectsData || projectsData.length === 0) {
        console.warn('[DEBUG] No projects data to render');
        grid.innerHTML = '<p class="text-dark-muted">No projects to display.</p>';
        return;
    }
    
    console.log('[DEBUG] Projects to render:', projectsData.length);
    grid.innerHTML = projectsData.map((project, index) => createProjectCard(project, index)).join('');
    console.log('[DEBUG] Projects rendered successfully');
}

function createProjectCard(project, index) {
    return `
        <article class="project-card glass rounded-2xl overflow-hidden" data-aos="fade-up" data-aos-delay="${index * 100}">
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    ${project.link ? `
                        <a href="${project.link}" target="_blank" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark-bg hover:bg-accent-400 transition-colors">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    ` : ''}
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dark-bg hover:bg-accent-400 transition-colors">
                            <i class="fab fa-github"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
            
            <!-- Content -->
            <div class="p-6">
                <h3 class="font-heading text-xl font-semibold mb-2">${project.title}</h3>
                <p class="text-dark-muted text-sm mb-4 line-clamp-2">${project.description}</p>
                
                <!-- Tech Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.tech.map(t => `
                        <span class="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300">${t}</span>
                    `).join('')}
                </div>
                
                <!-- Links -->
                <div class="flex gap-3">
                    ${project.link ? `
                        <a href="${project.link}" target="_blank" class="flex-1 text-center py-2 px-4 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition-colors">
                            Live Demo
                        </a>
                    ` : ''}
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" class="flex-1 text-center py-2 px-4 glass text-dark-muted text-sm font-medium rounded-lg hover:bg-white/10 transition-colors">
                            <i class="fab fa-github mr-1"></i> Code
                        </a>
                    ` : ''}
                </div>
            </div>
        </article>
    `;
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('bg-accent-500', 'text-white');
                b.classList.add('glass', 'text-dark-muted');
            });
            btn.classList.remove('glass', 'text-dark-muted');
            btn.classList.add('bg-accent-500', 'text-white');
            
            // Filter projects
            const filter = btn.dataset.filter;
            const filtered = filter === 'all' 
                ? projects 
                : projects.filter(p => p.tech.includes(filter));
            
            renderProjects(filtered);
            
            // Re-initialize AOS
            AOS.refresh();
        });
    });
}

// ============================================
// CONTACT FORM (Formspree)
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    // Override form submission to handle with AJAX and show custom success
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        btn.disabled = true;
        
        // Create form data manually to ensure all fields are included
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('subject', document.getElementById('subject').value);
        formData.append('message', document.getElementById('message').value);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                document.getElementById('form-success').classList.remove('hidden');
                form.reset();
                
                setTimeout(() => {
                    document.getElementById('form-success').classList.add('hidden');
                }, 5000);
            } else {
                alert('Oops! There was a problem submitting your form');
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        }).finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
