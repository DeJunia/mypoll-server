// BallotPaper.jsx
import React, { useEffect, useState } from "react";
import useVote from "../myHooks/useVote";
import { IoFingerPrintSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const Ballot = () => {
  const { parties, selectedParty, loading, partyLoad, error, handleVote, setSelectedParty } = useVote();

  return (
    <div className="Ballot">
      <div className="BallotPaper">
        <h4 className="blue">MyP<IoFingerPrintSharp className="Icon xs blue" />ll</h4>
        <h6>This is a test ballot(A survey). Please vote responsibly.</h6>
        {partyLoad ? (
        <div className="allCont">
          <div className="loaderU"></div>
          <p>Loading parties...</p>
        </div>
        ) : (
          <>
        <h3>Cast Your Vote</h3>
        <div className="theBallot">
          {parties.map((party) => (
            <div key={party._id} className="ballotOption">
              <div className="ballotTab">
                <p className="ballotNo">{party.no}</p>
              </div>
              <div className="ballotTab wPic">
                <figure>
                  <img src={party.flagBearer} alt="" />
                </figure>
                <p>{party.flagName}</p>
              </div>
              <div className="ballotTab wPic">
                <figure>
                  <img src={party.flag} alt="" />
                </figure>
                <p>{party.name}</p>
              </div>
              <button onClick={() => setSelectedParty(party._id)} className={`fingBtn ${selectedParty === party._id ? "on" : ""}`}>
                <motion.div
                    className="fingerPrintBtn"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
                >
                  <IoFingerPrintSharp className={`fingerPrint ${selectedParty === party._id ? "on" : ""}`} />
                </motion.div>
              </button>
            </div>
          ))}
        </div>
        { error ? (<p className="error">{error}</p>) : (
          <button className="submitBtn" onClick={handleVote} disabled={!selectedParty || loading}>
           <motion.div
              className="submitAnim"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {loading ? (<><p className="loader"></p> Submitting...</>) : ('Submit vote')}
          </motion.div>
        </button>
        ) }
          </>
        )}  
      </div>     
    </div>
  );
};

export default Ballot;
