import axios from "axios";
import React, { useEffect } from "react";

const Test = () => {
    useEffect(() => {
        axios.get("http://localhost:8081/test/admin").then((response) => {});
    }, []);

    return <div>Test</div>;
};

export default Test;
