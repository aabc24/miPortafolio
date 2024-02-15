const header = document.querySelector(".header");
const menu = document.querySelector(".nav-menu");
const buttonMenu = document.querySelector(".nav-btn-menu");
const sections = document.querySelectorAll("section");
const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const modal = document.querySelector(".modal");

function closeModal() {
  modal.classList.remove("is-open");
}

function showModal(object) {
  modal.innerHTML = `
      <div class="modal-box ${object.type}">
        <h3>${object.heading}</h3>
        <i class="${object.icon}"></i>
        <p>${object.message}</p>
        <button class="btn" onclick="closeModal()">Aceptar</button>
      </div>
  `;
  modal.classList.add("is-open");
}

function formSendEmail() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    loader.classList.add("active");
    const options = {
      method: "POST",
      body: new FormData(e.target),
    };
    fetch(
      "https://formsubmit.co/ajax/01fc21d7868b37ca64a808e480f3bc12",
      options
    )
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((json) => {
        loader.classList.remove("active");
        const success = {
          heading: "Exito",
          icon: "fa-solid fa-check",
          message: "Tu correo electrónico se ha enviado exitosamente.",
          type: "success",
        };
        showModal(success);
        form.reset();
      })
      .catch((err) => {
        loader.classList.remove("active");
        const error = {
          heading: "Error",
          icon: "fa-solid fa-x",
          message:
            "Se produjo un error al enviar el correo electrónico. Por favor, inténtalo de nuevo.",
          type: "error",
        };
        showModal(error);
      });
  });
}

function closeMenuOnWindowResize() {
  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 1024) {
      buttonMenu.classList.remove("is-open");
      menu.classList.remove("is-open");
    }
  });
}

function handleNavMenuToggle() {
  document.addEventListener("click", (e) => {
    if (
      e.target.matches(".nav-btn-menu") ||
      e.target.matches(".nav-btn-menu svg")
    ) {
      buttonMenu.classList.toggle("is-open");
      menu.classList.toggle("is-open");
    }

    if (e.target.matches(".nav-menu a")) {
      buttonMenu.classList.remove("is-open");
      menu.classList.remove("is-open");
    }
  });
}

function toggleHeaderShadowOnScroll() {
  window.addEventListener("scroll", (e) => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      header.style.boxShadow = "0px 1px 6px var(--box-shadow-color)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.style.boxShadow = "0px 1px 6px var(--box-shadow-color)";
  } else {
    header.style.boxShadow = "none";
  }
}

function updateNavMenuLinkColorsOnScroll(entries) {
  const menuLinks = document.querySelectorAll(".nav-menu a");
  entries.forEach((entry) => {
    const index = Array.from(sections).findIndex(
      (section) => section === entry.target
    );
    if (entry.isIntersecting) {
      menuLinks[index].style.color = "var(--primary-color)";
      switch (entry.target) {
        case sections[0]:
          sections[0].querySelector(".featured-image").style.animation =
            "slideRight var(--transition-long) var(--transition-delay) forwards";
          sections[0].querySelector(".featured-text").style.animation =
            "slideLeft var(--transition-long) var(--transition-delay) forwards";
          break;
        case sections[1]:
          sections[1].querySelector(".row").style.animation =
            "slideUp var(--transition-long) var(--transition-delay) forwards";
          break;
        case sections[2]:
          sections[2].querySelector(".project-container").style.animation =
            "slideUp var(--transition-long) var(--transition-delay) forwards";
          break;
        case sections[3]:
          sections[3].querySelector(".row").style.animation =
            "slideUp var(--transition-long) var(--transition-delay) forwards";
          break;
      }
    } else {
      menuLinks[index].style.color = "";
    }
  });
}

function setupVisibilityObserver(callback, targetElements) {
  let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 0.5,
  };

  let observer = new IntersectionObserver(callback, options);
  if (targetElements.length > 1) {
    targetElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    observer.observe(targetElements);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setupVisibilityObserver(updateNavMenuLinkColorsOnScroll, sections);
  toggleHeaderShadowOnScroll();
  handleNavMenuToggle();
  closeMenuOnWindowResize();
  formSendEmail();
});
