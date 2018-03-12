const { db, Gardener, Plot, Vegetable } = require("./models");
const NOW = 

db.sync({ force: true })
.then(() => {
const potato = Vegetable.create({name: 'potato', color: 'brown'})
const carrot = Vegetable.create({name: 'carrot', color: 'orange'})
const celery = Vegetable.create({name: 'celery', color: 'green'})
const lettuce = Vegetable.create({name: 'lettuce', color: 'green'})
return Promise.all([potato, carrot, celery, lettuce])
})
.then((Vegetable) => {
console.log(Vegetable)
})
.then(() => {
    console.log('then')
    db.close();
  })
  .catch((error) => {
    console.log(error)
    db.close();
  });
