import { getCart, removeFromCart } from "./cart.js";
import { getProduct } from "./product.js";
import { formatCurrency } from "./utils/money.js";
import { renderPaymentSummary } from "./payment.js";

export async function renderOrderSummary() {
  const cart = getCart();
  let carSummaryHTML = "";

  for (const cartItem of cart) {
    const productId = cartItem.id;
    const matchingProduct = await getProduct(productId);

    carSummaryHTML += `
      <div class="ordered-item js-ordered-item-${matchingProduct.id}">
        <img
          src="${matchingProduct.image}"
          alt="${matchingProduct.name}"
          class="ordered-item-image"
        />
        <div class="ordered-item-info">
          <div class="ordered-item-name">${matchingProduct.name}</div>
          <div class="ordered-item-quantity">
            <button class="qty-btn">-</button>
            <span>${cartItem.quantity}</span>
            <button class="qty-btn">+</button>
          </div>
          <div class="ordered-item-price">
            Giá: ${matchingProduct.price.toLocaleString()}.000 VND
          </div>
        </div>
        <button class="remove-btn js-remove-btn" data-product-id="${
          matchingProduct.id
        }">-</button>
      </div>
    `;
  }

  document.querySelector(".ordered-items-list-js").innerHTML = carSummaryHTML;

  document.querySelectorAll(".js-remove-btn").forEach((link) => {
    link.addEventListener("click", async () => {
      const productId = link.dataset.productId; //dang la string phai ep kieu
      console.log(productId);
      removeFromCart(productId);

      const orderedItem = document.querySelector(
        `.js-ordered-item-${productId}`
      );
      orderedItem.remove();
      await renderPaymentSummary();
      await renderOrderSummary();
    });
  });
  console.log(cart);
}
renderOrderSummary();
