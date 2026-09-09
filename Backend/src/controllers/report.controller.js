const reportModel = require('../models/report.model')
const { generateInterviewReport } = require('../services/gemini.service')
const reportValidator = require('../validators/report.validator')

async function generateReport(req, res) {
    try {
        const { jobRole, skills, experience, selfDescription } = req.body

                const validation = reportValidator.safeParse({
            jobRole,
            skills,
            experience: Number(experience)
        })

        if(!validation.success) {
            return res.status(400).json({ message: validation.error.errors[0].message })
        }

                const resumeText = req.file ? req.file.path : null

        const aiResponse = await generateInterviewReport({
            jobRole,
            skills,
            experience: Number(experience),
            resumeText,
            selfDescription
        })

                const report = await reportModel.create({
            user: req.user.id,
            jobRole,
            resumeText,
            selfDescription,
            matchScore: aiResponse.matchScore,
            technicalQuestions: aiResponse.technicalQuestions,
            behavioralQuestions: aiResponse.behavioralQuestions,
            skillGaps: aiResponse.skillGaps,
            preparationPlan: aiResponse.preparationPlan
        })

                res.status(201).json({
            message: "Report generated successfully",
            report
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { generateReport }