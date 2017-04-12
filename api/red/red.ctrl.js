const models = require('../../data/models');

const index = function(req, res) {
  let options = {};
  // for paging variables
  let offset = parseInt(req.query.offset, 10);
  const limit = parseInt(req.query.limit, 10);
  // for searching specific category
  const category = req.query.category;
  
  if (offset && limit) {
    options.offset = offset;
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

};

const create = function(req, res) {

};

const update = function(req, res) {

};

const destroy = function(req, res) {

};

module.exports = {
  index, show, create, update, destroy
}