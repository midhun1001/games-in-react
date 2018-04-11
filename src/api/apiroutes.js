const express = require('express');
const routes = express.Router();
const Teams = require('./context/Teams');
const Training = require('./context/Training');
const Assets = require('./context/Assets');
const Onboard = require('./context/Onboard');

routes.get('/teams', async (req, res) => {
  const response = await Teams.getTeams(req.originalUrl);
  res.status(200)
  .send(response);
});
routes.get('/training', async (req, res) =>{
  const response = await Training.getTraining(req.originalUrl);
  res.status(200)
  .send(response);
})
routes.get('/assets', async (req, res) =>{
  const response = await Assets.getAssets();
  res.status(200)
  .send(response);
});
routes.get('/onboard', async (req , res) =>{
  const response = await Onboard.getDetails();
  res.status(200)
  .send(response);
})
routes.post('/newasset', async(req, res) => {
  const response = await Assets.newAsset(req.body);
  console.log(req.body);
  res.status(200)
  .send(response);
});
routes.get('/deleteassets',  async(req, res) => {
  const response = await Assets.deleteAsset(req.originalUrl);
  res.status(200)
  .send(response);
});

module.exports = routes;
