const Sequelize = require('sequelize');

const sequelize = new Sequelize('review', 'adamreback', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const reviews = sequelize.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  restaurantID: Sequelize.INTEGER,
  username: Sequelize.STRING(50),
  location: Sequelize.STRING(50),
  vip: Sequelize.BOOLEAN,
  totalReviews: Sequelize.SMALLINT,
  overall: Sequelize.SMALLINT,
  food: Sequelize.SMALLINT,
  service: Sequelize.SMALLINT,
  ambience: Sequelize.SMALLINT,
  value: Sequelize.SMALLINT,
  recommended: Sequelize.BOOLEAN,
  date: Sequelize.STRING(100),
  test: Sequelize.STRING(255)
})

// sequelize.close();
module.exports = reviews;