const express = require('express');
const db = require('../data/db');
const router = express.Router();


//-----GET-----
router.get('/', (req, res) => {
    db.find()
        .then(db => {
            res.status(200).json(db);
        })  .catch(err => {
            res.status(500).json({ message: 'The posts info could not be retrieved', err });
        });
});

//------GET BY ID-----
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(db => {
            if(db) {
                res.status(200).json(db)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        }) .catch(err => {
            res.status(500).json({ message: 'The post information could not be retrieved.', err });
        });
});

//------GET POST COMMENTS BY ID-----
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
        .then(db => {
            if(db) {
                res.status(200).json(db)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        }) .catch (err => {
            res.status(500).json({ error: 'The comments information could not be retrieved.' });
        });
});



module.exports = router;