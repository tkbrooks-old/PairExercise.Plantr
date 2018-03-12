const { db, gardener, plot, vegetable } = require("./models");

db.sync({ force: true })
  .then(() => {
    console.log('then')
    db.close();
  })
  .catch((error) => {
    console.log(error)
    db.close();
  });
