import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import {FetchApplicantGroups} from "./FetchApplicantGroups";
import {Fragment, useEffect, useState} from "react";
import ReadOnlyApplicationGroupRow from "./ReadOnlyApplicationGroupRow";
import EditApplicantGroup from "./EditApplicantGroup";

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
        <form>
        <Container className="mt-5">
            <GenericTable headers={headers}>
                {applicantGroups?.map((applicantGroup) => (
                    <Fragment>

                        <EditApplicantGroup />
                        <ReadOnlyApplicationGroupRow applicantGroup={applicantGroup} />
                    </Fragment>
                    ))}
            </GenericTable>
        </Container>
        </form>
    );
}
export default GroupTable;
