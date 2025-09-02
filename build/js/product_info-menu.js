document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".general-info__list");
  const menuButtons = document.querySelectorAll(".general-info__menu .menu__item");
  const infoItems = document.querySelectorAll(".general-info__list .list__item");
  menuButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.classList.contains("active")) return;
      menuButtons.forEach(insideButton => {
        insideButton.classList.remove("active");
      });
      button.classList.add("active");
      infoItems.forEach(item => {
        const dataInfoBlock = button.dataset.item;
        if (item.classList.contains(dataInfoBlock)) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
  });
});
//# sourceMappingURL=product_info-menu.js.map
