import axios from "axios";
import authHeader from "./auth-header";

class FetchService {

    async fetchApplicants() {
        return await axios.get("http://localhost:8081/applicants", {
            headers: authHeader(),
        });
    }

    async fetchApplicantGroups() {
        return await axios.get("http://localhost:8081/groups", {
            headers: authHeader(),
        });
    }

    async fetchApplicantStatus() {
        return await axios.get("http://localhost:8081/applicants/status", {
          headers: authHeader(),
        });
    }

    async fetchEmployees() {
        return await axios.get("http://localhost:8081/employees", {
            headers: authHeader(),
        });
    }

    async fetchWaitingList() {
        return await axios.get("http://localhost:8081/applicants/waiting-list", {
            headers: authHeader(),
        });
    }

    async fetchEmployeeResponsibility() {
        return await axios.get("http://localhost:8081/employee/responsibility", {
            headers: authHeader(),
        });
    }

}
export default FetchService;