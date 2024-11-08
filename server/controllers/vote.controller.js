import Vote from '../models/vote.model.js';
import Party from '../models/party.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../middleware/error.js';

export const castVote = async (req, res, next) => {
  try {
    const { partyId } = req.body;
    const userId = req.user.id;

    // Start session for transaction
    const session = await Vote.startSession();
    session.startTransaction();

    try {
      // Create vote
      const vote = new Vote({
        user: userId,
        party: partyId
      });
      await vote.save({ session });

      // Update party votes
      await Party.findByIdAndUpdate(
        partyId,
        { $inc: { totalVotes: 1 } },
        { session }
      );

      // Mark user as voted
      await User.findByIdAndUpdate(
        userId,
        { hasVoted: true },
        { session }
      );

      await session.commitTransaction();
      
      // Get updated party data for real-time update
      const updatedParty = await Party.findById(partyId);
      
      // Send response with data needed for real-time update
      res.status(201).json({
        message: "Vote cast successfully",
        partyId,
        totalVotes: updatedParty.totalVotes
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    next(error);
  }
};

export const getVoteResults = async (req, res, next) => {
  try {
    const results = await Party.find()
      .select('name totalVotes flag')
      .sort('-totalVotes');
    
    const totalVotes = results.reduce((sum, party) => sum + party.totalVotes, 0);
    
    const resultsWithPercentage = results.map(party => ({
      ...party._doc,
      percentage: totalVotes ? ((party.totalVotes / totalVotes) * 100).toFixed(2) : 0
    }));

    res.status(200).json(resultsWithPercentage);
  } catch (error) {
    next(error);
  }
}; 

export const getTotalVotes = async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      {
        $group: {
          _id: null,
          totalVotes: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ totalVotes: votes[0]?.totalVotes || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total votes', error });
  }
};