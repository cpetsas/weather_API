const express = require('express')
const router = express.Router()
const weatherController = require('../controller/weatherController')

router.get('/update', weatherController.pullNew)
router.get('/average', weatherController.getAvgTemp)
router.get('/summary', weatherController.getLatest)
// router.get('/topN/:n')

module.exports = router