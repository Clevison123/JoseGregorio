// ================================
// DARK/LIGHT MODE TOGGLE
// ================================
const toggleButton = document.getElementById("theme-toggle");

// Atualiza o ícone do botão
function updateThemeIcon() {
  toggleButton.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}

// Alterna tema e salva preferência
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  updateThemeIcon();
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
}

// Aplica preferência salva ao carregar
function applySavedTheme() {
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light-mode");
  updateThemeIcon();
}

// Event listeners
toggleButton.addEventListener("click", toggleTheme);
window.addEventListener("DOMContentLoaded", applySavedTheme);


// ================================
// SOCIAL BUTTON TOGGLE
// ================================
const socialWrapper = document.querySelector('.social-wrapper');
const socialBtn = document.getElementById('social-btn');
const myLinks = document.querySelector('.my-links');

function toggleSocialMenu(e) {
  e.stopPropagation();
  socialWrapper.classList.toggle('active');
  myLinks.classList.toggle('hide-buttons');
}

function closeSocialMenu() {
  socialWrapper.classList.remove('active');
  myLinks.classList.remove('hide-buttons');
}

socialBtn.addEventListener('click', toggleSocialMenu);
document.addEventListener('click', closeSocialMenu);

// Blocos
const main = document.querySelector('#principal');
const blocos = document.querySelectorAll('.bloco');

// Função para gerar cor aleatória
function randomColor() {
  return `hsl(${Math.random() * 360}, 70%, 50%)`;
}

// Guardamos dados de movimento em cada bloco
const blocosData = [];

blocos.forEach((bloco) => {
  const mainRect = main.getBoundingClientRect();
  const bw = bloco.offsetWidth;
  const bh = bloco.offsetHeight;

  // posição inicial aleatória
  let x = Math.random() * (mainRect.width - bw);
  let y = Math.random() * (mainRect.height - bh);

  // velocidade inicial aleatória
  let vx = (Math.random() - 0.5) * 4;
  let vy = (Math.random() - 0.5) * 4;

  // aplicar posição inicial
  bloco.style.left = `${x}px`;
  bloco.style.top = `${y}px`;

  // salvar dados
  blocosData.push({ bloco, x, y, vx, vy });

  // mudar cor e direção ao passar mouse
  bloco.addEventListener('mouseenter', () => {
    data.vx = (Math.random() - 0.5) * 6; // nova direção
    data.vy = (Math.random() - 0.5) * 6;
    bloco.style.background = randomColor();
  });

  const data = blocosData[blocosData.length - 1];
});

// loop de animação
function animate() {
  const mainRect = main.getBoundingClientRect();

  blocosData.forEach((data) => {
    const { bloco, bw = bloco.offsetWidth, bh = bloco.offsetHeight } = data;

    // mover
    data.x += data.vx;
    data.y += data.vy;

    // colisão com bordas
    if (data.x <= 0 || data.x + bw >= mainRect.width) {
      data.vx *= -1; // inverter direção
      bloco.style.background = randomColor(); // mudar cor
    }
    if (data.y <= 0 || data.y + bh >= mainRect.height) {
      data.vy *= -1;
      bloco.style.background = randomColor();
    }

    // aplicar nova posição
    bloco.style.left = `${data.x}px`;
    bloco.style.top = `${data.y}px`;
  });

  requestAnimationFrame(animate);
}

// iniciar quando site carregar
window.addEventListener('load', () => {
  animate();
});


// ================================
// SECTION CAROUSEL
// ================================
const sections = document.querySelectorAll("#principal section");
const sectionButtons = document.querySelectorAll("#principal .nav-sections button");
let currentSectionIndex = 0;

// Exibe apenas a section selecionada
function showSection(index) {
  sections.forEach((sec, i) => sec.classList.toggle("active", i === index));
}

// Navegação anterior / próxima
function prevSection() {
  currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
  showSection(currentSectionIndex);
}

function nextSection() {
  currentSectionIndex = (currentSectionIndex + 1) % sections.length;
  showSection(currentSectionIndex);
}

// Inicializa com a primeira section
showSection(currentSectionIndex);

// Event listeners dos botões do carrossel
sectionButtons[0].addEventListener("click", prevSection);
sectionButtons[1].addEventListener("click", nextSection);


// ================================
// SIDEBAR / NAV LINKS
// ================================
const navLinks = document.querySelectorAll("a[href^='#']");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetIndex = Array.from(sections).findIndex(sec => sec.id === targetId);
    if (targetIndex !== -1) {
      currentSectionIndex = targetIndex;
      showSection(currentSectionIndex);
    }
  });
});
