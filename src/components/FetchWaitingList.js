import axios from "axios";

export async function FetchWaitingList() {
    return await axios.get("http://localhost:8081/applicants/waiting-list");
}