const companyLink = document.querySelector('.site-header nav a[href="main.html"]');
const contactLink = document.querySelector('.site-header nav a[href="#contact"]');
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.getElementById("primary-nav");

function updateCurrentLink() {
  if (!companyLink || !contactLink) return;

  if (window.location.hash === "#contact") {
    companyLink.removeAttribute("aria-current");
    contactLink.setAttribute("aria-current", "location");
  } else {
    companyLink.setAttribute("aria-current", "page");
    contactLink.removeAttribute("aria-current");
  }
}

function setMenuOpen(isOpen) {
  if (!menuToggle || !primaryNav) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  primaryNav.classList.toggle("is-open", isOpen);
}

function closeMenu() {
  setMenuOpen(false);
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    setMenuOpen(willOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!menuToggle.contains(event.target) && !primaryNav.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 701px)").matches) closeMenu();
  });
}

window.addEventListener("hashchange", updateCurrentLink);
updateCurrentLink();
