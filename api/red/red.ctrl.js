const models = require('../../data/models');

const index = function(req, res) {
  let options = {};
  // for paging variables
  req.query.offset = req.query.offset || 0;
  req.query.limit = req.query.limit || 0;
  
  const offset = parseInt(req.query.offset, 10);
  const limit = parseInt(req.query.limit, 10);
  
  if (Number.isNaN(offset)) {
    return res.status(400).end();
  }
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  // for searching specific category
  const category = req.query.category;
  
  if (limit) {
    if (offset > 0) {
      options.offset = offset;
    }
    options.limit = limit;
  } 

  if (category) {
    options.where = {
      category
    };
  }

  models.Red.findAll(options)
      .then(contents => {
        res.json(contents);
      });
};

const show = function(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  models.Red.findOne({
        where: {id}
      })
      .then(content => {
        if (!content) {
          return res.status(404).end();
        }
        res.json(content);
      });
};

const create = function(req, res) {
  const category = req.body.category;
  if (!category) {
    return res.status(400).end();
  }

  const title = req.body.title;
  if (!title) {
    return res.status(400).end();
  }
   
  const contents = req.body.contents;

  if (!contents) {
    return res.status(400).end();
  }

  const code = req.body.code || '';
  const data = {
    category, title, contents, code
  };

  models.Red.create(data)
      .then(content => {
        res.status(201).json(content);
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).end();
        }
      });
};

const update = function(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const category = req.body.category;
  if (!category) {
    return res.status(400).end();
  }

  const title = req.body.title;
  if (!title) {
    return res.status(400).end();
  }

  const contents = req.body.contents;
  if (!contents) {
    return res.status(400).end();
  }

  const code = req.body.code;

  models.Red.findOne({ where: { id }})
      .then(content => {
        if (!content) {
          return res.status(404).end();
        }
        content.category = category;
        content.title = title;
        content.contents = contents;
        content.code = code;
        content.save()
            .then(_ => {
              res.json(content);
            })
            .catch(err => {
              if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
              }
            });
      });
};

const destroy = function(req, res) {

};

module.exports = {
  index, show, create, update, destroy
};