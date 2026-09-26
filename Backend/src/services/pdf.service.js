const puppeteer = require('puppeteer')

function buildReportHtml(report) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 40px;
                color: #1a1a1a;
            }
            h1 {
                font-size: 22px;
                margin-bottom: 4px;
            }
            .match-badge {
                display: inline-block;
                background: #e1f5ee;
                color: #0f6e56;
                font-size: 13px;
                padding: 4px 10px;
                border-radius: 12px;
                margin-bottom: 20px;
            }
            h2 {
                font-size: 16px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 4px;
                margin-top: 24px;
            }
            .question-block {
                margin-bottom: 12px;
            }
            .question-text {
                font-weight: bold;
                font-size: 13px;
                margin: 0 0 2px;
            }
            .question-meta {
                font-size: 12px;
                color: #666;
                margin: 0;
            }
            .skill-gap {
                display: inline-block;
                font-size: 12px;
                padding: 3px 8px;
                border-radius: 6px;
                margin: 0 6px 6px 0;
                background: #eee;
            }
            .plan-day {
                margin-bottom: 10px;
            }
            .plan-day-title {
                font-weight: bold;
                font-size: 13px;
                margin: 0 0 4px;
            }
            ul {
                margin: 0;
                padding-left: 18px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <h1>${report.jobRole}</h1>
        <span class="match-badge">${report.matchScore}% match</span>

        <h2>Technical Questions</h2>
        ${report.technicalQuestions.map(q => `
            <div class="question-block">
                <p class="question-text">${q.question}</p>
                <p class="question-meta">${q.intention}</p>
            </div>
        `).join('')}

        <h2>Behavioral Questions</h2>
        ${report.behavioralQuestions.map(q => `
            <div class="question-block">
                <p class="question-text">${q.question}</p>
                <p class="question-meta">${q.intention}</p>
            </div>
        `).join('')}

        <h2>Skill Gaps</h2>
        ${report.skillGaps.map(s => `
            <span class="skill-gap">${s.skill} — ${s.severity}</span>
        `).join('')}

        <h2>Preparation Plan</h2>
        ${report.preparationPlan.map(p => `
            <div class="plan-day">
                <p class="plan-day-title">Day ${p.day}: ${p.focus}</p>
                <ul>
                    ${p.tasks.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    </body>
    </html>
    `
}

async function generateReportPdf(report) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const html = buildReportHtml(report)
    await page.setContent(html, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    })

    await browser.close()

    return pdfBuffer
}

module.exports = { generateReportPdf }