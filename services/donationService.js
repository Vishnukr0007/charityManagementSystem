const { Donation, Donor, Charity } = require('../models');

const getAllDonations = async () => {
  return await Donation.findAll({ include: [Donor, Charity] });
};

const getDonationById = async (id) => {
  return await Donation.findByPk(id, { include: [Donor, Charity] });
};

const createDonation = async (data) => {
  const donor = await Donor.findByPk(data.donorId);
  const charity = await Charity.findByPk(data.charityId);
  
  if (!donor) throw new Error('Donor not found');
  if (!charity) throw new Error('Charity not found');

  return await Donation.create(data);
};

module.exports = {
  getAllDonations,
  getDonationById,
  createDonation,
};
