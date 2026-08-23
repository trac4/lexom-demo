import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    
        prompt: {
            type: String,
            required: true,
        },
        minLength: Number, 
        maxLength: Number, 
        minSyllables: Number, 
        
        beginningWith: [String],
        endingWith: [String],
        requiredPartOfSpeech: [String],
        acceptedWords: [String],
})

const Prompt = mongoose.models.prompt || mongoose.model('prompt', promptSchema);
export default Prompt;