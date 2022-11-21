import axios from "axios";

export async function FetchApplicantStatus() {
    return await axios.get("http://localhost:8081/applicants/status");
}