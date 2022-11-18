import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import {FetchApplicantGroups} from "./FetchApplicantGroups";
import {Fragment, useEffect, useState} from "react";
import ReadOnlyApplicationGroupRow from "./ReadOnlyApplicationGroupRow";
import EditApplicantGroup from "./EditApplicantGroup";
import axios from "axios";

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

    const [editFormData, setEditFormData] = useState( {
        city : "",
        address : "",
        name : "",
        groupSize : "",
        availableSpots : "",
        price : "",
        startDate : "",
    })

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("city");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue;
        console.log("hej", editFormData, newFormData[fieldName])

        setEditFormData(newFormData);

    }

    const [editApplicantGroupId, setEditApplicantGroupId] = useState(null)

    const [applicantGroups, setApplicantGroupsId] = useState([])

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedApplicantGroup = {
            city: editFormData.city,
            address: editFormData.address,
            name: editFormData.name,
            groupSize: editFormData.groupSize,
            availableSpots: editFormData.availableSpots,
            price: editFormData.price,
            startDate: editFormData.startDate
        }

        axios.patch("http://localhost:8081/groups/" + editFormData.id, editedApplicantGroup)
            .catch((error) => console.log(error))

        setEditApplicantGroupId(null)
    }

    const handleEditClick = (event, applicantGroup) => {
        event.preventDefault();
        setEditApplicantGroupId(applicantGroup.id);

        const formValues = {
            id: applicantGroup.id,
            city: applicantGroup.city,
            address: applicantGroup.address,
            name: applicantGroup.name,
            groupSize: applicantGroup.groupSize,
            availableSpots: applicantGroup.availableSpots,
            price: applicantGroup.price,
            startDate: applicantGroup.startDate,
        }

        setEditFormData(formValues);
    }

    useEffect(() =>{
        FetchApplicantGroups().then((applicantGroups) =>{
            setApplicantGroupsId(applicantGroups.data)
        })
    })

    return (
        <form>
        <Container className="mt-5">
            <GenericTable headers={headers}>
                {applicantGroups?.map((applicantGroup) => (
                    <Fragment key={applicantGroup.id}>
                        { editApplicantGroupId === applicantGroup.id ?(
                            <EditApplicantGroup
                                editFormData={editFormData}
                                handleEditFormChange={handleEditFormChange}
                                handleEditFormSubmit={handleEditFormSubmit}/>
                            )  : (
                            <ReadOnlyApplicationGroupRow
                                applicantGroup={applicantGroup}
                                handleEditClick={handleEditClick}/>
                        )}


                    </Fragment>
                    ))}
            </GenericTable>
        </Container>
        </form>
    );
}
export default GroupTable;
