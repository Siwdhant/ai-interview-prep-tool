const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true }
},{_id: false})

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true }
},{_id: false})

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    }
},{_id: false})

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    focus: { type: String, required: true },
    tasks: [String]
},{_id: false})

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobRole: { type: String, required: true },
    resumeText: { type: String },
    selfDescription: { type: String },
    matchScore: { type: Number },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]
}, {
    timestamps: true
})

const reportModel = mongoose.model('Report', reportSchema)

module.exports = reportModel