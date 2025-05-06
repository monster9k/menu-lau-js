export async function getProduct(productId) {
  const [lauRes, nuocRes, sideRes] = await Promise.all([
    fetch("/data/menu_lau.json"),
    fetch("/data/menu_nuoc.json"),
    fetch("/data/menu_sidedish.json"),
  ]);

  const [lauProducts, nuocProducts, sideProducts] = await Promise.all([
    lauRes.json(),
    nuocRes.json(),
    sideRes.json(),
  ]);

  const allProducts = [...lauProducts, ...nuocProducts, ...sideProducts];
  const matchingProduct = allProducts.find(
    (product) => product.id === productId
  );

  return matchingProduct;
}
