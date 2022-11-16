import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

const ApplicantForm = () => {
    const [groupUser, setGroupUser] = useState(false);

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Medlemstype:</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Jeg melde mig som støttemedlem"
                        name="user-type"
                        onChange={(e) => setGroupUser(!e.currentTarget.value)}
                    />
                    <Form.Check
                        type="radio"
                        label="Jeg vil gerne komme ind i et gruppeforløb"
                        name="user-type"
                        onChange={(e) => setGroupUser(e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>E-mail adresse:</Form.Label>
                    <Form.Control type="email" placeholder="Indtast e-mail" />
                    <Form.Text className="text-muted">
                        Vi deler aldrig din e-mail med andre
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefonnummer:</Form.Label>
                    <Form.Control type="number" placeholder="Telefonnummer" />
                </Form.Group>
                <div hidden={!groupUser}>
                    <Form.Group className="mb-3">
                        <Form.Label>Navn:</Form.Label>
                        <Form.Control type="text" placeholder="Telefonnummer" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Alder:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Telefonnummer"
                        />
                    </Form.Group>
                    <Form.Group className="">
                        <Form.Check
                            type="checkbox"
                            label="Tilmeld Kontingent på 300 kr årligt"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Jeg accepterer Exitcirklens vedtægter"
                        />
                    </Form.Group>
                    <Form.Group className="">
                        <Form.Check
                            type="radio"
                            label="Jeg vil gerne kontaktes via e-mail"
                            name="contact-choice"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="radio"
                            label="Jeg vil gerne kontaktes via SMS"
                            name="contact-choice"
                        />
                    </Form.Group>
                </div>
                <Button variant="primary" type="submit">
                    Tilmeld
                </Button>
            </Form>
        </Container>
    );
};

export default ApplicantForm;
