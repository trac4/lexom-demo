import mongoose from "mongoose";
import { Schema } from "zod";

const leaderboardSchema = new mongoose.Schema({
    
    score: {
        type: Number,
        required: true,
    },

    submitted_userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    submitted_Date: {
        type: Date,
        default: new Date() 
    }

})

const Leaderboard = mongoose.models.leaderboard || mongoose.model('leaderboard', leaderboardSchema)
export default Leaderboard