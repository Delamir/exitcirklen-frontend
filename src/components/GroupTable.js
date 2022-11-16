import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";

function GroupTable() {
    
    const headers = [
        "By",
        "Adresse",
        "Gruppe Navn",
        "Hold Størrelse",
        "Ledige Pladser",
        "Pris",
        "Datoer for start",
        "Handlinger",
    ];

    return (
        <Container className="mt-5">
            <GenericTable headers={headers} />
        </Container>
    );
}
export default GroupTable;
