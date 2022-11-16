import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import {useState, useEffect} from "react";
import {FetchApplicants} from "./FetchApplicants";

function ClientTable() {

    const headers = ["Navn", "Alder", "E-mail", "Telefonnummer", "Status", "Længde status", "By",
        "Bemærkning", "Handlinger"]

    const [applicants, setApplicants] = useState([])

    useEffect(() => {
        FetchApplicants().then((applicants) => {
            setApplicants(applicants.data)
        })
    })

    return (
        <Container className="mt-5">
            <GenericTable headers={headers}>
            {applicants?.map((applicant) => (
                <tr key={applicant.id}>
                    <td>{applicant.name}</td>
                    <td>{applicant.age}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phoneNumber}</td>
                    <td>{applicant.status}</td>
                    <td>IKKE LAVET ENDNU</td>
                    <td>{applicant.city}</td>
                    <td>{applicant.description}</td>
                    <td>KNAPPER</td>
                </tr>
            ))}
            </GenericTable>
        </Container>
    );
}

export default ClientTable;
