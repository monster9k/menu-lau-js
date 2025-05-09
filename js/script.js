import { addToCart } from "./cart.js";
import { getCart } from "./cart.js";

function updateCartQuantity() {
  const cart = getCart();
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

loadMenu("hotpot");

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    const type = item.dataset.type;
    loadMenu(type);
  });
});

function loadMenu(type) {
  let file = "";
  if (type === "hotpot") {
    file = "data/menu_lau.json";
  } else if (type === "water") {
    file = "data/menu_nuoc.json";
  } else if (type === "Side dish") {
    file = "data/menu_sidedish.json";
  } else return;

  fetch(file) // Không dùng ../
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
            <p>Giá: ${item.price.toLocaleString()}.000 VND</p>
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
          document
            .querySelector(`.button-quantity-${id}`)
            .classList.add("Added");
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
          updateCartQuantity();
        });
      });
    })
    .catch((error) => {
      console.log("Lỗi khi tải file JSON:", error);
    });
}

function logOut() {
  localStorage.removeItem("currentUser");
  location.reload();
}

window.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const userArea = document.getElementById("user-area");

  if (currentUser) {
    const fullName = currentUser.trim();
    const nameParts = fullName.split(" ");
    const lastTwo = nameParts.slice(-2).join(" ");
    userArea.innerHTML = `
      <div class="menu-all">
          <div class="menu-cart-link">
        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/cart-icon.png" />
          <div class="cart-quantity js-cart-quantity">0</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>

      <div class="user-menu">
        <div class="ava-menu" id="ava-menu">
          <img src="/images/avatar.jpg" id="avatar" class="avatar" alt="Avatar">
          <span style="margin-left: 8px;">${lastTwo}</span>
        </div>
          <ul class="dropdown" id="dropdown">
              <li id="user_name" style="font-weight: bold; pointer-events: none;">👤 ${currentUser}</li>
              <li><a href="#">🏠 Trang chủ</a></li>
              <li id="Gio_hang"> <a href="checkout.html">🛒 Giỏ hàng </a></li>
              <li><a href="#" onclick="logOut()">🚪 Đăng xuất</a></li>
          </ul>
      </div>
      </div> 
      
    `;

    const avaMenu = document.getElementById("ava-menu");
    const dropdown = document.getElementById("dropdown");

    avaMenu.addEventListener("click", () => {
      const isDropdownVisible = dropdown.style.display === "block";

      dropdown.style.display = isDropdownVisible ? "none" : "block";
    });

    const logOutLink = document.querySelector("#dropdown li:last-child a");
    logOutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logOut();
    });
  }
});
