const express = require('express');
const router = express.Router();
const {handleUrlGeneration,handleCheckClicks} = require('../controller/url');
router.post('/', handleUrlGeneration);
router.get('/analytics/:shortId',handleCheckClicks);
module.exports =  router;
