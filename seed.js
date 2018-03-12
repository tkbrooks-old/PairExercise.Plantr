const { db, Gardener, Plot, Vegetable } = require("./models");

db
  .sync({ force: true })
  .then(() => {
    const potato = Vegetable.create({ name: "potato", color: "brown" });
    const carrot = Vegetable.create({ name: "carrot", color: "orange" });
    const celery = Vegetable.create({ name: "celery", color: "green" });
    const lettuce = Vegetable.create({ name: "lettuce", color: "green" });
    const kale = Vegetable.create({ name: "kale", color: "green" });
    return Promise.all([potato, carrot, celery, lettuce, kale]);
  })
  .then(vegetables => {
    const larry = Gardener.create({
      name: "Larry",
      age: 54,
      favoriteVegetableId: vegetables[2].id
    });
    const bob = Gardener.create({
      name: "Bob",
      age: 59,
      favoriteVegetableId: vegetables[1].id
    });
    const jason = Gardener.create({
      name: "Jason",
      age: 50,
      favoriteVegetableId: vegetables[1].id
    });
    const tyler = Gardener.create({
      name: "Tyler",
      age: 48,
      favoriteVegetableId: vegetables[0].id
    });
    const mary = Gardener.create({
      name: "Mary",
      age: 29,
      favoriteVegetableId: vegetables[4].id
    });
    const regina = Gardener.create({
      name: "Regina",
      age: 37,
      favoriteVegetableId: vegetables[3].id
    });
    return Promise.all([larry, bob, jason, tyler, mary, regina]);
  })
  .then(gardeners => {
    const plot1 = Plot.create({
      size: 5,
      shaded: true,
      gardenerId: gardeners[2].id
    });
    const plot2 = Plot.create({
      size: 7,
      shaded: false,
      gardenerId: gardeners[1].id
    });
    const plot3 = Plot.create({
      size: 2,
      shaded: false,
      gardenerId: gardeners[2].id
    });
    const plot4 = Plot.create({
      size: 9,
      shaded: true,
      gardenerId: gardeners[4].id
    });
    const plot5 = Plot.create({
      size: 6,
      shaded: false,
      gardenerId: gardeners[0].id
    });
    const plot6 = Plot.create({
      size: 5,
      shaded: true,
      gardenerId: gardeners[3].id
    });
    const plot7 = Plot.create({
      size: 10,
      shaded: false,
      gardenerId: gardeners[5].id
    });
    return Promise.all([plot1, plot2, plot3, plot4, plot5, plot6, plot7]);
  })
  .then(plots => {
    const vegetables = Vegetable.findAll();
    return Promise.all([plots, vegetables]);
    // return PlotVegetables.create({
    //   vegetableId:
    //   plotId: plots[0].id
    // })
  })
  .then(plotsAndVegetables => {
    const PlotVegetables = db.model("vegetable_mix");
    const assoc1 = PlotVegetables.create({
      vegetableId: plotsAndVegetables[1][4].id,
      plotId: plotsAndVegetables[0][2].id
    });
    const assoc2 = PlotVegetables.create({
      vegetableId: plotsAndVegetables[1][0].id,
      plotId: plotsAndVegetables[0][0].id
    });
    return Promise.all([assoc1, assoc2]);
  })
  .then(() => {
    console.log("final then");
    db.close();
  })
  .catch(error => {
    console.log(error);
    db.close();
  });
