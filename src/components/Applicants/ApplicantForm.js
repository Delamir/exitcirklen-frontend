import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplicantForm = () => {
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

    const navigate = useNavigate();

    const copenhagenOptionRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newApplicant = {
            email: email,
            phoneNumber: phoneNumber,
            willSubscribe: willSubscribe,
            wantsNewsletter: wantsNewsletter,
        };

        if (groupApplicant) {
            newApplicant.name = name;
            newApplicant.age = age;
            newApplicant.gender = gender;
            newApplicant.contactCall = Number(contactChoice) === 2;
            newApplicant.contactText = Number(contactChoice) === 1;
            console.log(contactChoice);
            newApplicant.city = city;
            newApplicant.priority = priority;
            newApplicant.userType = groupApplicant ? 1 : 0;
        } else {
            newApplicant.groupApplicant = false;
        }

        axios
            .post("http://localhost:8081/applicants", newApplicant)
            .then((response) => {
                console.log(response);
            });

        console.log(newApplicant);
        navigate("/");
    };

    const handleCityChange = (e) => {
        e.preventDefault();

        setCity(e.currentTarget.value);
        console.log("ugg", e.currentTarget.value);
        console.log("bugg", copenhagenOptionRef);
        if (city === "KØBENHAVN") {
            copenhagenOptionRef.current.style.display = "block";
        } else {
            copenhagenOptionRef.current.style.display = "none";
        }
    };

    const handleContactChoice = (value) => {
        setContactChoice(Number(value));
    };

    return (
        <Container className="mt-5">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Medlemstype:</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Jeg vil gerne melde mig som et støttemedlem"
                        name="applicant-type"
                        checked={!groupApplicant}
                        onChange={(e) =>
                            setGroupApplicant(!e.currentTarget.value)
                        }
                    />
                    <Form.Check
                        type="radio"
                        label="Jeg vil gerne komme ind i et gruppeforløb"
                        name="applicant-type"
                        checked={groupApplicant}
                        onChange={(e) =>
                            setGroupApplicant(e.currentTarget.value)
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>E-mail adresse:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Indtast e-mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <Form.Text className="text-muted">
                        Vi deler aldrig din e-mail med andre
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefonnummer:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Indtast telefonnummer"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                    />
                </Form.Group>
                <div hidden={!groupApplicant}>
                    <Form.Group className="mb-3">
                        <Form.Label>Navn:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Indtast navn"
                            value={name}
                            required={groupApplicant}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                    </Form.Group>
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
                    <Form.Group className="mb-3">
                        <Form.Label>Køn:</Form.Label>
                        <Form.Select
                            className="invalid-select"
                            value={gender}
                            required={groupApplicant}
                            onChange={(e) => setGender(e.currentTarget.value)}
                        >
                            <option value="" disabled hidden>
                                Vælg Køn
                            </option>
                            <option value="Female">Kvinde</option>
                            <option value="Male">Mand</option>
                            <option value="Non-binary">Non-binær</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>By hvor du vil have dit forløb:</Form.Label>
                        <Form.Select
                            className="invalid-select"
                            value={city}
                            required={groupApplicant}
                            onChange={(e) => handleCityChange(e)}
                        >
                            <option value="" disabled hidden>
                                Vælg By
                            </option>
                            <option value="KØBENHAVN">København</option>
                            <option value="HILLERØD">Hillerød</option>
                            <option value="KØGE">Køge</option>
                            <option value="ODENSE">Odense</option>
                            <option value="AARHUS">Aarhus</option>
                            <option value="ESBJERG">Esbjerg</option>
                            <option value="AALBORG">Aalborg</option>
                            <option value="NÆSTVED">Næstved</option>
                        </Form.Select>
                    </Form.Group>

                    <ReactSortable
                        list={priorityList}
                        setList={setPriorityList}
                        className="mb-3"
                        style={{ display: "none" }}
                        ref={copenhagenOptionRef}
                    >
                        {priorityList.map((item) => (
                            <div key={item.id}>{item.name}</div>
                        ))}
                    </ReactSortable>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="radio"
                            label="Jeg vil gerne kontaktes via en opringning"
                            name="contact-choice"
                            value="1"
                            checked={contactChoice === 1}
                            onChange={(e) =>
                                setContactChoice(Number(e.currentTarget.value))
                            }
                        />

                        <Form.Check
                            type="radio"
                            label="Jeg vil gerne kontaktes via SMS"
                            name="contact-choice"
                            value="2"
                            checked={contactChoice === 2}
                            onChange={(e) =>
                                setContactChoice(Number(e.currentTarget.value))
                            }
                        />
                    </Form.Group>
                </div>
                <Form.Group className="">
                    <Form.Check
                        type="checkbox"
                        label="Tilmeld Kontingent på 300 kr årligt"
                        checked={willSubscribe}
                        onChange={() => setWillSubscripe(!willSubscribe)}
                    />
                </Form.Group>
                <Form.Group className="">
                    <Form.Check
                        type="checkbox"
                        label="Tilmeld Nyhedsbrev"
                        checked={wantsNewsletter}
                        onChange={() => setWantsNewsletter(!wantsNewsletter)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        type="checkbox"
                        label="Jeg accepterer Exitcirklens vedtægter"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Tilmeld
                </Button>
            </Form>
        </Container>
    );
};

export default ApplicantForm;