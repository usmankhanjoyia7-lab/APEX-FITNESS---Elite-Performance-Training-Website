// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
});

// ── HAMBURGER ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

// ── FADE-UP OBSERVER ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
    } 
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── SCHEDULE DATA ──
const scheduleData = {
  Monday: [
    { time:'6:00 AM', cls:'HIIT Burn', coach:'Marcus Chen', dur:'45 min', seats:4, total:20, type:'hiit' },
    { time:'7:30 AM', cls:'Morning Yoga', coach:'Aisha Patel', dur:'60 min', seats:14, total:15, type:'yoga' },
    { time:'9:00 AM', cls:'Strength Circuit', coach:'Marcus Chen', dur:'50 min', seats:8, total:16, type:'strength' },
    { time:'12:00 PM', cls:'HIIT Burn', coach:'James Okafor', dur:'45 min', seats:2, total:20, type:'hiit' },
    { time:'5:30 PM', cls:'Power Yoga', coach:'Aisha Patel', dur:'60 min', seats:10, total:15, type:'yoga' },
    { time:'6:30 PM', cls:'Athletic Performance', coach:'James Okafor', dur:'60 min', seats:6, total:12, type:'strength' },
    { time:'7:30 PM', cls:'Spin Class', coach:'Sofia Reyes', dur:'45 min', seats:12, total:20, type:'spin' },
  ],
  Tuesday: [
    { time:'6:00 AM', cls:'Strength & Power', coach:'Marcus Chen', dur:'60 min', seats:6, total:12, type:'strength' },
    { time:'8:00 AM', cls:'Pilates Core', coach:'Aisha Patel', dur:'45 min', seats:10, total:15, type:'yoga' },
    { time:'10:00 AM', cls:'Fat Burn HIIT', coach:'Sofia Reyes', dur:'45 min', seats:3, total:20, type:'hiit' },
    { time:'12:30 PM', cls:'Spin Intervals', coach:'James Okafor', dur:'45 min', seats:8, total:20, type:'spin' },
    { time:'5:00 PM', cls:'Olympic Lifting', coach:'Marcus Chen', dur:'60 min', seats:4, total:10, type:'strength' },
  ],
  Wednesday: [
    { time:'6:00 AM', cls:'HIIT Metabolic', coach:'James Okafor', dur:'45 min', seats:5, total:20, type:'hiit' },
    { time:'7:00 AM', cls:'Morning Spin', coach:'Sofia Reyes', dur:'45 min', seats:15, total:20, type:'spin' },
    { time:'9:00 AM', cls:'Yoga Flow', coach:'Aisha Patel', dur:'60 min', seats:8, total:15, type:'yoga' },
    { time:'11:00 AM', cls:'Circuit Training', coach:'Marcus Chen', dur:'50 min', seats:9, total:16, type:'strength' },
    { time:'6:00 PM', cls:'Barbell Club', coach:'Marcus Chen', dur:'90 min', seats:3, total:8, type:'strength' },
    { time:'7:30 PM', cls:'HIIT & Abs', coach:'James Okafor', dur:'45 min', seats:7, total:20, type:'hiit' },
  ],
};

// Fill missing days
['Thursday','Friday','Saturday','Sunday'].forEach(d => {
  scheduleData[d] = scheduleData.Monday.map(c => ({
    ...c, 
    coach: ['Marcus Chen','Sofia Reyes','James Okafor','Aisha Patel'][Math.floor(Math.random()*4)], 
    seats: Math.floor(Math.random()*15)+1 
  }));
});

function renderSchedule(day) {
  const data = scheduleData[day] || scheduleData.Monday;
  const dotClass = { hiit:'dot-hiit', yoga:'dot-yoga', strength:'dot-strength', spin:'dot-spin' };
  const container = document.getElementById('scheduleBody');
  if (!container) return;
  
  container.innerHTML = data.map(c => {
    const pct = Math.round((c.seats/c.total)*100);
    const low = pct < 30;
    return `<tr>
      <td style="font-family:var(--font-display);font-size:1.1rem;letter-spacing:.04em;">${c.time}</td>
      <td><span class="class-dot ${dotClass[c.type]}"></span>${c.cls}</td>
      <td style="color:var(--muted)">${c.coach}</td>
      <td style="color:var(--muted)">${c.dur}</td>
      <td><div class="seats-bar"><div class="seats-track"><div class="seats-fill ${low?'low':''}" style="width:${pct}%"></div></div><span>${c.seats} left</span></div></td>
      <td><button class="book-slot" onclick="bookClass('${c.cls}','${c.time}')">Book</button></td>
    </tr>`;
  }).join('');
}

function switchTab(btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSchedule(btn.textContent);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderSchedule('Monday');
});

// ── BOOKING ──
function bookClass(name, time) {
  if(confirm(`Book "${name}" at ${time}?\n\nThis will send a confirmation to your email.`)) {
    alert(`✅ You're booked for ${name} at ${time}!\n\nCheck your email for confirmation.`);
  }
}

// ── BMI CALCULATOR ──
function calcBMI() {
  const h = parseFloat(document.getElementById('bmiHeight').value);
  const w = parseFloat(document.getElementById('bmiWeight').value);
  if (!h || !w) { alert('Please enter both height and weight.'); return; }
  const bmi = (w / ((h/100)**2)).toFixed(1);
  let category, color;
  if (bmi < 18.5) { category = 'Underweight — consider building lean mass'; color = '#7eb8ff'; }
  else if (bmi < 25) { category = 'Normal weight — ideal range'; color = 'var(--accent)'; }
  else if (bmi < 30) { category = 'Overweight — fat loss program recommended'; color = '#ffb347'; }
  else { category = 'Obese — consult a trainer immediately'; color = 'var(--accent2)'; }
  
  const valEl = document.getElementById('bmiVal');
  const noteEl = document.getElementById('bmiNote');
  const resEl = document.getElementById('bmiResult');
  
  if (valEl && noteEl && resEl) {
    valEl.textContent = bmi;
    valEl.style.color = color;
    noteEl.textContent = category;
    resEl.style.display = 'block';
  }
}

// ── CALORIE CALCULATOR ──
function calcCalories() {
  const age = parseFloat(document.getElementById('calAge').value);
  const w = parseFloat(document.getElementById('calWeight').value);
  const h = parseFloat(document.getElementById('calHeight').value);
  const act = parseFloat(document.getElementById('calActivity').value);
  const sex = document.getElementById('calSex').value;
  if (!age || !w || !h) { alert('Please fill in all fields.'); return; }
  let bmr = sex === 'male'
    ? 10*w + 6.25*h - 5*age + 5
    : 10*w + 6.25*h - 5*age - 161;
  const tdee = Math.round(bmr * act);
  
  const valEl = document.getElementById('calVal');
  const noteEl = document.getElementById('calNote');
  const resEl = document.getElementById('calResult');
  
  if (valEl && noteEl && resEl) {
    valEl.textContent = tdee.toLocaleString() + ' kcal';
    noteEl.textContent = `For fat loss: ~${(tdee-500).toLocaleString()} kcal/day · For muscle gain: ~${(tdee+300).toLocaleString()} kcal/day`;
    resEl.style.display = 'block';
  }
}

// ── FAQ TOGGLE ──
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// ── FORM SUBMIT ──
function handleFormSubmit(btn) {
  const orig = btn.textContent;
  btn.textContent = 'Submitting...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✅ Welcome to Apex! Check your email.';
    btn.style.background = '#25d366';
    btn.style.color = '#fff';
  }, 1200);
}

// ── SMOOTH SCROLL ──
function scrollTo(target) {
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ── PARALLAX HERO ──
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && scroll < window.innerHeight) {
    heroBg.style.transform = `translateY(${scroll * 0.35}px)`;
  }
});
