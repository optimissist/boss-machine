const express = require('express');
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');
const workRouter = express.Router({ mergeParams: true });


// Runs before every route
workRouter.use((req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    next();
  } else {
    res.status(404).send();
  }
});

// GET all 
workRouter.get('/', (req, res, next) => {
  const allWork = getAllFromDatabase('work').filter((work) => {
    return work.minionId === req.params.minionId;
  });
  res.send(allWork);
});

// POST a new 
workRouter.post('/', (req, res, next) => {
  req.body.minionId = req.params.minionId;
  const newWork = addToDatabase('work', req.body);
  res.status(201).send(newWork);
});

// PUT (update) 
workRouter.put('/:workId', (req, res, next) => {
  const work = getFromDatabaseById('work', req.params.workId);
  if (!work) {
    res.status(404).send();
  } else if (work.minionId !== req.params.minionId) {
    res.status(400).send();
  } else {
    req.body.id = req.params.workId;
    req.body.minionId = req.params.minionId;
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});

// DELETE one 
workRouter.delete('/:workId', (req, res, next) => {
  const deletedWork = deleteFromDatabasebyId('work', req.params.workId);
  if (deletedWork) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});



module.exports = workRouter;