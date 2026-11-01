const express = require('express');
const {getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase} = require('./db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));  //meetings == "case"
});

// POST a new meeting (the server builds it)
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

// DELETE all meeting
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;