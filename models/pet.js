"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      name: DataTypes.STRING
    },
    {}
  );
  pet.associate = function(models) {
    // associations can be defined here

    pet.belongsTo(models.species, {
      as: "species",
      foreignKey: "id_species"
    });

    pet.belongsTo(models.ages, {
      as: "ages",
      foreignKey: "id_ages"
    });

    pet.belongsTo(models.users, {
      as: "users",
      foreignKey: "id_user"
    });
  };
  return pet;
};
