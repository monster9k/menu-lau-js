export async function getProduct(productId) {
  const res = await fetch("/data/menu_lau.json");
  const products = await res.json();
  const matchingProduct = products.find((product) => product.id === productId);
  return matchingProduct;
}
