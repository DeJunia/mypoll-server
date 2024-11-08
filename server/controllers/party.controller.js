import Party from '../models/party.model.js';

export const createParty = async (req, res, next) => {
  try {
    const { no, name, flagBearer, flag, flagName } = req.body;
    const newParty = new Party({
      no,
      name,
      flagBearer,
      flag,
      flagName
    });
    await newParty.save();
    res.status(201).json(newParty);
  } catch (error) {
    next(error);
  }
};

export const getAllParties = async (req, res, next) => {
  try {
    const parties = await Party.find().sort('no');
    res.status(200).json(parties);
  } catch (error) {
    next(error);
  }
}; 