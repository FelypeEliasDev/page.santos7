const menuButton = document.querySelector(".menu");
const mainNav = document.querySelector("#menu-principal");

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  mainNav.classList.remove("open");
};

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("open", !isExpanded);
});

mainNav.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a")?.hash) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

const timelineItems = document.querySelectorAll(".tl-item");
const canHover = window.matchMedia("(hover: hover) and (min-width: 901px)");

const activateItem = (item) => {
  timelineItems.forEach((el) => {
    const active = el === item;
    el.classList.toggle("is-active", active);
    el.querySelector(".tl-hit").setAttribute("aria-expanded", String(active));
  });
};

timelineItems.forEach((item) => {
  const hit = item.querySelector(".tl-hit");
  hit.addEventListener("click", () => activateItem(item));
  hit.addEventListener("focus", () => activateItem(item));
  item.addEventListener("mouseenter", () => {
    if (canHover.matches) activateItem(item);
  });
});
