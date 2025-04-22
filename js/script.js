import { addToCart } from "./cart.js";

fetch("data/menu_lau.json") // Không dùng ../
  .then((res) => res.json()) // nhớ parse JSON
  .then((menu) => {
    const container = document.querySelector(".menu-list");

    container.innerHTML = "";

    menu.forEach((item) => {
      const HTML = `
        <div class="item">
            <h3>${item.name}</h3>
            <img
              src="${item.image}"
              alt="${item.name}"
              class="image_hotpot"
            />
            <p>${item.note}</p>
            <p>Giá: ${item.price.toLocaleString()}.000</p>
            <button class="add-btn" data-id="${item.id}">Add to cart</button>
          </div>
        `;

      container.innerHTML += HTML;
    });

    document.querySelectorAll(".add-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        const selectedItem = menu.find((item) => item.id === id);
        if (selectedItem) addToCart(selectedItem);
      });
    });
  })
  .catch((error) => {
    console.log("Lỗi khi tải file JSON:", error);
  });
