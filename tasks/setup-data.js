const faker = require("faker");
const { Category } = require("../app/models/category");
const { Product } = require("../app/models/product");
const { mongoose } = require("../config/db_connect");

const categories = [];
const products = [];

for (let i = 0; i < 10; i++) {
  const data = {
    name: faker.commerce.department()
  };
  const category = new Category(data);
  categories.push(category.save());
}

Promise.all([...categories]).then(values => {
  values.forEach(category => {
    for (let i = 0; i < 5; i++) {
      const data = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.paragraph(),
        stock: faker.random.number(1, 100),
        category: category._id,
        imageUrl: faker.image.imageUrl()
      };
      const product = new Product(data);
      products.push(product.save());
    }

    Promise.all([...products])
      .then(products => {
        console.log(products);
        mongoose.connection.close();
      })
      .catch(err => console.log(err));
  });
});
