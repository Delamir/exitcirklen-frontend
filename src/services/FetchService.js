import axios from "axios";

class FetchService {

    /////////////Applicant/////////////
    async fetchApplicants() {
        return await axios.get("/applicants");
    }

    async fetchApplicant(id) {
        return await axios.get("/applicants/" + id)
    }

    async fetchPatchApplicant(id, editedApplicant) {
        return await axios.patch("/applicants/" + id, editedApplicant)
    }

    async fetchCreateApplicant(applicant) {
        return await axios.post("/applicants", applicant)
    }

    async fetchDeleteApplicant(id) {
        return await axios.delete("/applicants/" + id)
    }

    async fetchApplicantStatus() {
        return await axios.get("/applicants/status");
    }

    async fetchWaitingList() {
        return await axios.get("/applicants/waiting-list");
    }

    async fetchVisitationRequest(applicant, date) {
        return await axios.post("/applicants/visitation-request", {
            applicant: applicant,
            time: date
        })
    }

    async fetchCancelVisitation(applicant, reason) {
        return await axios.post("/applicants/cancel-visitation", {
            applicant: applicant,
            reason: reason
        })
    }
    async fetchConfirmVisitation(applicant) {
        return await axios.post("/applicants/confirm-visitation", applicant)
    }

    async fetchSendEmail() {
        return await axios.get("/applicants/send")
    }

    async fetchSurvey(id, answers) {
        return await axios.post("/applicants/" + id + "/survey", answers)
    }

    async fetchTestAdmin() {
        return await axios.get("/test/admin");
    }

    ////////////Group////////////////
    async fetchApplicantGroup(id) {
        return await axios.get("/groups/" + id)
    }

    async fetchApplicantGroups() {
        return await axios.get("/groups");
    }

    async fetchGroupsSendInvites(id, inviteList) {
        return await axios.post("/groups/" + id + "/send-invites", inviteList)
    }

    async fetchPatchApplicantGroup(id, editedApplicantGroup) {
        return await axios.patch("/groups/" + id, editedApplicantGroup)
    }

    async fetchCreateApplicantGroup(applicantGroup) {
        return await axios.post("/groups", applicantGroup)
    }

    async fetchDeleteApplicantGroup(id) {
        return await axios.delete("/groups/" + id)
    }

    ///////////Employee//////////////
    async fetchEmployees() {
        return await axios.get("/employees");
    }

    async fetchEmployeeResponsibility() {
        return await axios.get("/employee/responsibility");
    }

    async fetchCreateEmployee(employee) {
        return await axios.post("/employees", employee)
    }

    async fetchPutEmployee(id, employee) {
        return await axios.put("/employees/" + id, employee)
    }

    async fetchDeleteEmployee(id) {
        return await axios.delete("/employees/" + id)
    }

    ///////////City//////////////
    async fetchCity(id) {
        return await axios.get("/cities/" + id)
    }

    async fetchCities() {
        return await axios.get("/cities");
    }

    async fetchCreateCity(city) {
        return await axios.post("/cities", city)
    }

    async fetchPutCity(id, city) {
        return await axios.put("/cities/" + id, city)
    }

    async fetchDeleteCity(id) {
        return await axios.get("/cities/" + id)
    }
}
export default FetchService;