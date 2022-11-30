import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";
import React, {useEffect} from "react";
import {FetchEmployeeResponsibility} from "../Fetch/FetchEmployeeResponsibility";


const EmployeeForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [responsibility, setResponsibility] = useState("");
    const [employee, setEmployee] = useState("");

    useEffect(() => {
        FetchEmployeeResponsibility().then((response) => {
            setResponsibility(response.data)
        })
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            age: age,
            responsibility: responsibility,
        };

        if (employee) {
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.phoneNumber = phoneNumber;
            newEmployee.age = age;
            newEmployee.responsibility = responsibility;
        } else {
            newEmployee.employee = false;
        }

        axios
            .post("http://localhost8081/employees", newEmployee)
            .then((response) => {
                console.log(response);
            });

        console.log(newEmployee);
        navigate("/medarbejderoversigt");

    };
    return (
        <Container className="mt-5">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Navn:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Indtast navn"
                        required
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
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
                <Form.Group className="mb-3">
                    <Form.Label>Alder:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Indtast Alder"
                        required
                        value={age}
                        onChange={(e) => setAge(e.currentTarget.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ansvarsområde:</Form.Label>
                    <Form.Select
                        className="invalid-select"
                        value={responsibility}
                        required
                        onChange={(e) => setResponsibility(e.currentTarget.value)}
                    >
                        {/*{responsibility?.map((responsibilities, index) => (
                            <option value={responsibilities} key={index}>{responsibilities}</option>
                        ))}*/}

                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Opret medarbejder
                </Button>

            </form>
        </Container>


    )
};

export default EmployeeForm;