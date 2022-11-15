
import Table from "./GenericTable";

function ClientTable() {



    const headers = ["Navn", "Alder", "E-mail", "Telefonnummer", "Status", "Længde status", "Lokation",
        "Bemærkning", "Handlinger"]

    return (
            <Table props={headers} />
    );
}

export default ClientTable;
