import {useState} from "react";
import {useNavigate} from "react-router-dom";
import FetchService from "../../services/FetchService";
import {Button, Container, Form} from "react-bootstrap";
import React from "react";


const CityForm = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const fetchService = new FetchService();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCity = {
            name: name,
            address: address,
        };
        newCity.name = name;
        newCity.address = address;

        fetchService.fetchCreateCity(newCity).then((response) =>  {
            console.log(response);
        });

        console.log(newCity);
        navigate("/byoversigt")
    };


    return (
        <Container className="mt-3">
            <form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Navn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Indtast byens navn"
                            required
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Indtast adresse"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                            Opret By
                    </Button>
            </form>
        </Container>
    );
};

export default CityForm;