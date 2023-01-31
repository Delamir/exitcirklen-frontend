import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import { useEffect } from "react";
import { useRef } from "react";
import { BsGearFill } from "react-icons/bs";
import { useMsal } from "@azure/msal-react";

function NavBar() {
    const clientRef = useRef();
    const groupRef = useRef();
    const employeeRef = useRef();
    const adminToolsRef = useRef();

    const { instance } = useMsal();
    const account = instance.getActiveAccount();

    const handleLogout = () => {
        instance.logout();
    };

    useEffect(() => {
        console.log("klklklk", instance.getActiveAccount());
    }, []);

    return (
        <>
            <Navbar className="bg-primary" variant="dark">
                <Navbar.Brand className="ms-3">
                    <img
                        src="/images/real-logo-cropped.png"
                        alt="Exitcirklen-image"
                        height="50"
                    />
                    <img src="/images/text-logo.png" alt="Exitcirklen-text" />
                </Navbar.Brand>
                <Container fluid className="d-flex flex-column align-items-end">
                    <div className="d-flex justify-content-end gap-3 login-font conor-pos pt-1 pe-2">
                        <h6 className="text-black opacity-33">
                            {account?.name}
                        </h6>
                        <h6 className="login-hover" onClick={handleLogout}>
                            Log ud
                        </h6>
                    </div>
                    <div className="d-flex justify-content-end gap-5 me-5">
                        <Nav ref={clientRef}>
                            <Nav.Link as={Link} to={"/klientoversigt"}>
                                <h4>Venteliste</h4>
                            </Nav.Link>
                        </Nav>

                        <Nav
                            style={{
                                display:
                                    account.idTokenClaims.roles[0] ===
                                        "admin" ||
                                    account.idTokenClaims.roles[0] === "group"
                                        ? "block"
                                        : "none",
                            }}
                            ref={groupRef}
                        >
                            <Nav.Link as={Link} to={"/gruppeoversigt"}>
                                <h4>Gruppeoversigt</h4>
                            </Nav.Link>
                        </Nav>
                        <Nav
                            style={{
                                display:
                                    account.idTokenClaims.roles[0] === "admin"
                                        ? "block"
                                        : "none",
                            }}
                            ref={employeeRef}
                        >
                            <Nav.Link as={Link} to={"/medarbejderoversigt"}>
                                <h4>Medarbejderoversigt</h4>
                            </Nav.Link>
                        </Nav>

                        <Nav
                            style={{
                                display:
                                    account.idTokenClaims.roles[0] === "admin"
                                        ? "block"
                                        : "none",
                            }}
                            className="dropdownMenu"
                            ref={adminToolsRef}
                        >
                            <Nav.Link>
                                <h4 style={{ display: "inline" }}>
                                    <ul>
                                        <li>
                                            <a href="#">Oversigt</a>
                                            <ul>
                                                <Nav.Link
                                                    as={Link}
                                                    to={"/byoversigt"}
                                                >
                                                    <li>
                                                        <a>Byoversigt</a>
                                                    </li>
                                                </Nav.Link>
                                                <Nav.Link as={Link} to={""}>
                                                    <li>
                                                        <a href="#">
                                                            Rolleoversigt
                                                        </a>
                                                    </li>
                                                </Nav.Link>
                                            </ul>
                                        </li>
                                    </ul>
                                </h4>
                            </Nav.Link>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
