let cart = [];

export function addToCart(item) {
  let quantity;
  const exists = cart.find((cartItem) => cartItem.id === item.id);
  if (exists) {
    exists.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  console.log(cart);
}
