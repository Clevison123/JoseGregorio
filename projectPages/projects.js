//  Scroll for  links
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

  // Verifica se é backend ou frontend
  const isBackend = this.sectionId === "backend";

  // Se for backend : adiciona dois botões
  const buttonsHTML = isBackend
    ? `
        <div class="button-group">
          <a href="${project.link}" class="button" target="_blank">View</a>
          <button class="button modal-btn" data-title="${project.title}" data-summary="${project.summary || 'No summary available.'}">More</button>
        </div>
      `
    : `
        <a href="${project.link}" class="button" target="_blank">View</a>
      `;

  // Monta o card
  card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${project.image}" class="project-image">
    </div>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    ${buttonsHTML}
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
const frontendProjects = [
  { 
  title: "To-Do List", 
  description: "Interactive app to manage tasks using HTML, CSS, and JavaScript.", 
  link: "https://to-do-listfe.netlify.app/", 
  image: "/projectPages/projectImgs/todo.png" 
},
{ 
  title: "Pomodoro Timer", 
  description: "Timer based on the Pomodoro technique to boost productivity.", 
  link: "https://pomodoro-timerfe.netlify.app/", 
  image: "/projectPages/projectImgs/pomodoro.png" 
},
{ 
  title: "SideBar", 
  description: "Modern and responsive sidebar menu for website navigation.", 
  link: "https://sidebar-fe.netlify.app/", 
  image: "/projectPages/projectImgs/sidebar.png" 
},
{ 
  title: "Color Picker Generator", 
  description: "Tool to generate and copy custom colors in HEX and RGB.", 
  link: "https://color-picker-generator-fe.netlify.app/", 
  image: "/projectPages/projectImgs/colorpicker.png" 
},
{ 
  title: "Expense Tracker", 
  description: "Simple app for expense control and financial tracking.", 
  link: "https://expense-trackerfe.netlify.app/", 
  image: "/projectPages/projectImgs/expensetracker.png" 
},
{ 
  title: "Calculator", 
  description: "Functional calculator built with HTML, CSS, and JavaScript.", 
  link: "https://calculator-fe.netlify.app/", 
  image: "/projectPages/projectImgs/calculator.png" 
},

{ 
  title: "Digital Clock", 
  description: "Dynamic digital clock updated in real time.", 
  link: "https://digital-clock-fe.netlify.app/", 
  image: "/projectPages/projectImgs/digitalclock.png" 
},

{ 
  title: "Password Generator", 
  description: "Secure and customizable password generator for better protection.", 
  link: "https://password-generator-fe.netlify.app/", 
  image: "/projectPages/projectImgs/password.png" 
}

];

const backendProjects = [
  { 
    title: "Book Management API", 
    description: "Manages books via a REST API with CRUD operations using ASP.NET Core and Entity Framework.", 
    link: "https://github.com/Clevison123/FirstAPI", 
    image: "/projectPages/backendimgs/bookAPI.png",
    summary: "The BooksController is responsible for managing books in the system by connecting to the database through FirstAPIContext. It provides all basic CRUD operations for books. The GetBooks() function retrieves and returns all registered books. The GetBookById(id) function searches for a specific book by its ID, returning the book if it exists or “Not Found” if it does not. The AddBook(newBook) function allows adding a new book to the database, returning an error if the input data is invalid and the newly created book if successful. The UpdateBook(id, updatedBook) function searches for a book by ID, updates its details if the book exists, and saves the changes, otherwise returning “Not Found”. Finally, the DeleteBook(id) function searches for a book by ID, removes it from the database if found, and saves the changes, returning “Not Found” if the book does not exist. This controller ensures that all operations for retrieving, adding, updating, and deleting books are handled efficiently, safely, and with clear responses for any errors or missing data."
  },

  { 
    title: "Banking System Console App", 
    description: "Console app to manage bank accounts, supporting create, deposit, withdraw, transfer, apply interest, and view transaction history.", 
    link: "https://github.com/Clevison123/BankAccount", 
    image: "/projectPages/backendimgs/bankAccount.png",
    summary: "The Banking System is a console application in C# that allows users to manage multiple bank accounts. Each account stores the account number, holder information, balance, password, transaction history, and limits for withdrawals and overdrafts. Users can create accounts, list existing accounts, deposit money, withdraw funds (with password verification and limit checks), transfer money between accounts, and apply interest to all accounts. The system tracks all operations in a transaction history for each account and ensures that accounts with non-zero balances cannot be deleted. Input validation and clear messages guide the user through the menu-driven interface, providing a safe and organized way to manage banking operations during runtime."
  },

  { 
    title: "Contact Management Console App", 
    description: "Console app to manage contacts with add, list, favorite, and remove features.", 
    link: "https://github.com/Clevison123/ContactManagementSystem", 
    image: "/projectPages/backendimgs/menuContact.png",
    summary: "The Contact Agenda is a console application in C# that allows users to manage a list of personal contacts. It lets users add new contacts with a name, phone number, and email, list all registered contacts, mark contacts as favorites, and remove contacts by ID. Each contact stores the creation date and a favorite status. The application validates user input, provides clear feedback for errors or invalid IDs, and continuously prompts users through an intuitive menu until they choose to exit. All operations are handled efficiently, ensuring a simple and predictable way to manage contacts during runtime." 
  },

  { 
    title: "Customer Service Queue System", 
    description: "Console app managing normal and priority customer queues with add, call, and display features.", 
    link: "https://hub.docker.com/repository/docker/josegregorio/sistema-atendimento-app", 
    image: "/projectPages/backendimgs/queue.png",
    summary: "The Service System is a console application in C# that manages a queue of customers using object-oriented principles and a queue data structure. It defines an abstract Person class, which is extended by the Customer class, demonstrating inheritance, abstraction, and polymorphism. Customers aged 60 or older are automatically marked as priority. The system uses two queues: a priority queue for senior customers and a regular queue for others. Users can add customers to the queue, call the next customer (giving priority to seniors), and view the current state of both queues. The application validates input, displays clear messages, and ensures a fair and organized service flow by handling priority and regular customers separately."
  }
];



// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  new ProjectLoader("backend", backendProjects).init();
  new ProjectLoader("frontend", frontendProjects).init();
  BackToTopModule.init();
});


// Modal Logic
const ModalModule = (() => {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalSummary = document.getElementById("modalSummary");
  const closeBtn = document.querySelector(".close-btn");

  const openModal = (title, summary) => {
    modalTitle.textContent = title;
    modalSummary.textContent = summary;
    modal.style.display = "flex";
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  const init = () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-btn")) {
        const title = e.target.dataset.title;
        const summary = e.target.dataset.summary;
        openModal(title, summary);
      }
      if (e.target === modal || e.target === closeBtn) {
        closeModal();
      }
    });
  };

  return { init };
})();

ModalModule.init();
