const joi = require('joi');


module.exports = {
  createMarketPlace: {
    body: {
      name: joi.string().required().label('Name'),
      category: joi.string().required().label('Category'),
      description: joi.string().required().label('Description'),
      price: joi.number().required().label('Price'),
      quantity: joi.number().required().label('Quantity'),
    },
  },
};
