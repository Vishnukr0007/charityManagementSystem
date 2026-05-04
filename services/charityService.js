import { Charity, Donation } from '../models/index.js';

// Retrieves all charities from the database, including their donations
const getAllCharities = async () => {
  return await Charity.findAll({ include: Donation });
};

// Retrieves a specific charity by ID from the database
const getCharityById = async (id) => {
  return await Charity.findByPk(id, { include: Donation });
};

// Inserts a new charity record into the database
const createCharity = async (data) => {
  return await Charity.create(data);
};

export {
  getAllCharities,
  getCharityById,
  createCharity,
};
