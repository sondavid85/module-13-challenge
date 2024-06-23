const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Disable logging or set to true for debugging
});

// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product.belongsTo(Category, { foreignKey: 'category_id' });
// Category.hasMany(Product, { foreignKey: 'category_id' });

// Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id', as: 'Tags' });
// Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id', as: 'Products' });

const models = {
  Category,
  Product,
  Tag,
  ProductTag,
  sequelize
};

module.exports = models;