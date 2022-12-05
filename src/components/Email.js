import React from "react";
import { Button } from "react-bootstrap";
import FetchService from "../services/FetchService";

const Email = () => {

    const fetchService = new FetchService();

    const handleClick = (e) => {
        console.log("clicked!");
        fetchService.fetchSendEmail()
            .then((response) => {
            console.log(response);
        });
    };

    return (
        <div>
            <Button onClick={handleClick}>click me</Button>
        </div>
    );
};

export default Email;
