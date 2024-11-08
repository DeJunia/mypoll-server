import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  flagBearer: {
    type: String,
  },
  flagName: {
    type: String,
    required: true,
    unique: true
  },
  flag: {
    type: String,
    required: true
  },
  totalVotes: {
    type: Number,
    default: 0
  }
});

const Party = mongoose.model('Party', partySchema);
export default Party; 