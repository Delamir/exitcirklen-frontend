import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import {useState, useEffect} from "react";
import {FetchApplicants} from "./FetchApplicants";
import axios from "axios";

function ClientTable() {

    const headers = ["Navn", "Alder", "E-mail", "Telefonnummer", "Status", "I Status Siden", "By",
        "Bemærkning", "Handlinger"]

    const [applicants, setApplicants] = useState([])

    useEffect(() => {
        FetchApplicants().then((applicants) => {
            setApplicants(applicants.data)
        })
    })

    const handleDeleteClick = (applicantId) => {
        axios.delete("http://localhost:8081/applicants/" + applicantId)
    }

    return (
        <Container className="mt-5">
            <GenericTable headers={headers}>
            {applicants?.sort((a, b) => a.lastChanged.localeCompare(b.lastChanged))
                .map((applicant) => (
                <tr key={applicant.id}>
                    <td>{applicant.name}</td>
                    <td>{applicant.age}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phoneNumber}</td>
                    <td>{applicant.status}</td>
                    <td>{applicant.lastChanged.replace('T', ' ')}</td>
                    <td>{applicant.city}</td>
                    <td>{applicant.description}</td>
                    <td className="d-flex gap-3 justify-content-center">
                        <button type="button" className="btn btn-success btn-floating">
                            Ændre
                        </button>
                        <button type="button" className="btn btn-danger btn-floating"
                                onClick={() => handleDeleteClick(applicant.id)}>
                            Slet
                        </button>
                    </td>
                </tr>
            ))}
            </GenericTable>
        </Container>
    );
}

export default ClientTable;
