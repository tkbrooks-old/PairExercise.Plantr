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
  .then(([potato, carrot, celery, lettuce, kale]) => {
    const larry = Gardener.create({
      name: "Larry",
      age: 54,
      favoriteVegetableId: carrot.id
    });
    const bob = Gardener.create({
      name: "Bob",
      age: 59,
      favoriteVegetableId: potato.id
    });
    const jason = Gardener.create({
      name: "Jason",
      age: 50,
      favoriteVegetableId: lettuce.id
    });
    const tyler = Gardener.create({
      name: "Tyler",
      age: 48,
      favoriteVegetableId: kale.id
    });
    const mary = Gardener.create({
      name: "Mary",
      age: 29,
      favoriteVegetableId: kale.id
    });
    const regina = Gardener.create({
      name: "Regina",
      age: 37,
      favoriteVegetableId: celery.id
    });
    return Promise.all([larry, bob, jason, tyler, mary, regina]);
  })
  .then(([larry, bob, jason, tyler, mary, regina]) => {
    const plot1 = Plot.create({
      size: 5,
      shaded: true,
      gardenerId: bob.id
    });
    const plot2 = Plot.create({
      size: 7,
      shaded: false,
      gardenerId: jason.id
    });
    const plot3 = Plot.create({
      size: 2,
      shaded: false,
      gardenerId: tyler.id
    });
    const plot4 = Plot.create({
      size: 9,
      shaded: true,
      gardenerId: regina.id
    });
    const plot5 = Plot.create({
      size: 6,
      shaded: false,
      gardenerId: mary.id
    });
    const plot6 = Plot.create({
      size: 5,
      shaded: true,
      gardenerId: larry.id
    });
    const plot7 = Plot.create({
      size: 10,
      shaded: false,
      gardenerId: jason.id
    });
    return Promise.all([plot1, plot2, plot3, plot4, plot5, plot6, plot7]);
  })
  .then(plots => {
    const vegetables = Vegetable.findAll();
    return Promise.all([plots, vegetables]);
  })
  .then(
    ([
      [plot1, plot2, plot3, plot4, plot5, plot6, plot7],
      [potato, carrot, celery, lettuce, kale]
    ]) => {
      const PlotVegetables = db.model("vegetable_mix");
      const assoc1 = PlotVegetables.create({
        vegetableId: carrot.id,
        plotId: plot3.id
      });
      const assoc2 = PlotVegetables.create({
        vegetableId: potato.id,
        plotId: plot2.id
      });
      const assoc3 = PlotVegetables.create({
        vegetableId: lettuce.id,
        plotId: plot1.id
      });
      const assoc4 = PlotVegetables.create({
        vegetableId: celery.id,
        plotId: plot4.id
      });
      const assoc5 = PlotVegetables.create({
        vegetableId: kale.id,
        plotId: plot5.id
      });
      const assoc6 = PlotVegetables.create({
        vegetableId: kale.id,
        plotId: plot6.id
      });
      const assoc7 = PlotVegetables.create({
        vegetableId: potato.id,
        plotId: plot7.id
      });
      return Promise.all([
        assoc1,
        assoc2,
        assoc2,
        assoc3,
        assoc4,
        assoc5,
        assoc6,
        assoc7
      ]);
    }
  )
  .then(() => {
    console.log("final then");
    db.close();
  })
  .catch(error => {
    console.log(error);
    db.close();
  });
