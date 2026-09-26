const mongoose = require('mongoose')
const reportModel = require('../models/report.model')
const { generateInterviewReport } = require('../services/gemini.service')
const reportValidator = require('../validators/report.validator')
const { generateReportPdf } = require('../services/pdf.service')

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

async function getReportById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid report ID"
            })
        }

        const report = await reportModel.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            })
        }

        res.status(200).json({
            report
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

async function getAllReports(req, res) {
    try {
        const reports = await reportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })

        res.status(200).json({
            reports
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

async function downloadReportPdf(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid report ID"
            })
        }

        const report = await reportModel.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            })
        }

        const pdfBuffer = await generateReportPdf(report)

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${report.jobRole}-report.pdf"`
        })

        res.send(pdfBuffer)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

module.exports = { generateReport, getReportById, getAllReports, downloadReportPdf }
