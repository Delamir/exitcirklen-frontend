import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import {FetchApplicantGroups} from "./FetchApplicantGroups";
import {useEffect, useState} from "react";

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

    const [applicantGroups, setApplicantGroups] = useState([])

    useEffect(() =>{
        FetchApplicantGroups().then((applicantGroups) =>{
            setApplicantGroups(applicantGroups.data)
        })
    })

    return (
        <Container className="mt-5">
            <GenericTable headers={headers}>
                {applicantGroups?.map((applicantGroup) => (
                    <tr key={applicantGroup.id}>
                        <td>{applicantGroup.city}</td>
                        <td>{applicantGroup.address}</td>
                        <td>{applicantGroup.name}</td>
                        <td>{applicantGroup.groupSize}</td>
                        <td>{applicantGroup.availableSpots}</td>
                        <td>{applicantGroup.price}</td>
                        <td>{applicantGroup.startDate}</td>
                        <td>nogle knapper</td>
                        <button type="button" onClick={(event) => handleEditClick(event, applicantGroup.id)}>Edit</button>
                    </tr>
                    ))}
            </GenericTable>
        </Container>
    );
}
export default GroupTable;
