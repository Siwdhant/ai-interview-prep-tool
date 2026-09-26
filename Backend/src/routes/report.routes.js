const express = require('express')
const reportRouter = express.Router()
const reportController = require('../controllers/report.controller')
const { authUser } = require('../middlewares/auth.middleware')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

reportRouter.post('/generate', authUser, upload.single('resume'), reportController.generateReport)

reportRouter.get(
    '/:id/pdf',
    authUser,
    reportController.downloadReportPdf
)


reportRouter.get(
    '/:id',
    authUser,
    reportController.getReportById
)



reportRouter.get(
    '/',
    authUser,
    reportController.getAllReports
)



module.exports = reportRouter