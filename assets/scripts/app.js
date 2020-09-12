// jshint esversion: 9
class Product {
  title = "DEFAULT";
  imageUrl;
  description;
  price;

  //  we need a special method, a method which Javascript automatically calls when we create a new instance of this class and we create a new instance when we call new and then execute this class like a function and this special method which Javascript executes for us is called the constructor method or the constructor function.
  constructor(title, image, desc, price) {
    // we can accept any arguments, any parameters you want just like (parantez ici) that and in the curly braces and that's the interesting thing now, you can assign the values you're getting here for these parameters, to your class field, so to the properties of the object when it is instantiated then and you do this with the good old 'this' keyword. this refers class.
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

// console.log(new Product());

const productList = {
  products: [
    //  New in the end is a keyword Javascript understands that together with such a function execution which is based on a class, it's not a real function but still, should basically create a new object. this returns a new object which has this structure.
    new Product(
      "A Pillow",
      "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
      "A carpet which you might like - or not.",
      89.99
    ),
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
