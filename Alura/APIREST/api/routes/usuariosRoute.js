const express = require("express");
const router = express.Router()

router
    .post('/usuarios')
    .get('/usuarios')
    .get('/usuarios/id/:id')
    .put('/usuarios/iq/:id')
    .delete('/usuarios/iq/:id')

module.exports = router