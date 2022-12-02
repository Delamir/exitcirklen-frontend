import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(email, password)
            .then((response) => {
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error, "error");
            });
    };

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group>
                <Form.Label>email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Indtast e-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>password</Form.Label>
                <Form.Control
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default Login;
