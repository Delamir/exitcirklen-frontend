import axios from "axios";
import authHeader from "./auth-header";

class FetchService {

    async fetchApplicants() {
        return await axios.get("http://localhost:8081/applicants");
    }

    async fetchApplicantGroups() {
        return await axios.get("http://localhost:8081/groups");
    }

    async fetchApplicantStatus() {
        return await axios.get("http://localhost:8081/applicants/status");
    }

    async fetchEmployees() {
        return await axios.get("http://localhost:8081/employees");
    }

    async fetchWaitingList() {
        return await axios.get("http://localhost:8081/applicants/waiting-list");
    }

    async fetchEmployeeResponsibility() {
        return await axios.get("http://localhost:8081/employee/responsibility");
    }

}
export default FetchService;