'use strict';
const {
  Model
} = require('sequelize');
// const { FOREIGNKEYS } = require('sequelize/types/query-types');
module.exports = (sequelize, DataTypes) => {
  class kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.booking_order_detail, {
        foreignKey: {
          allowNull: false,
          name: 'id_kamar',
          references: {
            model: 'booking_order_detail',
            key: 'id_kamar'
          }
        }
      })

      this.belongsTo(models.tipe_kamar, {
        foreignKey: {
          allowNull: false,
          name: 'id_tipe_kamar',
          references: {
            model: 'tipe_kamar',
            key: 'id_tipe_kamar'
          }
        },
        as: "tipe_kamar"
      })
    }
  }
  kamar.init({
    id_kamar:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nomor_kamar: DataTypes.INTEGER,
    id_tipe_kamar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kamar',
    tableName: 'kamar'
  });
  return kamar;
};