'use strict';
const isCpfValido = require('../../utils/validaCpfHelper.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey : 'docente_id'
      })
      Pessoa.hasMany(models.Matriculas, {
        foreignKey : 'estudante_id',
        scope: { status : "matriculado" },
        as: "aulasMatriculadas"
      });
      Pessoa.hasMany(models.Matriculas, {
        foreignKey : 'estudante_id',  
        as: "todasAsMatriculas"
      })
    }
  }
  Pessoa.init({
    nome: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[3,30],
          msg:'o campo nome deve ter entre 3 e 30 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'formato do email incorreto'
        }
      }      

    },
    cpf: {
      type:DataTypes.STRING,
      validate: {
        cpfEhValido: (cpf)=>{
          if(!isCpfValido(cpf)){
            throw new Error('numero de cpf invalido')
          };
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid :true,
    defaultScope: {
      where : {
        ativo :true, 
      }
    },
    scopes:{
      todosOsRegistro: { 
        where :{}
       }
    }
  });
  return Pessoa;
};