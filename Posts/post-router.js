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
    db.findById(req.params.id) // requires the id input
        .then(db => {
            if(db) {
                res.status(200).json(db) //if that ID is in the DB, that post will be retrieved
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' }); //if there is no post with that ID, a 404(not found) will be returned
            }
        }) .catch(err => {
            res.status(500).json({ message: 'The post information could not be retrieved.', err }); // if there was an error in the code, 500 will return
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

//----POST-----
router.post('/', (req, res) => {
    db.insert(req.body)
        .then(post => {
            if(post) {
                res.status(201).json(post);
            } else {
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
            }
        }) .catch(err => {
            res.status(500).json({error: 'There was an error while saving the post to the database', err});
        });
});


//-----POST COMMENTS-----
router.post('/:id/comments', (req, res) => {
    const commentInfo = req.body;
    commentInfo.post_id = req.params.id;
    db.insertComment(commentInfo)
        .then(comment => {
            if(comment) {
                res.status(201).json(comment); //if everything is right, comment gets created
            } else if(db) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' }); //if something is wrong, then 404 will rendering if the ID doesn't exist
            } else {
                res.status(400).json({ errorMessage: 'Please provide text for the comment' }); //Text for the comment is required
            }
        }) .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the comment to the database' });
        });
});

//-------PUT------- 
//The update works when you double check, but initially it tells you it couldn't be modified
router.put('/:id', (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes)
        .then(db => {
            if(post) {
                res.status(200).json(post);
            } else if (db) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }
        }) .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." });
        });
});


//-------- DELETE ------
//The post will be removed, but it will say it couldn't be deleted
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ message: `Deleted ${post_id} successfully` });
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' });
            }
        }) .catch(err => {
            res.status(500).json({ err: 'The post could not be removed' });
        });
});


module.exports = router;