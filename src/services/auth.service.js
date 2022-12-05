import axios from "axios";

class AuthService {
    login(email, password) {
        return axios
            .post( "/auth/signin", {
                email,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    console.log("ugg");
                    localStorage.setItem("user", JSON.stringify(response.data));
                    axios.interceptors.request.use(
                        (config) => {
                            config.headers["Authorization"] =
                                "Bearer " + response.data.token;
                            return config;
                        },
                        (error) => {
                            return Promise.reject(error);
                        }
                    );
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post("/signup", {
            username,
            email,
            password,
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    refreshToken() {
        return axios.post("/auth/refreshtoken", {
            refreshToken: this.getCurrentUser()["refreshToken"],
        });
    }
}

export default new AuthService();
