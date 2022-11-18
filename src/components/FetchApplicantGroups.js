import axios from "axios";

export async function FetchApplicantGroups() {
    return await axios.get("http://localhost:8081/groups");
}
