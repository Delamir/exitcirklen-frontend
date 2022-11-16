import axios from "axios"

export async function FetchApplicants() {

    return await axios.get("http://localhost:8081/applicants")
}