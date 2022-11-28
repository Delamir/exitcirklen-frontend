import {Table} from "react-bootstrap";
import {Fragment, useState, useEffect, useRef} from "react";
import {FetchApplicants} from "./FetchApplicants";
import ApplicantTableEditRows from "./ApplicantTableEditRows";
import ApplicantTableData from "./ApplicantTableData";
import axios from "axios";
import {FetchWaitingList} from "./FetchWaitingList";
import applicant from "./Applicant";

function ApplicantTable() {
    const headers =
        {
            "name": "Navn",
            "age": "Alder",
            "email": "E-mail",
            "phoneNumber": "Telefonnummer",
            "status": "Status",
            "lastChanged": "I Status Siden",
            "city": "By",
            "description": "Bemærkning",
            "actions": "Handlinger"
        };

    const [tableData, setTableData] = useState();
    const [editApplicant, setEditApplicant] = useState(null);
    const [sortBy, setSortedBy] = useState("asc")
    const [clickedTableHeadIndex, setClickedTableHeadIndex] = useState(-1)
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
        fetchTableData();
    }, []);

    const fetchTableData = () => {
        if (Number(dropDownRef.current.value) === 1) {
            FetchApplicants().then((response) => {
                setTableData(() => response.data);
            });
        } else {
            FetchWaitingList().then((response) => {
                setTableData(() => response.data);
            });
        }
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
        fetchTableData();
    };

    const handleDeleteClick = (applicantId) => {
        axios
            .delete("http://localhost:8081/applicants/" + applicantId)
            .then(fetchTableData);
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
        fetchTableData();
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
            .then(fetchTableData)
            .catch((error) => console.log(error));

        setEditApplicant(null);

    };

    const handleCancelClick = () => {
        setEditApplicant(null);
        fetchTableData();
    };

    const handleSort = (header) => {
        const toSort = Object.keys(headers).find(key => headers[key] === header)

        if (sortBy === "asc") {
            setTableData(tableData?.sort((a, b) =>
                a[toSort]
                    .toString()
                    .localeCompare(b[toSort].toString())
            ))

            setSortedBy("dsc")
        }

        if (sortBy === "dsc") {
            setTableData(tableData?.sort((a, b) =>
                b[toSort]
                    .toString()
                    .localeCompare(a[toSort].toString())
            ))
            setSortedBy("asc")
        }
    };

    const getArrow = () => {

        if (sortBy === "asc") {
            return "↑"
        } else {
            return "↓"
        }
    }

    const handleVisitationClick = (bookedDate, applicant) => {
        axios
            .post("http://localhost:8081/applicants/visitation-request", {applicant: applicant, time: bookedDate})
            .then((response) => {
                fetchTableData()
                console.log(response);
            });
    };

    const handleCancelVisitationClick = (reason, applicant) => {
        axios
            .post("http://localhost:8081/applicants/cancel-visitation", {applicant: applicant, reason: reason})
            .then((response) => {
                fetchTableData()
                console.log(response)
            })
    }

    return (

        <div className="mt-5 mx-5 text-break">
            <div className="d-flex justify-content-between">
                <h1>Klientoversigt</h1>
                <select
                    ref={dropDownRef}
                    onChange={fetchTableData}
                    className="mt-3"
                >
                    <option value="1">Klientoversigt</option>
                    <option value="2">Venteliste</option>
                </select>
            </div>
            <form className="form-horizontal">
                <Table responsive striped bordered hover size="large">
                    <thead className="bg-primary text-white table-head-pointer">
                    <tr>
                        {Object.values(headers).map((header, index) => (
                            <th key={index} onClick={() => {
                                handleSort(header)
                                setClickedTableHeadIndex(index)
                            }}>
                                {(() => {
                                    let returnHeaderArrow = header + " ↕"

                                    if (header === "Handlinger") {
                                        returnHeaderArrow = header
                                    }

                                    if (clickedTableHeadIndex === index) {
                                        returnHeaderArrow = header + " " + getArrow()
                                    }

                                    return returnHeaderArrow
                                })()}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableData
                        ?.map((applicant) => (
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
                                        handleVisitationClick={handleVisitationClick}
                                        handleCancelVisitationClick={handleCancelVisitationClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </Table>
            </form>
        </div>
    );
}

export default ApplicantTable;