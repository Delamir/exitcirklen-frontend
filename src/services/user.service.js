import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/";

class UserService {
    getPublicContent() {
        return axios.get("/all");
    }

    getUserBoard() {
        return axios.get("/user", { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get("/mod", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get("/test/admin", { headers: authHeader() }).catch((error) => {
            if(error.code === "ERR_BAD_REQUEST"){

            } 
            return;
        });
    }
}
