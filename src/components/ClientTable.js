import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import {useState, useEffect} from "react";
import {FetchApplicants} from "./FetchApplicants";
import ClientTableEditRows from "./ClientTableEditRows";
import ClientTableData from "./ClientTableData";

function ClientTable() {

    const headers = ["Navn", "Alder", "E-mail", "Telefonnummer", "Status", "I Status Siden", "By",
        "Bemærkning", "Handlinger"]

    const [applicants, setApplicants] = useState([])

    useEffect(() => {
        FetchApplicants().then((applicants) => {
            setApplicants(applicants.data)
        })
    })

    return (
        <form>
            <Container className="mt-5">
                <GenericTable headers={headers}>
                    {applicants?.sort((a, b) => a.lastChanged.localeCompare(b.lastChanged))
                        .map((applicant) => (
                            <fragment>
                                <ClientTableData applicant={applicant}/>
                                <ClientTableEditRows/>
                            </fragment>
                        ))}
                </GenericTable>
            </Container>
        </form>
    );
}

export default ClientTable;
