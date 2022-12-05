import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FetchService from "../services/FetchService";

const Survey = () => {
    const { id } = useParams();

    const [answers, setAnswers] = useState({ first: true, second: false });

    const fetchService = new FetchService();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetchService.fetchSurvey(id, answers);
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
