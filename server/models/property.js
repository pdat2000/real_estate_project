'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.User, {
        foreignKey: 'postedBy',
        as: 'rPostedBy',
      })
      Property.belongsTo(models.User, { foreignKey: 'owner', as: 'rOwner' })
      Property.belongsTo(models.PropertyType, {
        foreignKey: 'propertyTypeId',
        as: 'rPropertyType',
      })
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      listingType: {
        type: DataTypes.ENUM,
        values: ['SALE', 'RENTAL'],
      },
      price: DataTypes.TEXT,
      propertyTypeId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ['PENDING', 'CANCEL', 'APPROVED'],
      },
      isAvaliable: DataTypes.BOOLEAN,
      images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue('images')
          return rawValue ? JSON.parse(rawValue) : []
        },
        set(arrayImages) {
          this.setDataValue('images', JSON.stringify(arrayImages))
        },
      },
      featuredImage: DataTypes.STRING,
      postedBy: DataTypes.INTEGER,
      bedRoom: DataTypes.INTEGER,
      bathRoom: DataTypes.INTEGER,
      propertySize: DataTypes.FLOAT,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Property',
    }
  )
  return Property
}
