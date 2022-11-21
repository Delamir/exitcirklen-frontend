import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

const Email = () => {
    const handleClick = (e) => {
        console.log("clicked!");
        axios.get("http://localhost:8081/applicants/send").then((response) => {
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
