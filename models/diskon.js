'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class diskon extends Model {
    static associate(models) {
      // isi kalau nanti ada relasi
    }
  }

  diskon.init(
    {
      iddiskon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      namadiskon: {
        type: DataTypes.STRING,
      },
      nominal: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'diskon',
      tableName: 'diskon',
      timestamps: false
    }
  );

  return diskon;
};