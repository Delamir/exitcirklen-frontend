import GenericTable from "./GenericTable";

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
        <GenericTable headers={headers}>
            <td>ugg</td>
            <td>ugg</td>
            <td>ugg</td>
            <td>ugg</td>
            <td>ugg</td>
            <td>ugg</td>
            <td>ugg</td>
            <td>ugg</td>
        </GenericTable>
    );
}
export default GroupTable;
