import axios from "axios";
import authHeader from "../../services/auth-header";

export async function FetchApplicants() {
    return await axios.get("http://localhost:8081/applicants", {
        headers: authHeader(),
    });
}
