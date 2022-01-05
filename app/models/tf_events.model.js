module.exports = (sequelize, Sequelize) => {
  const TF_Events = sequelize.define("TF_Events", {
    ID_Event: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_User: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    Event_Name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    Event_Mail: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Event_Duration: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return TF_Events;
};

