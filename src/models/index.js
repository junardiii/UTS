const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const marketplaceSchema = require('./marketPlace-schema');
const digitalBankingSchema = require('./digitalBanking-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const MarketPlace = mongoose.model('marketplace', mongoose.Schema(marketplaceSchema))
const DigitalBanking = mongoose.model('digitalbanking', mongoose.Schema(digitalBankingSchema))



module.exports = {
  mongoose,
  User,
  MarketPlace,
  DigitalBanking
};
