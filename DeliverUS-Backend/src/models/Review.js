import { Model } from 'sequelize'

const loadModel = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate (models) {
      Review.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' })
      Review.belongsTo(models.User, { foreignKey: 'customerId', as: 'user' })
    }
  }

      Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    stars: {
      allowNull:false,
      type: DataTypes.INT
    },

    body: {
      allowNull:true,
      type: DataTypes.TEXT
    },

    restaurantId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: {
          tableName: 'Restaurants'
        },
      key: 'id'
      }
    },
    customerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Review'
  })

  return Review
}

export default loadModel
