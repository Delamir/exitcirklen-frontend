import axios from "axios";

export async function FetchEmployees() {
    return await axios.get("http://localhost:8081/employees");
}