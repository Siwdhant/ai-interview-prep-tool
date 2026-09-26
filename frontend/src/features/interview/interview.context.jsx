import { createContext, useState } from 'react';
import { getReportById, getAllReports,generateInterviewReport } from './services/interview.api.js';

export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [currentReport, setCurrentReport] = useState(null)
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchReportById(id) {
        setLoading(true)
        try {
            const data = await getReportById(id)
            if (data?.report) {
                setCurrentReport(data.report)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    async function fetchAllReports() {
        setLoading(true)
        try {
            const data = await getAllReports()
            if (data?.reports) {
                setReports(data.reports)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

      async function generateReport(formData) {
        setLoading(true)
        try {
            const data = await generateInterviewReport(formData)
            if (data?.report) {
                setCurrentReport(data.report)
            }
            return data
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <InterviewContext.Provider value={{
            currentReport, setCurrentReport,
            reports, setReports,
            loading,
            fetchReportById,
            fetchAllReports,
            generateReport
        }}>
            {children}
        </InterviewContext.Provider>
    )
}