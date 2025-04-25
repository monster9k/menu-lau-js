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
            <div class="button_quantity button-quantity-${item.id}">
              <button class="add-btn" data-id="${item.id}">Add to cart</button>
              <select id="quantity" name="quantity" class="select_quantity select-quantity-${
                item.id
              }">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              </select>
              <p>Added</p>
            </div>
          </div>
        `;

      container.innerHTML += HTML;
    });

    document.querySelectorAll(".add-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        const selectedItem = menu.find((item) => item.id === id);
        document.querySelector(`.button-quantity-${id}`).classList.add("Added");
        setTimeout(() => {
          document
            .querySelector(`.button-quantity-${id}`)
            .classList.remove("Added");
        }, 2000);

        const selectQuantity = document.querySelector(
          `.select-quantity-${id}`
        ).value;

        const sQuantity = Number(selectQuantity);
        if (selectedItem) addToCart(selectedItem, sQuantity);
      });
    });
  })
  .catch((error) => {
    console.log("Lỗi khi tải file JSON:", error);
  });

window.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const userArea = document.getElementById("user-area");

  if (currentUser) {
    userArea.innerHTML = `
      <div class="user-menu">
        <div class="ava-menu" id="ava-menu">
          <img src="/images/avatar.jpg" id="avatar" class="avatar" alt="Avatar">
          <span style="margin-left: 8px;">Tài khoản</span>
        </div>
          <ul class="dropdown" id="dropdown">
                <li id="username">Giỏ hàng</li>
                <li><a href="history.html">Lịch sử đã mua</a></li>
                <li><a href="#" onclick="logout()">Đăng xuất</a></li>
          </ul>
      </div>
    `;

    const avaMenu = document.getElementById("ava-menu");
    const dropdown = document.getElementById("dropdown");

    avaMenu.addEventListener("click", () => {
      const isDropdownVisible = dropdown.style.display === "block";

      dropdown.style.display = isDropdownVisible ? "none" : "block";
    });
  }
});
