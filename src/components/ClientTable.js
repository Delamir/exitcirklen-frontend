import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import { Fragment, useState, useEffect } from "react";
import { FetchApplicants } from "./FetchApplicants";
import ClientTableEditRows from "./ClientTableEditRows";
import ClientTableData from "./ClientTableData";
import axios from "axios";
import { Col } from "react-bootstrap";

function ClientTable() {
    const headers = [
        "Navn",
        "Alder",
        "E-mail",
        "Telefonnummer",
        "Status",
        "I Status Siden",
        "By",
        "Bemærkning",
        "Handlinger",
    ];

    const [applicants, setApplicants] = useState([]);
    const [editApplicant, setEditApplicant] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        age: "",
        email: "",
        phoneNumber: "",
        status: "",
        lastChanged: "",
        city: "",
        description: "",
    });

    useEffect(() => {
        FetchApplicants().then((applicants) => {
            setApplicants(applicants.data);
        });
    });

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleDeleteClick = (applicantId) => {
        axios.delete("http://localhost:8081/applicants/" + applicantId);
    };

    const handleEditClick = (event, applicant) => {
        event.preventDefault();
        setEditApplicant(applicant.id);

        const formValues = {
            id: applicant.id,
            name: applicant.name,
            age: applicant.age,
            email: applicant.email,
            phoneNumber: applicant.phoneNumber,
            status: applicant.status,
            lastChanged: applicant.lastChanged,
            city: applicant.city,
            description: applicant.description,
        };

        setEditFormData(formValues);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedApplicant = {
            name: editFormData.name,
            age: editFormData.age,
            email: editFormData.email,
            phoneNumber: editFormData.phoneNumber,
            status: editFormData.status,
            lastChanged: editFormData.lastChanged,
            city: editFormData.city,
            description: editFormData.description,
        };

        axios
            .patch(
                "http://localhost:8081/applicants/" + editFormData.id,
                editedApplicant
            )
            .catch((error) => console.log(error));

        setEditApplicant(null);
    };

    const handleCancelClick = () => {
        setEditApplicant(null);
    };

    return (
        <Container className="mt-5">
            <form className="form-horizontal">
                <GenericTable headers={headers}>
                    {applicants
                        ?.sort((a, b) =>
                            a.lastChanged.localeCompare(b.lastChanged)
                        )
                        .map((applicant) => (
                            <Fragment key={applicant.id}>
                                {editApplicant === applicant.id ? (
                                    <ClientTableEditRows
                                        editFormData={editFormData}
                                        handleEditFormChange={
                                            handleEditFormChange
                                        }
                                        handleEditFormSubmit={
                                            handleEditFormSubmit
                                        }
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ClientTableData
                                        applicant={applicant}
                                        handleDeleteClick={handleDeleteClick}
                                        handleEditClick={handleEditClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                </GenericTable>
            </form>
        </Container>
    );
}

export default ClientTable;
