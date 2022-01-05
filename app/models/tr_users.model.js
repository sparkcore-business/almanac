module.exports = (sequelize, Sequelize) => {
  const TR_Users = sequelize.define("TR_Users", {
    ID_User: {
      type: Sequelize.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  });

  return TR_Users;
};

