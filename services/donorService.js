const { Donor, Donation } = require('../models');

const getAllDonors = async () => {
  return await Donor.findAll({ include: Donation });
};

const getDonorById = async (id) => {
  return await Donor.findByPk(id, { include: Donation });
};

const createDonor = async (data) => {
  return await Donor.create(data);
};

module.exports = {
  getAllDonors,
  getDonorById,
  createDonor,
};
