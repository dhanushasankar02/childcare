/* ==========================================================================
   Childcare Website Interactivity - script.js
   Features: Dark Mode, RTL Switch, Login Modal & Tab Control, Mobile Nav & Active Page Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Primary DOM Elements (Query all instances for desktop + mobile menu)
  const htmlTag = document.documentElement;
  const bodyTag = document.body;
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn');
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn, #rtl-toggle-btn');
  const rtlLabels = document.querySelectorAll('.rtl-label, #rtl-label');

  // Login Modal Elements
  const loginBtns = document.querySelectorAll('.login-btn, .btn-login, #login-btn');
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

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlTag.getAttribute('data-theme') === 'dark' || bodyTag.classList.contains('dark-theme') ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlTag.setAttribute('data-theme', 'dark');
      bodyTag.classList.add('dark-theme');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        btn.setAttribute('title', 'Switch to Light Mode');
      });
    } else {
      htmlTag.removeAttribute('data-theme');
      bodyTag.classList.remove('dark-theme');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        btn.setAttribute('title', 'Switch to Dark Mode');
      });
    }
    localStorage.setItem('childcare_theme', theme);
  }

  /* --------------------------------------------------------------------------
     2. RTL (Right-To-Left) Layout Switcher
     -------------------------------------------------------------------------- */
  const savedDir = localStorage.getItem('childcare_dir') || 'ltr';
  applyDirection(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = htmlTag.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(nextDir);
    });
  });

  function applyDirection(dir) {
    htmlTag.setAttribute('dir', dir);
    if (dir === 'rtl') {
      bodyTag.classList.add('rtl-mode');
      rtlLabels.forEach(label => label.textContent = 'LTR');
      rtlToggleBtns.forEach(btn => btn.setAttribute('title', 'Switch to LTR Mode'));
    } else {
      bodyTag.classList.remove('rtl-mode');
      rtlLabels.forEach(label => label.textContent = 'RTL');
      rtlToggleBtns.forEach(btn => btn.setAttribute('title', 'Switch to RTL Mode'));
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

  // Direct page navigation to login.html for all login buttons
  loginBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Direct link navigation to login.html enabled across all pages
    });
  });

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

  // Close mobile menu on clicking navigation links (excluding utility buttons)
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

  if (currentPath.includes('home2.html')) {
    if (currentHomeText) currentHomeText.textContent = 'Home 2';
  } else {
    if (currentHomeText) currentHomeText.textContent = 'Home 1';
  }
});
