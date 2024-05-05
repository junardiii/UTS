const express = require('express');
const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const marketPlaceController = require('./marketplace-controller');
const marketPlaceValidator = require('./marketplace-validator');

const route = express.Router();


module.exports = (app) => {
  app.use('/marketplace', route);

  // Create Marketplace
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(marketPlaceValidator.createMarketPlace),
    marketPlaceController.createMarketPlace
  );

  // Read Marketplace
  route.get('/', authenticationMiddleware, marketPlaceController.getMarketPlaces);


  // Update Marketplace
  route.put(
    '/:id',
    authenticationMiddleware,
    marketPlaceController.updateMarketPlace
  );

  // Delete Marketplace
  route.delete('/:id', authenticationMiddleware, marketPlaceController.deleteMarketPlace);

}
