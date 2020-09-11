// jshint esversion: 9
class Product {
  title = "DEFAULT";
  imageUrl;
  description;
  price;
}

console.log(new Product());

const productList = {
  products: [
    //  New in the end is a keyword Javascript understands that together with such a function execution which is based on a class, it's not a real function but still, should basically create a new object. this returns a new object which has this structure.
    {
      title: "A Pillow",
      imageUrl:
        "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
      description: "A soft pillow!",
      price: 19.99,
    },
    {
      title: "A Carpet",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
      description: "A carpet which you might like - or not.",
      price: 89.99,
    },
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
        <div>
          <img src="${prod.imageUrl}" alt="${prod.title}">
          <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();
