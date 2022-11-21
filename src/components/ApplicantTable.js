import GenericTable from "./GenericTable";
import Container from "react-bootstrap/Container";
import {Fragment, useState, useEffect, useRef} from "react";
import {FetchApplicants} from "./FetchApplicants";
import ApplicantTableEditRows from "./ApplicantTableEditRows";
import ApplicantTableData from "./ApplicantTableData";
import axios from "axios";
import {FetchWaitingList} from "./FetchWaitingList";

function ApplicantTable() {
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

    const [tableData, setTableData] = useState()
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

    const dropDownRef = useRef("1");

    useEffect(() => {
        fetchTableData()
    }, []);

    const fetchTableData = () => {

        if (Number(dropDownRef.current.value) === 1) {
            FetchApplicants().then((response) => {
                setTableData(() => response.data)
            });
        } else {
            FetchWaitingList().then((response) => {
                setTableData(() => response.data)
            })

        }
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
        fetchTableData()
    };

    const handleDeleteClick = (applicantId) => {
        axios.delete("http://localhost:8081/applicants/" + applicantId).then(fetchTableData);
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
        fetchTableData()
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
        fetchTableData()
    };

    const handleCancelClick = () => {
        setEditApplicant(null);
        fetchTableData()
    };

    return (

        <Container className="mt-5">
            <Container className="d-flex justify-content-between">
                <h1>Klientoversigt</h1>
                <select ref={dropDownRef} onChange={fetchTableData} className="mt-3">
                    <option value="1">Klientoversigt</option>
                    <option value="2">Venteliste</option>
                </select>
            </Container>
            <form className="form-horizontal">
                <GenericTable headers={headers}>
                    {tableData
                        ?.sort((a, b) =>
                            a.lastChanged.localeCompare(b.lastChanged)
                        )
                        .map((applicant) => (
                            <Fragment key={applicant.id}>
                                {editApplicant === applicant.id ? (
                                    <ApplicantTableEditRows
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
                                    <ApplicantTableData
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

export default ApplicantTable;
