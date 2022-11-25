import axios from "axios";
import React, { useEffect } from "react";
import { Container, Form, FormGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Applicant = () => {
    const [groupApplicant, setGroupApplicant] = useState(false);
    const [wantsNewsletter, setWantsNewsletter] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [contactChoice, setContactChoice] = useState(1);
    const [willSubscribe, setWillSubscripe] = useState(false);
    const [city, setCity] = useState("");
    const [priority, setPriority] = useState("");
    const [priorityList, setPriorityList] = useState([
        { id: 1, name: "lyngby" },
        { id: 2, name: "amager" },
    ]);

    const { id } = useParams();

    useEffect(() => {});

    const fetchApplicant = () => {
        axios.get(`localhost:8081/applicants/${id}`);
    };

    return (
        <Container>
            <Form>
                <div className="d-flex gap-3">
                    <FormGroup>
                        <Form.Label>Navn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Indtast navn"
                            required
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <Form.Group className="mb-3">
                        <Form.Label>Alder:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Indtast alder"
                            value={age}
                            required={groupApplicant}
                            onChange={(e) => setAge(e.currentTarget.value)}
                        />
                    </Form.Group>
                </div>
                <div className="d-flex gap-3">
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail adresse:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Indtast e-mail"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefonnummer:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Indtast telefonnummer"
                            required
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(e.currentTarget.value)
                            }
                        />
                    </Form.Group>
                </div>
            </Form>
        </Container>
    );
};

export default Applicant;
