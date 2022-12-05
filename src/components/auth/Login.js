import axios from "axios";
import React from "react";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import {useState} from "react";
import {Button} from "react-bootstrap";

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


        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Indtast dine oplysninger for at logge ind</p>
                                    <Form onSubmit={handleLogin}>
                                        <div className="form-outline form-white mb-4">
                                            <input className="form-control form-control-lg"
                                                   type="email"
                                                   id="typeEmailX"
                                                   placeholder="E-mail"
                                                   required
                                                   value={email}
                                                   onChange={(e) => setEmail(e.currentTarget.value)}
                                            />

                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input className="form-control form-control-lg"
                                                   type="password"
                                                   id="typePasswordX"
                                                   placeholder="Password"
                                                   required
                                                   value={password}
                                                   onChange={(e) => setPassword(e.currentTarget.value)}
                                            />
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
