// DARK / LIGHT MODE
const toggleButton = document.getElementById("theme-toggle");

const updateThemeIcon = () => toggleButton.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
const toggleTheme = () => {
  document.body.classList.toggle("light-mode");
  updateThemeIcon();
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
};
const applySavedTheme = () => {
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light-mode");
  updateThemeIcon();
};

toggleButton.addEventListener("click", toggleTheme);
window.addEventListener("DOMContentLoaded", applySavedTheme);

// SOCIAL BUTTON TOGGLE
const socialWrapper = document.querySelector('.social-wrapper');
const socialBtn = document.getElementById('social-btn');
const myLinks = document.querySelector('.my-links');

socialBtn.addEventListener('click', e => {
  e.stopPropagation();
  socialWrapper.classList.toggle('active');
  myLinks.classList.toggle('hide-buttons');
});
document.addEventListener('click', () => {
  socialWrapper.classList.remove('active');
  myLinks.classList.remove('hide-buttons');
});

// Works
const works = [
  { title: "Freelancer – Frontend", date: "São Paulo – Mai/2023 a Jul/2023", project: "Site para Salão de Beleza", link: "#" }
  /*{ title: "Freelancer – Backend", date: "São Paulo – Mar/2025 a jun/2025", project: "Sistema de Estoque", link: "#" },*/
];

const worksView = document.querySelector(".card-works-content");
const prevBtn = document.querySelector(".work-btn.prev");
const nextBtn = document.querySelector(".work-btn.next");

let currentIndex = 0;

function showWork(index, direction = 1) {
  // direction: 1 = next, -1 = prev
  worksView.classList.add("fade-out");
  worksView.style.transform = `translateX(${30 * direction}px)`;

  setTimeout(() => {
    const work = works[index];
    worksView.innerHTML = `
      <h3>${work.title}</h3>
      <p>${work.date}</p>
      <p>${work.project} <a href="${work.link}" target="_blank">(Site)</a></p>
    `;
    // fade-in e slide
    worksView.classList.remove("fade-out");
    worksView.classList.add("fade-in");
    worksView.style.transform = `translateX(0)`;

    setTimeout(() => {
      worksView.classList.remove("fade-in");
    }, 400);
  }, 200);
}

// Inicializa
showWork(currentIndex);

// Navegação
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if(currentIndex >= works.length) currentIndex = 0;
  showWork(currentIndex, 1);
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  if(currentIndex < 0) currentIndex = works.length - 1;
  showWork(currentIndex, -1);
});


// BLOCOS
const main = document.querySelector('#principal');
const maxSpeed = 8, acceleration = 0.2, colorTransition = 0.3;
const randomColor = () => `hsl(${Math.random() * 360}, 70%, 50%)`;

class Bloco {
  constructor(element) {
    this.el = element;
    const { width: bw, height: bh } = element.getBoundingClientRect();
    const { width: mw, height: mh } = main.getBoundingClientRect();
    Object.assign(this, { bw, bh, mw, mh });

    this.x = Math.random() * (mw - bw);
    this.y = Math.random() * (mh - bh);
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;

    this.el.style.transition = `background ${colorTransition}s`;
    this.updatePos();
    this.el.addEventListener('mouseenter', () => this.onHover());
  }

  onHover() {
    this.vx = (Math.random() - 0.5) * maxSpeed;
    this.vy = (Math.random() - 0.5) * maxSpeed;
    this.changeColor();
  }

  changeColor() { this.el.style.background = randomColor(); }
  updatePos() { Object.assign(this.el.style, { left: `${this.x}px`, top: `${this.y}px` }); }

  checkWalls() {
    if (this.x <= 0 || this.x + this.bw >= this.mw) {
      this.vx = -this.vx * (1 - acceleration);
      this.x = Math.max(0, Math.min(this.mw - this.bw, this.x));
      this.changeColor();
    }
    if (this.y <= 0 || this.y + this.bh >= this.mh) {
      this.vy = -this.vy * (1 - acceleration);
      this.y = Math.max(0, Math.min(this.mh - this.bh, this.y));
      this.changeColor();
    }
  }

  move() { this.x += this.vx; this.y += this.vy; this.updatePos(); }

  checkCollision(other) {
    if (this.x < other.x + other.bw && this.x + this.bw > other.x && this.y < other.y + other.bh && this.y + this.bh > other.y) {
      const dx = (this.x + this.bw / 2) - (other.x + other.bw / 2);
      const dy = (this.y + this.bh / 2) - (other.y + other.bh / 2);
      const overlapX = (this.bw + other.bw) / 2 - Math.abs(dx);
      const overlapY = (this.bh + other.bh) / 2 - Math.abs(dy);
      const impulse = 0.6;

      if (overlapX > 0 && overlapY > 0) {
        if (overlapX < overlapY) {
          const shiftX = overlapX * 1.1;
          this.x += dx > 0 ? shiftX : -shiftX;
          other.x += dx > 0 ? -shiftX : shiftX;
          [this.vx, other.vx] = [
            -other.vx * (1 - acceleration) + Math.sign(dx) * impulse,
            -this.vx * (1 - acceleration) - Math.sign(dx) * impulse
          ];
        } else {
          const shiftY = overlapY * 1.1;
          this.y += dy > 0 ? shiftY : -shiftY;
          other.y += dy > 0 ? -shiftY : shiftY;
          [this.vy, other.vy] = [
            -other.vy * (1 - acceleration) + Math.sign(dy) * impulse,
            -this.vy * (1 - acceleration) - Math.sign(dy) * impulse
          ];
        }
        this.changeColor(); other.changeColor();
      }
    }
  }
}

const blocos = [...document.querySelectorAll('.bloco')].map(el => new Bloco(el));
(function animate() {
  const { width: mw, height: mh } = main.getBoundingClientRect();
  blocos.forEach((b, i) => {
    Object.assign(b, { mw, mh });
    b.move(); b.checkWalls();
    for (let j = i + 1; j < blocos.length; j++) b.checkCollision(blocos[j]);
  });
  requestAnimationFrame(animate);
})();

// SECTION CAROUSEL
const sections = document.querySelectorAll("#principal section");
const sectionButtons = document.querySelectorAll("#principal .nav-sections button");
let currentSectionIndex = 0;

const showSection = idx => sections.forEach((sec, i) => sec.classList.toggle("active", i === idx));
const changeSection = dir => showSection(currentSectionIndex = (currentSectionIndex + dir + sections.length) % sections.length);

showSection(currentSectionIndex);
sectionButtons[0].addEventListener("click", () => changeSection(-1));
sectionButtons[1].addEventListener("click", () => changeSection(1));

// SIDEBAR NAV LINKS
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const idx = [...sections].findIndex(sec => sec.id === id);
    if (idx !== -1) showSection(currentSectionIndex = idx);
  });
});
