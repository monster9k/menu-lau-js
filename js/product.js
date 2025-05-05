export async function getProduct(productId) {
  const [lauRes, nuocRes] = await Promise.all([
    fetch("/data/menu_lau.json"),
    fetch("/data/menu_nuoc.json"),
  ]);

  const [lauProducts, nuocProducts] = await Promise.all([
    lauRes.json(),
    nuocRes.json(),
  ]);

  const allProducts = [...lauProducts, ...nuocProducts];
  const matchingProduct = allProducts.find(
    (product) => product.id === productId
  );

  return matchingProduct;
}
