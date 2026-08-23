import mongoose from "mongoose";
import { isEmail } from "validator";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Invalid Email']
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        default: new Date()
    },

    lastLogIn: {
        type: Date,
        default: new Date()
    },

    wins: {
        type: Number,
        default: 0
    },

    longestWord: {
        type:String,
        default:''
    },

    
})

/* * REFERNCING ALREADY MADE MODELS/COLLECTION IS A REQUIREMENT
   * spelling of x in mongoose.models.x ||  mongoose.model('x', xSchema) MUST BE EXACT OR ELSE THE APP BREAKS*/ 
const User = mongoose.models.user ||  mongoose.model('user', userSchema)

export default User