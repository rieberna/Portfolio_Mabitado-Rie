// Loader Animation
window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  const body = document.querySelector('body');
  
  // Show loader then fade out
  setTimeout(function() {
    loader.classList.add('fade-out');
    body.style.opacity = 1;
    
    // Remove loader from DOM after fade out completes
    setTimeout(function() {
      loader.style.display = 'none';
    }, 800);
  }, 1500);
  
  // Show home section by default
  showSection('home');
});

// Section switching
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.page');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + sectionId) {
      link.classList.add('active');
    }
  });
}

// Handle nav link clicks
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('nav-link')) {
    e.preventDefault();
    const sectionId = e.target.getAttribute('href').substring(1);
    showSection(sectionId);
  }
});

// Project detail functionality
document.addEventListener('click', function(e) {
  // Close project detail - check this first to prevent conflicts
  const closeButton = e.target.closest('.close-detail');
  if (closeButton) {
    e.stopPropagation();
    const detailView = closeButton.closest('.project-detail');
    const projectsList = document.querySelector('.projects-list');
    
    if (detailView && projectsList) {
      detailView.classList.remove('active');
      setTimeout(() => {
        detailView.style.display = 'none';
      }, 500); // Wait for fade animation
      projectsList.style.display = 'flex';
    }
    return;
  }
  
  // Open project detail
  const projectItem = e.target.closest('.project-item');
  if (projectItem && projectItem.dataset.project) {
    const projectId = projectItem.dataset.project;
    const detailView = document.getElementById(`${projectId}-detail`);
    const projectsList = document.querySelector('.projects-list');
    
    if (detailView && projectsList) {
      projectsList.style.display = 'none';
      detailView.style.display = 'flex';
      setTimeout(() => {
        detailView.classList.add('active');
      }, 10); // Small delay for animation to trigger
    }
  }
});

// Scroll animation observer for about section
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe only the personal and technical sections (education is visible by default)
// Also observe project items (first project is visible by default)
window.addEventListener('load', function() {
  const scrollElements = document.querySelectorAll('.personal, .technical');
  scrollElements.forEach(element => {
    scrollObserver.observe(element);
  });
});
