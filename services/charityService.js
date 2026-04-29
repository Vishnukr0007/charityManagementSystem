const { Charity, Donation } = require('../models');

const getAllCharities = async () => {
  return await Charity.findAll({ include: Donation });
};

const getCharityById = async (id) => {
  return await Charity.findByPk(id, { include: Donation });
};

const createCharity = async (data) => {
  return await Charity.create(data);
};

module.exports = {
  getAllCharities,
  getCharityById,
  createCharity,
};
