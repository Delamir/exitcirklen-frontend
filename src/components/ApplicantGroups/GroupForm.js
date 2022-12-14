import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import FetchService from "../../services/FetchService";
import {useEffect} from "react";

const GroupForm = () => {
    const [applicantGroup, setGroupApplicant] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [tags, setTags] = useState("");
    const [startDate, setStartDate] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState({});
    const [availableSpots, setAvailableSpots] = useState("");
    const [discount, setDiscount] = useState(false);

    const navigate = useNavigate();

    const copenhagenOptionRef = useRef(null);

    const fetchService = new FetchService();

    useEffect(() => {
        fetchService.fetchCities().then((response) => {
            setCityList(response.data)
            setCity(response.data[0])
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newApplicantGroup = {
            city: city,
            name: name,
            address: address,
            groupSize: groupSize,
            availableSpots: availableSpots,
            price: price,
            startDate: startDate,
            discount: discount,
            tags: tags,
            description: description,

        };

        if(applicantGroup) {
            newApplicantGroup.city = city;
            newApplicantGroup.name = name;
            newApplicantGroup.address = address;
            newApplicantGroup.groupSize = groupSize;
            newApplicantGroup.availableSpots = availableSpots;
            newApplicantGroup.price = price;
            newApplicantGroup.startDate = startDate;
            newApplicantGroup.discount = discount;
            newApplicantGroup.tags = tags;
            newApplicantGroup.description = description;
        } else {
            newApplicantGroup.applicantGroup = false;
        }

        fetchService.fetchCreateApplicantGroup(newApplicantGroup)
            .then((response) => {
                console.log(response)
            });

        console.log(newApplicantGroup);
        navigate("/gruppeoversigt");
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

    return (
        <Container className="mt-5">
            <Form onSubmit={(e) => handleSubmit(e)}>
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
                <Form.Group className="mb-3">
                    <Form.Label>By hvor du vil have dit forløb:</Form.Label>
                    <Form.Select
                        className="invalid-select"
                        onChange={(e) => handleCityChange(e)}
                    >
                        {cityList?.map((cityToChose, index) => (
                            <option value={index} key={cityToChose.id}>{cityToChose.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ledige pladser</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Indtast antal ledige pladser"
                        required
                        value={availableSpots}
                        onChange={(e) => setAvailableSpots(e.currentTarget.value)}
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
                    <Form.Label>Dato for gruppe start</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        placeholder="Indtast dato"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.currentTarget.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Hold Størrelse</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Indtast hold størrelse"
                        required
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.currentTarget.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Beskrivelse</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Indtast en beskrivelse"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pris</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Indtast en pris"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Køn:</Form.Label>
                    <Form.Select
                        className="invalid-select"
                        value={tags}
                        onChange={(e) => setTags(e.currentTarget.value)}
                    >
                        <option value="" disabled hidden>
                            Vælg tags
                        </option>
                        <option value="0">Kvinde</option>
                        <option value="1">Mand</option>
                        <option value="2">Non-binær</option>
                        <option value="3">Alle køn</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Rabat mulighed for gruppen"
                        checked={discount}
                        onChange={() => setDiscount(!discount)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Opret gruppeforløb
                </Button>
            </Form>
        </Container>
    );
};

export default GroupForm;
