import axios from "axios";
import React, { useEffect, useState } from "react";
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
    const [status, setStatus] = useState();
    const [group, setGroup] = useState();
    const [answeredSurvey, setAnsweredSurvey] = useState(false);
    const [contactChoice, setContactChoice] = useState(1);
    const [description, setDescription] = useState("");
    const [willSubscribe, setWillSubscripe] = useState(false);
    const [city, setCity] = useState("");
    const [priority, setPriority] = useState("");
    const [priorityList, setPriorityList] = useState([
        { id: 1, name: "lyngby" },
        { id: 2, name: "amager" },
    ]);

    const { id } = useParams();

    useEffect(() => {
        fetchApplicant();
    });

    const fetchApplicant = () => {
        axios.get(`localhost:8081/applicants/${id}`).then((response) => {
            const applicant = response.data;
            setGroupApplicant(applicant.userType === 1);
            setName(applicant.name);
            setAge(applicant.age);
            setCity(applicant.city);
            setGender(applicant.gender);
            setEmail(applicant.email);
            setPhoneNumber(applicant.phoneNumber);
            setAnsweredSurvey(applicant.answeredSurvey);
            setContactChoice(applicant.contactCall ? 1 : 0);
            setDescription(applicant.description);
            setStatus(applicant.status);
            console.log(applicant);
        });
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
                    <Form.Group className="mb-3">
                        <Form.Label>Køn:</Form.Label>
                        <Form.Select
                            className="invalid-select"
                            value={gender}
                            onChange={(e) => setGender(e.currentTarget.value)}
                        >
                            <option value="0">Kvinde</option>
                            <option value="1">Mand</option>
                            <option value="2">Non-binær</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            </Form>
        </Container>
    );
};

export default Applicant;
