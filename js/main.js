// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Highlight active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// Resource data and filter logic for resources.html
const resources = [
  { title: 'Passport York and Login Recovery', category: 'Accounts and Access', audience: 'Students and staff', description: 'Reset your password, recover your account, and restore secure access to York services.', linkText: 'Open account access guide' },
  { title: 'York Email Setup and Calendar Sync', category: 'Email and Productivity', audience: 'Students', description: 'Configure Outlook on desktop and mobile and sync mail, calendar, and contacts.', linkText: 'View email setup steps' },
  { title: 'eClass Access and Course Visibility', category: 'eClass and Learning Tools', audience: 'Students and instructors', description: 'Troubleshoot missing courses, enrolment sync delays, and login access to eClass.', linkText: 'Review eClass access help' },
  { title: 'Recognizing Phishing and Suspicious Messages', category: 'Cybersecurity', audience: 'Everyone', description: 'Learn how to identify malicious emails and report threats quickly and safely.', linkText: 'Read phishing safety guidance' },
  { title: 'Campus Wi-Fi (AirYorkPLUS) Troubleshooting', category: 'Wi-Fi and Connectivity', audience: 'Students and visitors', description: 'Fix common connection issues, certificate prompts, and roaming problems.', linkText: 'Use Wi-Fi troubleshooting' },
  { title: 'Software Access: Microsoft 365 and SPSS', category: 'Software', audience: 'Students and researchers', description: 'Find software eligibility, install steps, and licence request instructions.', linkText: 'Check software options' }
];

const resourceContainer = document.querySelector('#resource-list');
const searchInput = document.querySelector('#resource-search');
const categoryButtons = document.querySelectorAll('.category-btn');

if (resourceContainer) {
  let activeCategory = 'All';

  const renderResources = (items) => {
    if (!items.length) {
      resourceContainer.innerHTML = '<p class="card">No resources match your current search. Try a different keyword or category.</p>';
      return;
    }

    resourceContainer.innerHTML = items.map(item => `
      <article class="card">
        <p><span class="pill">${item.category}</span> <span class="pill">${item.audience}</span></p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="#" aria-label="${item.linkText} for ${item.title}">${item.linkText} →</a>
      </article>
    `).join('');
  };

  const applyFilters = () => {
    const term = (searchInput?.value || '').toLowerCase().trim();
    const filtered = resources.filter(item => {
      const inCategory = activeCategory === 'All' || item.category === activeCategory;
      const text = `${item.title} ${item.category} ${item.audience} ${item.description}`.toLowerCase();
      const inSearch = !term || text.includes(term);
      return inCategory && inSearch;
    });
    renderResources(filtered);
  };

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'All';
      applyFilters();
    });
  });

  renderResources(resources);
}
