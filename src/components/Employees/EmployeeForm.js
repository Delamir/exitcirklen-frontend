import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";
import React, {useEffect} from "react";
import FetchService from "../../services/FetchService";


const EmployeeForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [responsibility, setResponsibility] = useState();
    const [responsibilityList, setResponsibilityList] = useState([]);
    const [employee, setEmployee] = useState("");

    const fetchService = new FetchService();

    useEffect(() => {
        fetchService.fetchEmployeeResponsibility().then((response) => {
            setResponsibilityList(response.data)
            if (!responsibility)
            setResponsibility(response.data[0])
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
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.phoneNumber = phoneNumber;
            newEmployee.age = age;
            newEmployee.responsibility = responsibility;


        axios
            .post("http://localhost:8081/employees", newEmployee)
            .then((response) => {
                console.log(response);
            });

        console.log(newEmployee);
        navigate("/medarbejderoversigt");

    };

    const handleSelectChange = (e) => {
        setResponsibility(e.currentTarget.value);
        console.log(e.currentTarget.value);
    }

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
                        onChange={handleSelectChange}
                    >
                        {responsibilityList?.map((responsibility, index) => (
                            <option value={responsibility} key={index}>{responsibility}</option>
                        ))}

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