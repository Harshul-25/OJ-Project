import mongoose from "mongoose";

const ProbSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
},{collection:'Problems'})

const Prob = mongoose.model('Problems', ProbSchema);

export default Prob;