module.exports = (sequelize, Sequelize) => {
  const TF_Event_Availability = sequelize.define("TF_Event_Availability", {
    ID_Event: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Day: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    DayOfWeek: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Available: {
      type: Sequelize.TINYINT,
      allowNull: false
    },
    Available_From: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Available_To: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return TF_Event_Availability;
};

