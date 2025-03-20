const express = require('express')
const pessoas = require('./pessoasRoutes.js')
const catergorias = require('./categoriasRoute.js')
const cursos = require('./cursoRoutes.js')

module.exports = app =>{
    app.use(
        express.json(),
        pessoas,
        catergorias,
        cursos
    );
};