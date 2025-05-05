import { getCart, removeFromCart } from "./cart.js";
import { getProduct } from "./product.js";
import { formatCurrency } from "./utils/money.js";

export async function renderPaymentSummary() {
  const cart = getCart();
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
      <div class="payment-summary-money">${formatCurrency(tax)}.000 VND</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${formatCurrency(total)}.000 VND</div>
    </div>

    <button class="place-order-button button-primary">Place your order</button>
  `;
  document.querySelector(".payment-summary-show").innerHTML =
    paymentSummaryHTML;
}

renderPaymentSummary();
