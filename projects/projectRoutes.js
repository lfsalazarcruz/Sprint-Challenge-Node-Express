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

router.get('/:id/actions', (req, res) => {
    projectModel.getProjectActions(req.params.id)
    .then(project => {
        if( project.length === 0) {
            res.status(404).json({ error: 'Project do not exists.' })
        }
        else {
            res.status(200).json({project});
        }  
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The actions information could not be retrieved.' });
    });
});

router.post('/', async (req, res) => {
    const project = req.body;
    if (project.name && project.name.length <= 128 && project.description) {
        try {
            const response = await projectModel.insert(project);
            res.status(201).json({ message: "Added new project!"});
        } 
        catch(err) {
            res.status(500).json({
                title: 'Error',
                description: 'There was an error while saving the project to the database',
            });
        }
    } else {
        res.status(422).json({ errorMessage: 'Please provide name and descritpion for the project. The name must have less than 128 characters' });
    }
});

router.put('/:id', (req, res) => {
    projectModel.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => res.status(500).json({ message: 'Update failed.' }));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectModel.remove(id)
        .then(count => {
            console.log('count: ', count);
            if(count) {
                res.status(204).json({ message: 'Project deleted.'}).end()
            } else {
                res.status(404).json({ message: 'No project with this id was found.' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Server error.' }));
});

module.exports = router;