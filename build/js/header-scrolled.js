"use strict";

const header = document.querySelector("header");
const shippingNotice = header.querySelector(".shipping-notice__wrapper");
const headerMenuButtons = header.querySelectorAll(".menu-item__button");
function checkPageScroll() {
  if (window.scrollY > 0) {
    shippingNotice.style.maxHeight = shippingNotice.scrollHeight + "px";
    header.classList.add("scrolled");
  } else {
    shippingNotice.style.maxHeight = "0";
    header.classList.remove("scrolled");
  }
}

// Закриває всі відкриті меню
function closeAllMenus() {
  headerMenuButtons.forEach(button => {
    const menuClass = button.dataset.menu;
    const menu = document.querySelector("." + menuClass);
    button.classList.remove("active");
    menu.classList.remove("active");
    menu.style.maxHeight = "0";
  });
  header.classList.remove("opened");
}

// Вмикає/вимикає потрібне меню
function toggleMenu(button, menu) {
  const isActive = menu.classList.contains("active");
  closeAllMenus(); // Закриваємо всі інші меню

  if (!isActive) {
    button.classList.add("active");
    menu.classList.add("active");
    menu.style.maxHeight = menu.scrollHeight + "px";
    header.classList.add("opened");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Ініціалізація scroll
  checkPageScroll();

  // Клік по меню
  headerMenuButtons.forEach(button => {
    const menuClass = button.dataset.menu;
    const menu = document.querySelector("." + menuClass);
    button.addEventListener("click", e => {
      e.stopPropagation(); // Щоб не спрацьовував обробник document
      toggleMenu(button, menu);
    });
  });

  // Клік поза меню — закриває все
  document.addEventListener("click", event => {
    let clickInside = false;
    headerMenuButtons.forEach(button => {
      const menuClass = button.dataset.menu;
      const menu = document.querySelector("." + menuClass);
      if (button.contains(event.target) || menu.contains(event.target)) {
        clickInside = true;
      }
    });
    if (!clickInside) closeAllMenus();
  });

  // Скрол — оновлення shipping + закриття меню
  window.addEventListener("scroll", () => {
    checkPageScroll();
    closeAllMenus();
  });
});
//# sourceMappingURL=header-scrolled.js.map
