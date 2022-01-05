module.exports = (sequelize, Sequelize) => {
  const TF_Booking = sequelize.define("TF_Booking", {
    ID_Event: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    User_Name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    User_Phone: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    User_Mail: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    Date_Booked: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
    {
      indexes: [
        {
          name: "UniqueBooking",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "ID_Event" },
            { name: "Date_Booked" }
          ]
        }
      ]
    });

  return TF_Booking;
};

