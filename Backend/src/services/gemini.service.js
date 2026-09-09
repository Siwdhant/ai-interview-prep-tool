const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const generateInterviewReport = async ({ jobRole, skills, experience, resumeText, selfDescription }) => {
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" })
    const prompt = `You are an expert technical interviewer. Generate a detailed interview preparation report for the following candidate in valid JSON format only. Do not include any markdown or extra text.

Candidate Details:
- Job Role: ${jobRole}
- Skills: ${skills}
- Experience: ${experience} years
- Resume: ${resumeText || "Not provided"}
- Self Description: ${selfDescription || "Not provided"}

Return a JSON object with this exact structure:
{
    "matchScore": <number 0-100>,
    "technicalQuestions": [{"question": "", "intention": "", "answer": ""}],
    "behavioralQuestions": [{"question": "", "intention": "", "answer": ""}],
    "skillGaps": [{"skill": "", "severity": "low|medium|high"}],
    "preparationPlan": [{"day": <number>, "focus": "", "tasks": [""]}]
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const parsed = JSON.parse(text)
    return parsed
}

module.exports = { generateInterviewReport }