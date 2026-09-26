import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function generateInterviewReport(formData) {
    try {
        const response = await api.post(
            '/api/report/generate',
            formData
        )
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function getReportById(id) {
    try {
        const response = await api.get(`/api/report/${id}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function getAllReports() {
    try {
        const response = await api.get('/api/report/')
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function downloadReportPdf(id) {
    try {
        const response = await api.get(`/api/report/${id}/pdf`, {
            responseType: 'blob'
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}