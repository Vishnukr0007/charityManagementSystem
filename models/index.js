import sequelize from '../config/db.js';
import Admin from './Admin.js';
import SubAdmin from './SubAdmin.js';
import Donor from './Donor.js';
import Charity from './Charity.js';
import Donation from './Donation.js';
import AuthAccount from './AuthAccount.js';
import LoginAttempt from './LoginAttempt.js';

// Setup Associations
Donor.hasMany(Donation, { foreignKey: 'donorId' });
Donation.belongsTo(Donor, { foreignKey: 'donorId' });

Charity.hasMany(Donation, { foreignKey: 'charityId' });
Donation.belongsTo(Charity, { foreignKey: 'charityId' });

AuthAccount.hasMany(LoginAttempt, { foreignKey: 'authAccountId' });
LoginAttempt.belongsTo(AuthAccount, { foreignKey: 'authAccountId' });

export {
  sequelize,
  Admin,
  SubAdmin,
  Donor,
  Charity,
  Donation,
  AuthAccount,
  LoginAttempt,
};
