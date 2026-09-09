const {z} = require('zod')

const reportValidator = z.object({
    jobRole: z.string().min(1, "Job role is required"),
    skills: z.string().min(1, "Skills are required"),
    experience: z.number().min(0, "Experience must be a positive number"),
})

module.exports = reportValidator