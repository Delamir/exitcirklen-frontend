import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";

function ClientTable() {

    const headers = ["Navn", "Alder", "E-mail", "Telefonnummer", "Status", "Længde status", "Lokation",
        "Bemærkning", "Handlinger"]

    return (
        <Container className="mt-5">
            <GenericTable headers={headers} />
        </Container>
    );
}

export default ClientTable;
