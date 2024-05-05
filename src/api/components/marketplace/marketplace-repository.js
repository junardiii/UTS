const { MarketPlace } = require('../../../models')

//Create Marketplace
async function createMarketPlace(name, category, description, price, quantity) {
  return MarketPlace.create({
    name,
    category,
    description,
    price,
    quantity
  });
}

//Read Marketplace
async function getMarketplace() {
  return MarketPlace.find({});
}

//Update Marketplace
async function updateMarketPlace(id, name, category, description, price, quantity) {
  return MarketPlace.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        category,
        description,
        price,
        quantity
      },
    }
  );
}

//Delete Marketplace
async function deleteMarketPlace(id) {
  return MarketPlace.deleteOne({ _id: id });
}

module.exports = {
  createMarketPlace,
  getMarketplace,
  updateMarketPlace,
  deleteMarketPlace
};
