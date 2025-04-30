import { cart } from "./cart.js";

console.log(cart);
export function renderOrderSummary() {
  let carSummaryHTML = "";

  cart.forEach((cartItem) => {
    carSummaryHTML += `
        <div class="ordered-item">
          <img
            src="${cartItem.image}"
            alt="${cartItem.name}"
            class="ordered-item-image"
          />
          <div class="ordered-item-info">
            <div class="ordered-item-name">${cartItem.name}</div>
            <div class="ordered-item-quantity">
              <button class="qty-btn">-</button>
              <span>${cartItem.quantity}</span>
              <button class="qty-btn">+</button>
            </div>
            <div class="ordered-item-price">Giá: ${cartItem.price.toLocaleString()}.000 VND</div>
          </div>
          <button class="remove-btn">-</button>
        </div>
        `;

    document.querySelector(".ordered-items-list-js").innerHTML = carSummaryHTML;
  });
}

renderOrderSummary();
