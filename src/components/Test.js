
import React, { useEffect } from "react";
import FetchService from "../services/FetchService";

const Test = () => {

    const fetchService = new FetchService();

    useEffect(() => {
        fetchService.fetchTestAdmin()
            .then((response) => {});
    }, []);

    return <div>Test</div>;
};

export default Test;
