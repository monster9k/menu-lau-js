let cart = [];

fetch("data/menu_lau.json") // Không dùng ../
  .then((res) => res.json()) // nhớ parse JSON
  .then((menu) => {
    const container = document.querySelector(".menu-list");

    container.innerHTML = "";

    menu.forEach((item) => {
      const HTML = `
        <div class="item">
            <h3>${item.name}</h3>
            <img
              src="${item.image}"
              alt="${item.name}"
              class="image_hotpot"
            />
            <p>${item.note}</p>
            <p>Giá: ${item.price.toLocaleString()}</p>
            <button>Add to cart</button>
          </div>
        `;

      container.innerHTML += HTML;
    });
  })
  .catch((error) => {
    console.log("Lỗi khi tải file JSON:", error);
  });
