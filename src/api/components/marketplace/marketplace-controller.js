const marketPlaceService = require('./marketplace-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

//Create
async function createMarketPlace(request, response, next) {
  try {
    const name = request.body.name;
    const category = request.body.category;
    const description = request.body.description;
    const price = request.body.price;
    const quantity = request.body.quantity;


    const success = await marketPlaceService.createMarketPlace(name, category, description, price, quantity);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create MarketPlace'
      );
    }
    return response.status(200).json({ name, category, description, price, quantity });

  } catch (error) {
    return next(error);
  }
}

//Read
async function getMarketPlaces(request, response, next) {
  try {
    const marketplaces = await marketPlaceService.getMarketPlaces();
    return response.status(200).json(marketplaces);
  } catch (error) {
    return next(error);
  }
}

//Update
async function updateMarketPlace(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const category = request.body.category;
    const description = request.body.description;
    const price = request.body.price;
    const quantity = request.body.quantity;

    const success = await marketPlaceService.updateMarketPlace(id, name, category, description, price, quantity);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

//Delete
async function deleteMarketPlace(request, response, next) {
  try {
    const id = request.params.id;

    const success = await marketPlaceService.deleteMarketPlace(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createMarketPlace,
  getMarketPlaces,
  updateMarketPlace,
  deleteMarketPlace
};