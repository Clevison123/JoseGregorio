
// Smooth Scroll for  links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const headerOffset = document.querySelector('header').offsetHeight;
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset - 10; 

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

// Project Loader Class
class ProjectLoader {
  constructor(sectionId, projects) {
    this.sectionId = sectionId;
    this.projects = projects;
    this.container = document.querySelector(`#${sectionId} .projectsContainer`);
    this.projectCount = 0;
    this.MAX_PROJECTS = projects.length;
  }

  createProjectCard(project, index) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.animationDelay = `${index * 0.1}s`; 
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${project.image}"  class="project-image">
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" class="button" target="_blank">View</a>
    `;
    return card;
  }

  loadProjects(quantity = 3) {
    const projectsToLoad = Math.min(quantity, this.MAX_PROJECTS - this.projectCount);
    for (let i = 0; i < projectsToLoad; i++) {
      this.container.appendChild(
        this.createProjectCard(this.projects[this.projectCount], this.projectCount)
      );
      this.projectCount++;
    }
  }

  init() {
    this.loadProjects(3);

    const observerTarget = document.querySelector(`#${this.sectionId}`);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.projectCount < this.MAX_PROJECTS) {
          this.loadProjects(3);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(observerTarget);
  }
}

// Back To Top 
const BackToTopModule = (() => {
  const backToTop = document.getElementById("backToTop");

  const handleScroll = () => {
    backToTop.classList.toggle("show", window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const init = () => {
    window.addEventListener("scroll", handleScroll);
    backToTop.addEventListener("click", scrollToTop);
  };

  return { init };
})();

// Project Data
const backendProjects = [
  { title: "API C#", description: "API de autenticação em C#", link: "#", image: "backend1.png" },
  { title: "SQL Manager", description: "Sistema de gerenciamento em SQL", link: "#", image: "backend2.png" },
  { title: "REST Service", description: "Serviço REST em ASP.NET", link: "#", image: "backend3.png" }
];

const frontendProjects = [
  { title: "Portfolio", description: "Meu portfólio com HTML, CSS e JS", link: "#", image: "frontend1.png" },
  { title: "Game Platform", description: "Plataforma de jogos com design responsivo", link: "#", image: "frontend2.png" },
  { title: "Landing Page", description: "Landing page moderna", link: "#", image: "frontend3.png" }
];

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  new ProjectLoader("backend", backendProjects).init();
  new ProjectLoader("frontend", frontendProjects).init();
  BackToTopModule.init();
});
