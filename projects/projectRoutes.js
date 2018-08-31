const projectModel = require('../data/helpers/projectModel');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    projectModel.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});






module.exports = router;