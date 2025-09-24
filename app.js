// ============================
// DARK/LIGHT MODE TOGGLE
// ============================

// Seleciona o botão de toggle
const toggleButton = document.getElementById("theme-toggle");

// Função para atualizar o ícone baseado no tema
function updateIcon() {
  toggleButton.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}

// Alterna o tema ao clicar
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  updateIcon();

  // Salva preferência
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

// Aplica preferência salva ao carregar
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }
  updateIcon();
});


////////////////////////////////////

//botão das redes sociais
const socialWrapper = document.querySelector('.social-wrapper');
const socialBtn = document.getElementById('social-btn');
const myLinks = document.querySelector('.my-links');

socialBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // não fecha imediatamente
  socialWrapper.classList.toggle('active');
  myLinks.classList.toggle('hide-buttons');
});

document.addEventListener('click', () => {
  socialWrapper.classList.remove('active');
  myLinks.classList.remove('hide-buttons');
});
