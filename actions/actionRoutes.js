const actionModel = require('../data/helpers/actionModel');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    actionModel.get()
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The action information could not be retrieved.' });
    });
});

router.post('/', async (req, res) => {
    const action = req.body;
    if (action.project_id && action.description.length <= 128 && action.description && action.notes) {
        try {
            const response = await actionModel.insert(action);
            res.status(201).json({ message: "Added new action!"});
        } 
        catch(err) {
            res.status(500).json({
                title: 'Error',
                description: 'There was an error while saving the action to the database',
            });
        }
    } else {
        res.status(422).json({ message: 'Project_id, description and notes required. The description must have less than 128 characters' });
    }
});

router.put('/:id', (req, res) => {
    actionModel.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json({ message: 'Update successful!' });
    })
    .catch(err => res.status(500).json({ message: 'Update failed.' }));
});

router.delete('/:id', (req, res) => {
    const actionID = req.params.id;
    actionModel.remove(actionID)
        .then(count => {
            console.log('count: ', count);
            if(count) {
                res.status(204).json({ message: 'Action deleted.'}).end()
            } else {
                res.status(404).json({ message: 'No action was found.' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Server error.' }));
});

module.exports = router;