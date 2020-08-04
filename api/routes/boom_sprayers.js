const express = require('express')
const router = express.Router()
const Data = require('../controllers/boom_sprayers')

router.get('/', Data.getData)
router.post('/', Data.postData)
module.exports = router;