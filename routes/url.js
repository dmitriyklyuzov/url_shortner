const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

// model
const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    create short URL
router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        return res.status(400).json('Invalid baseUrl');
    }

    if (!validUrl.isUri(longUrl)) {
        return res.status(400).json('Invalid long url');
    }

    try {
        // try finding existing record
        let url = await Url.findOne({longUrl});

        // just return existing
        if (url) {
            res.json(url);
        }
        // create new
        else {
            // create url code
            const urlCode = shortId.generate();

            const shortUrl = baseUrl + '/' + urlCode;

            // create new instance
            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            });

            // save new url to db
            await url.save();

            res.json(url);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Something went wrong');
    }

});

module.exports = router;