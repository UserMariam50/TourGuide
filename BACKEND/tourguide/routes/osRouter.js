var express = require('express');
var router = express.Router();
const osController = require('../controller/osController');
router.get('/getinfo',osController.getosinfo);

module.exports = router;
