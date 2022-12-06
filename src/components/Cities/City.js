import {useEffect, useState} from "react";
import FetchService from "../../services/FetchService";
import {useNavigate} from "react-router-dom";
import {Container, Form} from "react-bootstrap";
import React from "@types/react";


const City = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const fetchService = new FetchService();

    useEffect(() => {
        fetchCity();
    }, []);

    const fetchCity = () => {
        fetchService.fetchCities(id)
            .then((response) => {
                const city = response.data;
                setName(city.name);
                setAddress(city.address);
            });
    };

    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate("/byoversigt")
    }

    const handleEditSubmit = (event) => {

        event.preventDefault();
        const editedCity = {
            name: name,
            address: address,
        }

        fetchService.fetchPutCity(id, editedCity)
            .then(handlePrevious)
            .catch((error) => console.log(error))
    }

    return (
        <Container className="mt-3">
            <form>
                <div className="d-flex gap-3">
                    <FormGroup>
                        <Form.Label>Navn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Indtast byens navn"
                            required
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Indtast adresse"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                        />
                    </FormGroup>
                </div>
                <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-success btn-floating"
                            onClick={(event) => handleEditSubmit(event)}
                    >
                        Gem Ændringer
                    </button>
                    <button type="button" className="btn btn-primary btn-floating"
                            onClick={handlePrevious}>Tilbage
                    </button>
                </div>

            </form>
        </Container>
    );
};

export default City;