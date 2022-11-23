import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import { FetchApplicantGroups } from "./FetchApplicantGroups";
import { Fragment, useEffect, useState } from "react";
import GroupTableReadOnly from "./GroupTableReadOnly";
import GroupTableEditRows from "./GroupTableEditRows";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GroupTable() {

    const navigate = useNavigate();

    const headers = [
        "By",
        "Adresse",
        "Gruppe Navn",
        "Hold Størrelse",
        "Ledige Pladser",
        "Pris",
        "Datoer for start",
        <><span className="d-flex flex-row-reverse">
            <button onClick={() => navigate("/opret-gruppe")} type="button" className=" btn btn-create text-white">+ Opret gruppe</button>
        </span></>,
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

    useEffect(() => {
        fetchTableData();
    }, []);


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
            ).then(fetchTableData)
            .catch((error) => console.log(error));

        setEditApplicantGroupId(null);
    };

    const handleDeleteClick = (e, applicantGroup) => {
        console.log("helt suget", applicantGroup.id)
        axios
            .delete("http://localhost:8081/groups/" + applicantGroup.id)
            .then(fetchTableData);

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

        fetchTableData();
        setEditFormData(formValues);
    };

    const handleInviteClick = (e, applicantGroup) => {
        e.preventDefault();
        navigate(`/gruppe/${applicantGroup.id}`);
    };

    const fetchTableData = () => {
        FetchApplicantGroups().then((applicantGroups) => {
            setApplicantGroups(applicantGroups.data);
            console.log(applicantGroups);
        });
    };

    const handleCancelClick = () => {
        setEditApplicantGroupId(null);
        fetchTableData();
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
                                    handleDeleteClick={handleDeleteClick}
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
