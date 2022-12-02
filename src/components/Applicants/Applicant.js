import axios from "axios";
import React, {useEffect, useState} from "react";
import {Container, Form, FormGroup} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {FetchApplicantStatus} from "../Fetch/FetchApplicantStatus";

const Applicant = () => {

    const [groupApplicant, setGroupApplicant] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [statusList, setStatusList] = useState([])
    const [group, setGroup] = useState();
    const [answeredSurvey, setAnsweredSurvey] = useState(false);
    // const [contactChoice, setContactChoice] = useState(1);
    const [contactCall, setContactCall] = useState(false);
    const [contactText, setContactText] = useState(false);
    const [description, setDescription] = useState("");
    const [paidStatus, setPaidStatus] = useState(false)
    const [city, setCity] = useState("");
    const [priority, setPriority] = useState("");
    const [priorityList, setPriorityList] = useState([
        {id: 1, name: "lyngby"},
        {id: 2, name: "amager"},
    ]);
    const [willSubscribe, setWillSubscripe] = useState(false);
    const [wantsNewsletter, setWantsNewsletter] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        fetchApplicant();
    }, []);

    useEffect(() => {
        FetchApplicantStatus().then((response) => {
            setStatusList(response.data)
        })
    })

    const fetchApplicant = () => {
        axios.get(`http://localhost:8081/applicant/${id}`).then((response) => {
            const applicant = response.data;
            setGroupApplicant(applicant.userType === 1);
            setName(applicant.name);
            setAge(applicant.age);
            setCity(applicant.city);
            setGender(applicant.gender);
            setEmail(applicant.email);
            setPhoneNumber(applicant.phoneNumber);
            setAnsweredSurvey(applicant.answeredSurvey);
            // setContactChoice(applicant.contactCall ? 1 : 0);
            setDescription(applicant.description);
            setStatus(applicant.status);
            setGroup(applicant.group)
            setPaidStatus(applicant.paidStatus)
            setContactCall(applicant.contactCall);
            setContactText(applicant.contactText);
            setPriority(applicant.priority)
        });
    };

    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate("/klientoversigt")
    }

    const handleEditSubmit = (event) => {

        event.preventDefault();
        const editedApplicant = {
            name: name,
            age: age,
            city: city,
            gender: gender,
            email: email,
            phoneNumber: phoneNumber,
            answeredSurvey: answeredSurvey,
            description: description,
            status: status,
            group: group,
            paidStatus: paidStatus,
            contactCall: contactCall,
            contactText: contactText,
            priority: priority
        }

        axios.patch("http://localhost:8081/applicants/" + id, editedApplicant)
            .then(handlePrevious)
            .catch((error) => console.log(error))

    }


    return (
        <Container className="mt-3">
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
                <div className="d-flex gap-3">
                    <Form.Group className="mb-3">
                        <Form.Label>By</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Indtast by"
                            required
                            value={city}
                            onChange={(e) =>
                                setPhoneNumber(e.currentTarget.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            className="invalid-select"
                            value={status}
                            onChange={(e) => setStatus(e.currentTarget.value)}
                        >
                            {statusList?.map((statuses, index) => (
                                <option value={statuses} key={index}>{statuses}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prioritet</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Indtast prioritet"
                            required
                            value={priority}
                            onChange={(e) => setPriority(e.currentTarget.value)}
                        />
                    </Form.Group>
                </div>
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label>Beskrivelse</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        />
                    </Form.Group>
                </div>
                <Form.Group>
                    <Form.Label>Besvaret Survey</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="survey"
                        checked={answeredSurvey}
                        onChange={(e) => setAnsweredSurvey(e.currentTarget.checked)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Kontakt oprining</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="contactCall"
                        checked={contactCall}
                        onChange={(e) => setContactCall(e.currentTarget.checked)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Kontakt SMS</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="contactText"
                        checked={contactText}
                        onChange={(e) => setContactText(e.currentTarget.checked)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Betalt</Form.Label>
                    <Form.Check
                        type="checkbox"
                        name="paidStatus"
                        checked={paidStatus}
                        onChange={(e) => setPaidStatus(e.currentTarget.checked)}
                    />
                </Form.Group>
                <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-success btn-floating"
                    onClick={(event) => handleEditSubmit(event)}
                    >
                        Gem Ændringer
                    </button>
                    <button type="button" className="btn btn-primary btn-floating"
                    onClick={handlePrevious}>Tilbage</button>
                </div>
            </Form>
        </Container>
    );
};

export default Applicant;
