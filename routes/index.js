const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route   GET /:code
// @desc    Redirect to long/original URL
router.get('/:code', async (req, res) => {

    let code = req.params.code;

    try {
        // try finding code
        let url = await Url.findOne({ urlCode: code });

        // if found, redirect to long url
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (e) {
        console.log(e);
        res.status(500).json('Server error');
    }
});

module.exports = router;