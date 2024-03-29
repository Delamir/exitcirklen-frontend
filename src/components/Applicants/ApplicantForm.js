import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Container} from "react-bootstrap";
import {ReactSortable} from "react-sortablejs";
import {useNavigate} from "react-router-dom";
import FetchService from "../../services/FetchService";
import SamtykkeerklringDELTAGER09012022 from "../../documentsPDF/SamtykkeerklringDELTAGER09012022.pdf";
import Vedtgter_Exitcirklen_NEW_nov_2018_1 from "../../documentsPDF/Vedtgter_Exitcirklen_NEW_nov_2018_1.pdf";

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
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState();
    const [priority, setPriority] = useState("");
    const [priorityList, setPriorityList] = useState([
        {id: 1, name: "lyngby"},
        {id: 2, name: "amager"},
    ]);

    const fetchService = new FetchService();

    useEffect(() => {
        fetchService.fetchCities().then((response) => {
            setCityList(response.data)
            setCity(response.data[0])
        })
    }, [])

    const navigate = useNavigate();

    const copenhagenOptionRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(city)
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
            newApplicant.contactEmail = Number(contactChoice) === 3
            newApplicant.contactCall = Number(contactChoice) === 2;
            newApplicant.contactText = Number(contactChoice) === 1;
            console.log(contactChoice);
            newApplicant.city = city;
            newApplicant.priority = priority;
            newApplicant.userType = groupApplicant ? 1 : 0;
        } else {
            newApplicant.groupApplicant = false;
        }

        fetchService.fetchCreateApplicant(newApplicant)
            .then((response) => {
                console.log(response);
            });

        console.log(newApplicant);
        navigate("/");
    };

    const handleCityChange = (e) => {
        e.preventDefault();


        setCity(cityList[e.currentTarget.value]);
        // console.log("ugg", e.currentTarget.value);
        // console.log("bugg", copenhagenOptionRef);
        // if (city === "KØBENHAVN") {
        //     copenhagenOptionRef.current.style.display = "block";
        // } else {
        //     copenhagenOptionRef.current.style.display = "none";
        // }
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
                        label="Jeg vil gerne oprettes som støttemedlem"
                        name="applicant-type"
                        checked={!groupApplicant}
                        onChange={(e) =>
                            setGroupApplicant(!e.currentTarget.value)
                        }
                    />
                    <Form.Check
                        type="radio"
                        label="Jeg vil gerne tilmeldes et gruppeforløb"
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
                        <Form.Label>By hvor jeg ønsker at deltage i et gruppeforløb</Form.Label>
                        <Form.Select
                            className="invalid-select"
                            required={groupApplicant}
                            onChange={(e) => handleCityChange(e)}
                        >
                            {cityList?.map((cityToChose, index) => (
                                <option value={index} key={index}>{cityToChose.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <ReactSortable
                        list={priorityList}
                        setList={setPriorityList}
                        className="mb-3"
                        style={{display: "none"}}
                        ref={copenhagenOptionRef}
                    >
                        {priorityList.map((item) => (
                            <div key={item.id}>{item.name}</div>
                        ))}
                    </ReactSortable>

                    <Form.Group className="mb-3">
                        <Form.Label> I må gerne kontakte mig vedrørende visitationssamtale og pladstilbud:</Form.Label>
                        <Form.Check
                            type="radio"
                            label="via opkald"
                            name="contact-choice"
                            value="1"
                            checked={contactChoice === 1}
                            onChange={(e) =>
                                setContactChoice(Number(e.currentTarget.value))
                            }
                        />

                        <Form.Check
                            type="radio"
                            label="via sms"
                            name="contact-choice"
                            value="2"
                            checked={contactChoice === 2}
                            onChange={(e) =>
                                setContactChoice(Number(e.currentTarget.value))
                            }
                        />

                        <Form.Check
                            type="radio"
                            label="via e-mail"
                            name="contact-choice"
                            value="3"
                            checked={contactChoice === 3}
                            onChange={(e) =>
                                setContactChoice(Number(e.currentTarget.value))
                            }
                        />
                    </Form.Group>
                </div>
                <Form.Group className="">
                    <Form.Check
                        type="checkbox"
                        label="Tilmeld Nyhedsbrev"
                        checked={wantsNewsletter}
                        onChange={() => setWantsNewsletter(!wantsNewsletter)}
                    />
                </Form.Group>
                <Form.Group className="d-flex justify-content gap-1">
                    <Form.Check
                        required
                        type="checkbox"
                        label="Jeg accepterer Exitcirklens"
                    />
                    <a href={SamtykkeerklringDELTAGER09012022}
                       target="_blank"
                       rel="noreferrer"
                    >
                        samtykkeerklæring
                    </a>
                </Form.Group>
                <Form.Group className="d-flex justify-content gap-1 mb-3">
                    <Form.Check
                        required
                        type="checkbox"
                        label="Jeg accepterer Exitcirklens"
                    />
                    <a href={Vedtgter_Exitcirklen_NEW_nov_2018_1}
                       target="_blank"
                       rel="noreferrer"
                    >
                        vedtægter
                    </a>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Tilmeld
                </Button>
            </Form>
        </Container>
    );
};

export default ApplicantForm;
