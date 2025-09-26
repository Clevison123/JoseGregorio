// Seleciona o container do botão
const topButtonContainer = document.querySelector(".top-btn-container");

// Mostrar/esconder botão ao rolar
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    topButtonContainer.classList.add("show");
  } else {
    topButtonContainer.classList.remove("show");
  }
});

// Seleciona o botão
const topButton = document.querySelector(".top-btn");

// Evento para voltar ao topo
topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
