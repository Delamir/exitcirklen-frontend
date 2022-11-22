import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Col, Form, ListGroup, Row } from "react-bootstrap";

const Group = () => {
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [applicants, setApplicants] = useState([]);
    const [inviteList, setInviteList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        axios
            .get(`http://localhost:8081/groups/${id}`)
            .then((response) => setGroup(response.data));
        axios
            .get("http://localhost:8081/applicants/waiting-list")
            .then((response) => setApplicants(response.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            `http://localhost:8081/groups/${id}/send-invites`,
            inviteList
        );

        fetchData();
    };

    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setInviteList((prev) => [...prev, Number(value)]);
        } else {
            setInviteList((prev) => prev.filter((x) => x !== Number(value)));
        }
        console.log(group);
    };

    return (
        <Container>
            <h1 className="mb-4">{group?.name}</h1>
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
                        <Button
                            className="mt-3"
                            variant="warning"
                            type="submit"
                        >
                            Inviter
                        </Button>
                    </Form>
                </Col>
                <Col md={{ span: 4, offset: 3 }}>
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
    );
};

export default Group;
