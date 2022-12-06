import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import AuthService from "../../services/auth.service";
import Login from "../auth/Login";


function NavBar() {

    useEffect(() => {
        const employee = AuthService.getCurrentUser();

        if (employee) {
            console.log(employee, "Logged in");
        } else {
            console.log("no emp");
        }
    }, []);

    if (AuthService.getCurrentUser()) {
        return (
            <>
                <Navbar className="bg-primary" variant="dark">
                    <Navbar.Brand className="ms-3">
                        <img src="/images/logo.png" alt="Exitcirklen" height="80"/>
                    </Navbar.Brand>
                    <Container
                        fluid
                        className="d-flex justify-content-end gap-5 me-5"
                    >
                        <Nav>
                            <Nav.Link as={Link} to={"/klientoversigt"}>
                                <h4>Klientoversigt</h4>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to={"/gruppeoversigt"}>
                                <h4>Gruppeoversigt</h4>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to={"/medarbejderoversigt"}>
                                <h4>Medarbejderoversigt</h4>
                            </Nav.Link>
                        </Nav>


                    </Container>
                </Navbar>
            </>
        );
    } else {
        return (
            <>
                <Login />
            </>
        );
    }
}

export default NavBar;
