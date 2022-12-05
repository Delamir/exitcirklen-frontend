import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./App.scss";
import axios from "axios";
import authService from "./services/auth.service";

axios.defaults.baseURL = "http://localhost:8081";

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await authService.refreshToken();
                    const { accessToken } = rs.data;
                    let user = authService.getCurrentUser();
                    user["token"] = accessToken;
                    window.localStorage.setItem("user", JSON.stringify(user));
                    axios.defaults.headers.common["Authorization"] =
                        "Bearer " + accessToken;
                    return axios.request({
                        ...originalConfig,
                        headers: {
                            ...originalConfig.headers,
                            Authorization: `Bearer ${accessToken}`,
                        },
                        sent: true,
                    });
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
