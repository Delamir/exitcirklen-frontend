import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, Col, Form, ListGroup, Row} from "react-bootstrap";
import {useRef} from "react";
import FetchService from "../../services/FetchService";

const Group = () => {
    const {id} = useParams();
    const [group, setGroup] = useState();
    const [applicants, setApplicants] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    const [address, setAddress] = useState();
    const [tags, setTags] = useState();
    const [startDate, setStartDate] = useState();
    const [groupSize, setGroupSize] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [city, setCity] = useState();
    const [name, setName] = useState();
    const [availableSpots, setAvailableSpots] = useState();

    const navigate = useNavigate();

    const copenhagenOptionRef = useRef(null);

    const fetchService = new FetchService();


    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {

        fetchService.fetchApplicantGroup(id)
            .then((response) => {
                setName(response.data.name);
                setAddress(response.data.address);
                setTags(response.data.tags);
                setStartDate(response.data.startDate);
                setGroupSize(response.data.groupSize);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setCity(response.data.city);
                setAvailableSpots(response.data.availableSpots);
                setGroup(response.data);
            })

        fetchService.fetchWaitingList()
            .then((response) => setApplicants(response.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetchService.fetchGroupsSendInvites(id, inviteList)
            .then(fetchData);
    };

    const handleChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {
            setInviteList((prev) => [...prev, Number(value)]);
        } else {
            setInviteList((prev) => prev.filter((x) => x !== Number(value)));
        }
        console.log(group);
    };

    const handleAutoInvite = (e) => {
        e.preventDefault()

        fetchService.fetchGroupsSendInvites(id,
            applicants.slice(0, group.availableSpots).map(applicant => applicant.id))
            .then(fetchData)
    };


    const handleUpdatedGroup = (e) => {
        e.preventDefault()

        const editedApplicantGroup = {
            city: city,
            address: address,
            name: name,
            groupSize: groupSize,
            availableSpots: availableSpots,
            price: price,
            startDate: startDate,
            tags: tags,
            description: description,
        };

        fetchService.fetchPatchApplicantGroup(id, editedApplicantGroup)
            .then(fetchData)
            .catch((error) => console.log(error))

        navigate("/gruppeoversigt")
    }

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

    return (<>
        <Container>
            <h1 className="mb-4">{group?.name}</h1>
            <p>Ledige pladser: {groupSize - group?.inviteList.length} </p>
            <Row>
                <Col md="4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <h2>Inviter</h2>
                            <ListGroup>
                                {applicants?.map((applicant) => {
                                    return (
                                        <ListGroup.Item key={applicant.id}>
                                            <input
                                                type="checkbox"
                                                value={applicant.id}
                                                onChange={handleChange}
                                                className="form-check-input me-3"
                                                id={`checkbox-for-${applicant.id}`}
                                            />
                                            <label
                                                className="form-check-label"
                                                for={`checkbox-for-${applicant.id}`}
                                            >
                                                {applicant.name}
                                            </label>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </Form.Group>
                        <div className="d-flex gap-4">
                        <Button
                            className="mt-3"
                            variant="warning"
                            type="submit"
                        >
                            Inviter
                        </Button>
                        <Button
                            className="mt-3"
                            onClick={handleAutoInvite}
                            variant="warning"
                        >
                            Inviter alle
                        </Button>
                        </div>
                    </Form>
                </Col>
                <Col md={{span: 4, offset: 3}}>
                    <h2>Inviteret</h2>
                    <ListGroup>
                        {group?.inviteList.map((invitee) => {
                            return (
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <div>{invitee.name}</div>
                                    <div>Invitation sendt</div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>


    <Container>
        <hr className="my-5"/>
    <Form onSubmit={handleUpdatedGroup}>
        <Form.Group>
            <Form.Label>Gruppens navn</Form.Label>
            <Form.Control
                type="text"
                placeholder="Gruppens navn"
                name="Gruppens navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>By hvor du vil have dit forløb:</Form.Label>
            <Form.Select
                className="invalid-select"
                value={city}
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

        <Form.Group>
            <Form.Label>Adresse</Form.Label>
            <Form.Control
                type="text"
                placeholder="Adresse"
                name="adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Hold størrelse</Form.Label>
            <Form.Control
                type="number"
                placeholder="Hold størrelse"
                name="Hold størrelse"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Start dato</Form.Label>
            <Form.Control
                type="datetime-local"
                placeholder="start dato"
                name="start dato"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Beskrivelse</Form.Label>
            <Form.Control
                as="textarea"
                type="text"
                placeholder="Beskrivelse"
                name="beskrivelse"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Pris</Form.Label>
            <Form.Control
                type="number"
                placeholder="pris"
                name="pris"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Køn:</Form.Label>
            <Form.Select
                className="invalid-select"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
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

        <Button
            variant="primary"
            type="submit"
        >
            Gem
        </Button>
    </Form>
    </Container>
</>

)

};

export default Group;
