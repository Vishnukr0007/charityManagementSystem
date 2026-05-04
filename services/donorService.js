import { Donor, Donation } from '../models/index.js';

// Retrieves all donors from the database, including their donations
const getAllDonors = async () => {
  return await Donor.findAll({ include: Donation });
};

// Retrieves a specific donor by ID from the database
const getDonorById = async (id) => {
  return await Donor.findByPk(id, { include: Donation });
};

// Inserts a new donor record into the database
const createDonor = async (data) => {
  return await Donor.create(data);
};

export {
  getAllDonors,
  getDonorById,
  createDonor,
};
