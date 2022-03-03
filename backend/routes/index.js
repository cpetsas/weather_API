var express = require('express')
var router = express.Router();

router.use('/forecast', require('./forecast'))

module.exports = router