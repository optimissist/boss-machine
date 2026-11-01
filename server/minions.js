const express = require('express');
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');
const minionsRouter = express.Router();

const workRouter = require('./work');
minionsRouter.use('/:minionId/work', workRouter);

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions')); //minions = case from the function that parses the data
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});
 
minionsRouter.get('/:minionId', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    req.body.id = req.params.minionId;
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  if (updatedMinion) {
    res.send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
