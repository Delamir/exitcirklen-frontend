import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import { useEffect } from "react";
import { useRef } from "react";


function NavBar() {
    const clientRef = useRef();
    const groupRef = useRef();
    const employeeRef = useRef();

    const handleLogout = () => {
        authService.logout();
        window.location.reload();
    };

    useEffect(() => {
        console.log(employee, "employee");
        if (employee.roles[0] === "VISITATOR") {
            console.log("ugga");
            groupRef.current.style.display = "none";
            employeeRef.current.style.display = "none";
        }
        if (employee.roles[0] === "GRUPPEANSVARLIG") {
            employeeRef.current.style.display = "none";
        }
    }, []);
    const employee = authService.getCurrentUser();

    return (
        <>
            <Navbar className="bg-primary" variant="dark">
                <Navbar.Brand className="ms-3">
                    <img src="/images/real-logo.png" alt="Exitcirklen" height="80" />
                </Navbar.Brand>
                <Container
                    fluid
                    className="d-flex justify-content-end gap-5 me-5"
                >
                    <Nav ref={clientRef}>
                        <Nav.Link as={Link} to={"/klientoversigt"}>
                            <h4>Klientoversigt</h4>
                        </Nav.Link>
                    </Nav>

                    <Nav ref={groupRef}>
                        <Nav.Link as={Link} to={"/gruppeoversigt"}>
                            <h4>Gruppeoversigt</h4>
                        </Nav.Link>
                    </Nav>
                    <Nav ref={employeeRef}>
                        <Nav.Link as={Link} to={"/medarbejderoversigt"}>
                            <h4>Medarbejderoversigt</h4>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <h5 onClick={handleLogout}>Log ud</h5>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );

}

export default NavBar;
