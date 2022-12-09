import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import {Link} from "react-router-dom";
import authService from "../../services/auth.service";
import {useEffect} from "react";
import {useRef} from "react";


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
                    <img src="/images/real-logo-cropped.png" alt="Exitcirklen-image" height="50"/>
                    <img src="/images/text-logo.png" alt="Exitcirklen-text"/>
                </Navbar.Brand>
                <Container
                    fluid
                className="d-flex flex-column align-items-end">
                    <div className="d-flex justify-content-end gap-3 login-font conor-pos pt-1 pe-2">
                        <h6 className="text-black opacity-33">{employee.username}</h6>
                        <h6 className="login-hover"
                            onClick={handleLogout}>Log ud</h6>
                    </div>
                    <div
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
                    </div>
                </Container>
            </Navbar>
        </>
    );

}

export default NavBar;
