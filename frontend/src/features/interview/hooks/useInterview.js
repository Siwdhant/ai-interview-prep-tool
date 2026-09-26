import { useContext } from 'react';
import { InterviewContext } from '../interview.context.jsx';

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const {
        currentReport, setCurrentReport,
        reports, setReports,
        loading,
        fetchReportById,
        fetchAllReports,
        generateReport
    } = context

    return {
        currentReport,
        reports,
        loading,
        fetchReportById,
        fetchAllReports,
        generateReport
    }
}