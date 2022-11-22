import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import { FetchApplicantGroups } from "./FetchApplicantGroups";
import { Fragment, useEffect, useState } from "react";
import GroupTableReadOnly from "./GroupTableReadOnly";
import GroupTableEditRows from "./GroupTableEditRows";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const [editApplicantGroupId, setEditApplicantGroupId] = useState(null);
    const [applicantGroups, setApplicantGroups] = useState([]);
    const [editFormData, setEditFormData] = useState({
        city: "",
        address: "",
        name: "",
        groupSize: "",
        availableSpots: "",
        price: "",
        startDate: "",
    });

    const navigate = useNavigate();

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");

        const fieldValue = event.target.value;
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        console.log("hej", editFormData, newFormData[fieldName]);
        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedApplicantGroup = {
            city: editFormData.city,
            address: editFormData.address,
            name: editFormData.name,
            groupSize: editFormData.groupSize,
            availableSpots: editFormData.availableSpots,
            price: editFormData.price,
            startDate: editFormData.startDate,
        };

        axios
            .patch(
                "http://localhost:8081/groups/" + editFormData.id,
                editedApplicantGroup
            )
            .catch((error) => console.log(error));

        setEditApplicantGroupId(null);
    };

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
        };

        setEditFormData(formValues);
    };

    const handleInviteClick = (e, applicantGroup) => {
        e.preventDefault();
        navigate(`/gruppe/${applicantGroup.id}`);
    };

    useEffect(() => {
        FetchApplicantGroups().then((applicantGroups) => {
            setApplicantGroups(applicantGroups.data);
            console.log(applicantGroups);
        });
    });

    const handleCancelClick = () => {
        setEditApplicantGroupId(null);
    };

    return (
        <form>
            <Container className="mt-5">
                <h1>Gruppeoversigt</h1>
                <GenericTable headers={headers}>
                    {applicantGroups?.map((applicantGroup) => (
                        <Fragment key={applicantGroup.id}>
                            {editApplicantGroupId === applicantGroup.id ? (
                                <GroupTableEditRows
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleEditFormSubmit={handleEditFormSubmit}
                                    handleCancelClick={handleCancelClick}
                                />
                            ) : (
                                <GroupTableReadOnly
                                    applicantGroup={applicantGroup}
                                    handleEditClick={handleEditClick}
                                    handleInviteClick={handleInviteClick}
                                />
                            )}
                        </Fragment>
                    ))}
                </GenericTable>
            </Container>
        </form>
    );
}
export default GroupTable;
