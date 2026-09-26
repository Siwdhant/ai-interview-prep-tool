import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useInterview } from "../../interview/hooks/useInterview"
import "./home.scss"

const Home = () => {

    const navigate = useNavigate()
    const { generateReport, reports, fetchAllReports } = useInterview()

    const [formData, setFormData] = useState({
        jobRole: "",
        skills: "",
        experience: "",
        selfDescription: "",
        resume: null
    })

    useEffect(() => {
        fetchAllReports()
    }, [])

    return (
        <div className="home-page">
            <div className="home-card">
                <h1>Interview prep AI</h1>
                <p className="subtitle">Fill in the details and generate a tailored interview report.</p>

                <div className="form-group">
                    <label htmlFor="jobRole">Job role</label>
                    <input
                        type="text"
                        id="jobRole"
                        value={formData.jobRole}
                        onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                        placeholder="Enter the job role you are applying for"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skills">Skills</label>
                    <input
                        id="skills"
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. React, Node.js, MongoDB"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="experience">Experience (years)</label>
                        <input
                            id="experience"
                            type="number"
                            min="0"
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="e.g. 2"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="resume">Resume</label>
                        <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="selfDescription">Self description</label>
                    <textarea
                        id="selfDescription"
                        value={formData.selfDescription}
                        onChange={(e) => setFormData({ ...formData, selfDescription: e.target.value })}
                        placeholder="Describe yourself in a few sentences..."
                    ></textarea>
                </div>

                <button
                    className="generate-btn"
                    onClick={async () => {
                        console.log("BUTTON CLICKED")

                        const data = new FormData()

                        data.append("jobRole", formData.jobRole)
                        data.append("skills", formData.skills)
                        data.append("experience", formData.experience)
                        data.append("selfDescription", formData.selfDescription)

                        if (formData.resume) {
                            data.append("resume", formData.resume)
                        }

                        console.log("FORM DATA CREATED")

                        const response = await generateReport(data)

                        console.log("API RESPONSE:", response)

                        if (response?.report?._id) {
                            navigate(`/interview/${response.report._id}`)
                        }
                    }}
                >
                    Generate interview questions
                </button>
            </div>

            {reports.length > 0 && (
                <div className="recent-reports">
                    <h2>Recent reports</h2>
                    {reports.map((r) => (
                        <div
                            key={r._id}
                            className="recent-report-item"
                            onClick={() => navigate(`/interview/${r._id}`)}
                        >
                            <p className="recent-report-title">{r.jobRole}</p>
                            <span className="recent-report-score">{r.matchScore}% match</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home