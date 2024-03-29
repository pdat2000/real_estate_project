module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Properties", "owner", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Properties", "owner")
  },
}
