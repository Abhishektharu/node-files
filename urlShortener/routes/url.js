//routers 
const express = require('express');
const { generateShortUrl, generateAnalytics } = require('../controllers/url')
const router = express.Router();

router.post('/', generateShortUrl);
router.get("/analytics/:shortId", generateAnalytics );
module.exports = router;