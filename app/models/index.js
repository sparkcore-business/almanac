const config = require("../config/db.config.js");

// Init Sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    define: {
      freezeTableName: true
    },
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all table from models
db.TR_Users = require("../models/tr_users.model.js")(sequelize, Sequelize);
db.TF_Events = require("../models/tf_events.model.js")(sequelize, Sequelize);
db.TF_Booking = require("../models/tf_booking.model.js")(sequelize, Sequelize);
db.TF_Event_Availability = require("../models/tf_event_availability.model.js")(sequelize, Sequelize);

db.TF_Events.hasMany(db.TF_Booking, {foreignKey: 'ID_Event'});
db.TF_Booking.belongsTo(db.TF_Events, {foreignKey: 'ID_Event'});

db.TF_Events.hasMany(db.TF_Event_Availability, {foreignKey: 'ID_Event'});
db.TF_Event_Availability.belongsTo(db.TF_Events, {foreignKey: 'ID_Event'});

// db.Clients.hasOne(db.ClientsInformations, {foreignKey: 'ID_Client'});
// db.ClientsInformations.belongsTo(db.Clients, {foreignKey: 'ID_Client'});


// db.Clients.hasOne(db.ClientsInformations, {foreignKey: 'ID_Client'});

module.exports = db;
