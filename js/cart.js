export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
  let cart = getCart();
  // Ép productId thành số
  const parsedProductId = Number(productId);
  const newCart = cart.filter((cartItem) => cartItem.id !== parsedProductId);
  saveToStorage(newCart);
}

export function addToCart(item, sQuantity) {
  const cart = getCart();
  const exists = cart.find((cartItem) => cartItem.id === item.id);
  if (exists) {
    exists.quantity += sQuantity;
  } else {
    cart.push({ id: item.id, quantity: sQuantity });
  }
  saveToStorage(cart);
  console.log(cart);
}
