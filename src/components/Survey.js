import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Survey = () => {
    const { id } = useParams();

    const [answers, setAnswers] = useState({ first: true, second: false });


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`localhost:8180/applicants/${id}/survey`, answers);
    };

    return (
        <form onSubmit={handleSubmit}>
            Spørgeskema
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <button type="submit">svar</button>
        </form>
    );
};

export default Survey;
