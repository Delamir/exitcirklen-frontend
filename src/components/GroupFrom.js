import React from "react";
import { Container, Form } from "react-bootstrap";

const GroupFrom = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group>
                    <Form.Label>Gruppe Navn</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Indtast gruppe navn"
                        required
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Indtast adresse"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Indtast adresse"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.currentTarget.value)}
                    />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default GroupFrom;
