import axios from "axios";
import React, { useEffect } from "react";
import authHeader from "../services/auth-header";

const Test = () => {
    useEffect(() => {
        axios
            .get("http://localhost:8081/test/admin", { headers: authHeader() })
            .then((response) => {});
    }, []);

    return <div>Test</div>;
};

export default Test;
