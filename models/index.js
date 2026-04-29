const sequelize = require('../config/db');
const Admin = require('./Admin');
const Donor = require('./Donor');
const Charity = require('./Charity');
const Donation = require('./Donation');

// Setup Associations
Donor.hasMany(Donation, { foreignKey: 'donorId' });
Donation.belongsTo(Donor, { foreignKey: 'donorId' });

Charity.hasMany(Donation, { foreignKey: 'charityId' });
Donation.belongsTo(Charity, { foreignKey: 'charityId' });

module.exports = {
  sequelize,
  Admin,
  Donor,
  Charity,
  Donation,
};
