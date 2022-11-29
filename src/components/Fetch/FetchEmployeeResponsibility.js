import axios from "axios";

export async function FetchEmployeeResponsibility() {
    return await axios.get("http://localhost:8081/employee/responsibility");
}