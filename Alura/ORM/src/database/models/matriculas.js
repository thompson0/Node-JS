'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    static associate(models) {
      Matriculas.belongsTo(models.Pessoa, {
        foreignKey : 'estudante_id'
      });
      Matriculas.belongsTo(models.Curso, {
        foreignKey : 'curso_id'
      });
    }
  }
  Matriculas.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
    tableName: 'matriculas',
    paranoid :true,
  });
  return Matriculas;
};