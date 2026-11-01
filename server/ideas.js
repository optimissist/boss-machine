const express = require('express');
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');
const ideasRouter = express.Router();

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas')); 
});

ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    req.body.id = req.params.ideaId;
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  if (updatedIdea) {
    res.send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdea) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;