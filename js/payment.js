import { cart } from "./cart.js";
import { getProduct } from "./product.js";

console.log(cart);
export async function renderOrderSummary() {
  let carSummaryHTML = "";

  for (const cartItem of cart) {
    const productId = cartItem.id;
    const matchingProduct = await getProduct(productId);

    carSummaryHTML += `
      <div class="ordered-item">
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
        <button class="remove-btn">-</button>
      </div>
    `;
  }

  document.querySelector(".ordered-items-list-js").innerHTML = carSummaryHTML;
}

renderOrderSummary();

export async function renderPaymentSummary() {
  let quantities = 0;
  let productPrice = 0;
  for (const cartItem of cart) {
    const product = await getProduct(cartItem.id);
    productPrice += product.price * cartItem.quantity;
    quantities += cartItem.quantity;
  }
  const tax = productPrice * 0.1;
  const total = productPrice + tax;

  const paymentSummaryHTML = `
  <div class="payment-summary-row">
      <div>Items (${quantities}):</div>
      <div class="payment-summary-money">${productPrice}.000 VND</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">${productPrice}.000 VND</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">${tax}.000 VND</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${total}.000 VND</div>
    </div>

    <button class="place-order-button button-primary">Place your order</button>
  `;
  document.querySelector(".payment-summary-show").innerHTML =
    paymentSummaryHTML;
}

renderPaymentSummary();
