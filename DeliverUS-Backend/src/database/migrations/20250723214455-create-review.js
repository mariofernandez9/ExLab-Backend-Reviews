module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
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
        onDelete: 'CASCADE', // Se borran las reseñas de los restaurantes eliminados
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
        onDelete: 'CASCADE', // Se borran las reseñas de los usuarios eliminados
        references: {
          model: {
            tableName: 'Users'
          },
        key: 'id'
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews')
  }
}
