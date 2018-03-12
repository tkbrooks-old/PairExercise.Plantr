const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/plantr", {
  logging: false
});

const Gardener = db.define("gardener", {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
});

const Plot = db.define("plot", {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
});

const Vegetable = db.define("vegetable", {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
});

Plot.belongsTo(Gardener);

Plot.belongsToMany(Vegetable, { through: "vegetable_mix" });
Vegetable.belongsToMany(Plot, { through: "vegetable_mix" });

Gardener.belongsTo(Vegetable, {as: 'favoriteVegetable'});

module.exports = { db, Gardener, Plot, Vegetable };
