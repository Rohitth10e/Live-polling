import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    option: {type: String, required: true},
    submittedAt: { type: Date, default: Date.now }
});

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answers: { type: [answerSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date }
});

module.exports = mongoose.model("Poll", pollSchema);