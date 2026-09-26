import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useInterview } from "../hooks/useInterview"
import { downloadReportPdf } from "../services/interview.api"
import "./interview.scss"

const Interview = () => {
    const { id } = useParams()
    const { currentReport, loading, fetchReportById } = useInterview()

    useEffect(() => {
        if (currentReport?._id === id) {
            return
        }
        fetchReportById(id)
    }, [id])

    async function handleDownloadPdf() {
        const blob = await downloadReportPdf(id)
        if (!blob) return

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${currentReport.jobRole}-report.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
    }

    if (loading) {
        return (
            <div className="interview-page">
                <div className="interview-card">
                    <p className="placeholder-text">Loading your report...</p>
                </div>
            </div>
        )
    }

    if (!currentReport) {
        return (
            <div className="interview-page">
                <div className="interview-card">
                    <p className="placeholder-text">No report found.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="interview-page">
            <div className="interview-card">
                <div className="interview-header">
                    <h1>{currentReport.jobRole}</h1>
                    <span className="match-badge">{currentReport.matchScore}% match</span>
                </div>

                <button className="download-btn" onClick={handleDownloadPdf}>
                    Download as PDF
                </button>

                <h2>Technical Questions</h2>
                {currentReport.technicalQuestions.map((q, i) => (
                    <div key={i} className="question-block">
                        <p className="question-text">{q.question}</p>
                        <p className="question-meta">{q.intention}</p>
                    </div>
                ))}

                <h2>Behavioral Questions</h2>
                {currentReport.behavioralQuestions.map((q, i) => (
                    <div key={i} className="question-block">
                        <p className="question-text">{q.question}</p>
                        <p className="question-meta">{q.intention}</p>
                    </div>
                ))}

                <h2>Skill Gaps</h2>
                {currentReport.skillGaps.map((s, i) => (
                    <div key={i} className={`skill-gap severity-${s.severity}`}>
                        {s.skill} — {s.severity}
                    </div>
                ))}

                <h2>Preparation Plan</h2>
                {currentReport.preparationPlan.map((p, i) => (
                    <div key={i} className="plan-day">
                        <p className="plan-day-title">Day {p.day}: {p.focus}</p>
                        <ul>
                            {p.tasks.map((task, j) => (
                                <li key={j}>{task}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Interview