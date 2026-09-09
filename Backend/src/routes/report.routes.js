const express = require('express')
const reportRouter = express.Router()
const reportController = require('../controllers/report.controller')
const { authUser } = require('../middlewares/auth.middleware')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

reportRouter.post('/generate', authUser, upload.single('resume'), reportController.generateReport)

module.exports = reportRouter