const express = require('express');

function crud(Model, options = {}) {
  const { middleware = [] } = options;

  const router = express.Router();

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  middleware.forEach((m) => router.use(m));

  router.post('/', async (req, res) => {
    try {
      const model = await new Model(req.body);
      await model.save();

      res.status(201).json(model);
    } catch (err) {
      res.json(err);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const data = await Model.find({});

      res.json(data);
    } catch (err) {
      res.json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const data = await Model.findById(req.params.id);

      res.json(data);
    } catch (err) {
      res.json(err);
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      const data = await Model.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );

      res.json(data);
    } catch (error) {
      res.json(error);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.json(err);
    }
  });

  return router;
}

module.exports = crud;
