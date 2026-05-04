import { Donation, Donor, Charity } from '../models/index.js';

// Retrieves all donations from the database, including donor and charity info
const getAllDonations = async () => {
  return await Donation.findAll({ include: [Donor, Charity] });
};

// Retrieves a specific donation by ID from the database
const getDonationById = async (id) => {
  return await Donation.findByPk(id, { include: [Donor, Charity] });
};

// Retrieves all donations made by a specific donor
const getDonationsByDonor = async (donorId) => {
  return await Donation.findAll({ where: { donorId }, include: [Donor, Charity] });
};

// Validates existence of donor and charity, then inserts a new donation record
const createDonation = async (data) => {
  const donor = await Donor.findByPk(data.donorId);
  const charity = await Charity.findByPk(data.charityId);
  
  if (!donor) throw new Error('Donor not found');
  if (!charity) throw new Error('Charity not found');

  return await Donation.create(data);
};

export {
  getAllDonations,
  getDonationById,
  getDonationsByDonor,
  createDonation,
};
