// jshint esversion: 9
class Product {
  // we basically overwrite everything we set up there in the constructor and therefore you can actually remove that. This definition here is not required to be able to assign values, in the constructor you can add properties for the first time, so without having defined fields for them before just like that with the this keyword and indeed it makes no sense or it rarely makes sense to define fields here.

  // title = "DEFAULT";
  // imageUrl;
  // description;
  // price;

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

class ProductItem {
  constructor(product) {
    // just to re-iterate what we learned: "this.product = product" adds a new 'product' property to the eventually created objects.
    this.product = product;
  }
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    `;
    return prodEl;
  }
}

class ProductList {
  // what will happen here is that when we create an object based on this class, a product's property will be added automatically and the default value will be that array.
  products = [
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
  ];

  // the products field is magically added as a property during the construction process anyways.
  constructor() {}

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      // as you learned, render will return this new object. So now we can append product element again because prod el is such a DOM object created by render
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();
