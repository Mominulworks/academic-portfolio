// ---------- Navbar shrink on scroll ----------
const nav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  nav.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ---------- Theme toggle ----------
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
themeToggle.addEventListener('click', () => {
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = isDark ? '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' : '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
});

// ---------- Typing effect for hero role ----------
const roles = ["CSE Undergraduate", "3rd Semester Student", "Aspiring Software Engineer", "DSA in Progress..."];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = roles[0].length, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];
  if(!deleting){
    charIndex++;
    if(charIndex > current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    charIndex--;
    if(charIndex < 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; charIndex = 0; }
  }
  typedEl.textContent = current.substring(0, charIndex);
  setTimeout(typeLoop, deleting ? 40 : 70);
}
charIndex = 0;
setTimeout(typeLoop, 900);

// ---------- Terminal log one-time type ----------
const terminalText = "status --semester=3  →  compiling coursework... 42% complete";
const terminalEl = document.getElementById('terminalLine');
let tIndex = 0;
function typeTerminal(){
  if(tIndex <= terminalText.length){
    terminalEl.textContent = terminalText.substring(0, tIndex);
    tIndex++;
    setTimeout(typeTerminal, 28);
  }
}
setTimeout(typeTerminal, 1600);

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el => revealObserver.observe(el));

// ---------- Animate skill bars on scroll ----------
const bars = document.querySelectorAll('.progress-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const bar = entry.target;
      bar.style.width = bar.getAttribute('data-width') + '%';
      barObserver.unobserve(bar);
    }
  });
}, {threshold:0.4});
bars.forEach(bar => barObserver.observe(bar));

// ---------- Contact form validation (client-side only) ----------
const form = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!name || !email || !message){
    showAlert('Please fill in every field before sending.', 'warn');
    return;
  }
  if(!emailPattern.test(email)){
    showAlert('That email address doesn\'t look right — please check it.', 'warn');
    return;
  }
  showAlert('Message ready — connect this form to an email service or backend to actually send it.', 'ok');
  form.reset();
});

function showAlert(text, type){
  const cls = type === 'ok' ? 'alert-success' : 'alert-warning';
  formAlert.innerHTML = `<div class="alert ${cls} py-2 mb-3" style="font-family:var(--font-mono); font-size:.85rem;">${text}</div>`;
}

