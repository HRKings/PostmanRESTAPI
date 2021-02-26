const express = require('express');
const {MongoClient} = require('mongodb');

const mongo = new MongoClient("mongodb://localhost:27017");
const router = express.Router();

mongo.connect()
// eslint-disable-next-line no-unused-vars
router.get('/jobs', async (req, res, next) => {
  const result = await mongo.db("jobs").collection("jobs").find({});

  result.toArray(function (err, result) {
    if (err) {
        res.status(500).send(err);
    } else {

        res.json(result);
    }
  });

});

router.get('/jobs/:name', async (req, res, next) => {
  var jobName = req.params.name;
  const result = await mongo.db("jobs").collection("jobs").find({ name : jobName });

  result.toArray(function (err, result) {
    if (err) {
        res.status(500).send(err);
    } else {

        res.json(result);
    }
  });

});

router.post('/jobs', async (req, res, next) => {
  const result = await mongo.db("jobs").collection("jobs").insertOne(req.body);
  res.json(result.ops);
});

router.get('/upvote', async (req, res, next) => {
  const result = await mongo.db("jobs").collection("upvotes").find({});

  result.toArray(function (err, result) {
    if (err) {
        res.status(500).send(err);
    } else {

        res.json(result);
    }
  });
});

router.get('/upvote/:userName', async (req, res, next) => {
  var userName = req.params.userName;
  const result = await mongo.db("jobs").collection("upvotes").find({ user : userName });

  result.toArray(function (err, result) {
    if (err) {
        res.status(500).send(err);
    } else {

        res.json(result);
    }
  });
});

router.post('/upvote/:id', async (req, res, next) => {
  var id = req.params.id;
  var user = req.body.name;

  const result = await mongo.db("jobs").collection("upvotes").insertOne({ job: id, user });
  res.json(result.ops);
});

mongo.close();
module.exports = router;
