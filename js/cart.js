export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(item, sQuantity) {
  let quantity;
  const exists = cart.find((cartItem) => cartItem.id === item.id);
  if (exists) {
    exists.quantity += sQuantity;
  } else {
    cart.push({ ...item, quantity: sQuantity });
  }
  console.log(cart);
  saveToStorage();
}
