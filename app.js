// Dark/Light
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  
  // Muda o ícone do botão
  if (body.classList.contains("light-mode")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});
////////////////////////////////////

//botão das redes sociais
const socialBtn = document.getElementById("social-btn");
const socialWrapper = socialBtn.parentElement;

socialBtn.addEventListener("click", () => {
  socialWrapper.classList.toggle("active");
});