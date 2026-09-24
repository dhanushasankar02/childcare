/* ==========================================================================
   Childcare Website Interactivity - script.js
   Features: Dark Mode, RTL Switch, Login Modal & Tab Control, Mobile Nav & Active Page Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Primary DOM Elements
  const htmlTag = document.documentElement;
  const bodyTag = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const rtlToggleBtn = document.getElementById('rtl-toggle-btn');
  const rtlLabel = document.getElementById('rtl-label');

  // Login Modal Elements
  const loginBtn = document.getElementById('login-btn');
  const loginModal = document.getElementById('login-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const parentTab = document.getElementById('tab-parent');
  const staffTab = document.getElementById('tab-staff');
  const modalTabTitle = document.getElementById('modal-tab-title');

  // Navigation & Dropdown Elements
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownNav = document.querySelector('.nav-item.dropdown');

  /* --------------------------------------------------------------------------
     1. Dark Mode Theme Switcher (Syncs data-theme & body class)
     -------------------------------------------------------------------------- */
  const savedTheme = localStorage.getItem('childcare_theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme') === 'dark' || bodyTag.classList.contains('dark-theme') ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlTag.setAttribute('data-theme', 'dark');
      bodyTag.classList.add('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    } else {
      htmlTag.removeAttribute('data-theme');
      bodyTag.classList.remove('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
    localStorage.setItem('childcare_theme', theme);
  }

  /* --------------------------------------------------------------------------
     2. RTL (Right-To-Left) Layout Switcher
     -------------------------------------------------------------------------- */
  const savedDir = localStorage.getItem('childcare_dir') || 'ltr';
  applyDirection(savedDir);

  rtlToggleBtn?.addEventListener('click', () => {
    const currentDir = htmlTag.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(nextDir);
  });

  function applyDirection(dir) {
    htmlTag.setAttribute('dir', dir);
    if (dir === 'rtl') {
      bodyTag.classList.add('rtl-mode');
      if (rtlLabel) rtlLabel.textContent = 'LTR';
      rtlToggleBtn?.setAttribute('title', 'Switch to LTR Mode');
    } else {
      bodyTag.classList.remove('rtl-mode');
      if (rtlLabel) rtlLabel.textContent = 'RTL';
      rtlToggleBtn?.setAttribute('title', 'Switch to RTL Mode');
    }
    localStorage.setItem('childcare_dir', dir);
  }

  /* --------------------------------------------------------------------------
     3. Parent / Staff Portal Login Modal Controller
     -------------------------------------------------------------------------- */
  function openModal() {
    if (!loginModal) return;
    loginModal.classList.add('active');
    bodyTag.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!loginModal) return;
    loginModal.classList.remove('active');
    bodyTag.style.overflow = '';
  }

  loginBtn?.addEventListener('click', openModal);
  closeModalBtn?.addEventListener('click', closeModal);

  // Close modal when clicking overlay backdrop
  loginModal?.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal?.classList.contains('active')) {
      closeModal();
    }
  });

  // Modal Tab Switching (Parent vs Staff)
  parentTab?.addEventListener('click', () => {
    parentTab.classList.add('active');
    staffTab?.classList.remove('active');
    if (modalTabTitle) modalTabTitle.textContent = 'Parent Portal Login';
  });

  staffTab?.addEventListener('click', () => {
    staffTab.classList.add('active');
    parentTab?.classList.remove('active');
    if (modalTabTitle) modalTabTitle.textContent = 'Staff Portal Login';
  });

  /* --------------------------------------------------------------------------
     4. Responsive Navigation & Page Location Active Handler
     -------------------------------------------------------------------------- */
  // Mobile Hamburger Toggle
  mobileToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu?.classList.toggle('active');
    const isExpanded = navMenu?.classList.contains('active');
    mobileToggleBtn.innerHTML = isExpanded 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Dropdown Toggle for Mobile / Touch Screens
  dropdownToggle?.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      dropdownNav?.classList.toggle('open');
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggleBtn?.contains(e.target)) {
      navMenu.classList.remove('active');
      if (mobileToggleBtn) mobileToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });

  // Close mobile menu on clicking any navigation link
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .dropdown-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileToggleBtn) mobileToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  /* --------------------------------------------------------------------------
     5. Page Detection & Dropdown Active Badge Sync
     -------------------------------------------------------------------------- */
  const currentPath = window.location.pathname.toLowerCase();
  const currentHomeText = document.getElementById('current-home-text');
  const badgeHome1 = document.getElementById('badge-home1');
  const badgeHome2 = document.getElementById('badge-home2');

  if (currentPath.includes('home2.html')) {
    if (currentHomeText) currentHomeText.textContent = 'Home 2';
  } else if (currentPath.includes('about.html') || currentPath.includes('philosophy.html') || currentPath.includes('programs.html') || currentPath.includes('teachers.html') || currentPath.includes('pricing.html') || currentPath.includes('contact.html')) {
    if (currentHomeText) currentHomeText.textContent = 'Home Pages';
  } else {
    if (currentHomeText) currentHomeText.textContent = 'Home 1';
  }
});
