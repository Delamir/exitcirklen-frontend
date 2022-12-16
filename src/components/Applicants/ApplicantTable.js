import {Table} from "react-bootstrap";
import {Fragment, useState, useEffect, useRef} from "react";
import FetchService from "../../services/FetchService";
import ApplicantTableEditRows from "./ApplicantTableEditRows";
import ApplicantTableReadOnly from "./ApplicantTableReadOnly";
import AuthService from "../../services/auth.service";

function ApplicantTable() {
    const headers =
        {
            "city": "By",
            "group": "Gruppe",
            "name": "Navn",
            "email": "E-mail",
            "phoneNumber": "Telefonnummer",
            "age": "Alder",
            "lastChanged": "I Status Siden",
            "description": "Bemærkning",
            "status": "Status",
            "actions": "Handlinger"
        };

    const fetchService = new FetchService();

    const [cursor, setCursor] = useState("pointer");
    const [tableData, setTableData] = useState();
    const [editApplicant, setEditApplicant] = useState(null);
    const [sortBy, setSortedBy] = useState("asc")
    const [cityList, setCityList] = useState([])
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
    const employee = AuthService.getCurrentUser();

    useEffect(() => {
        fetchTableData();
        fetchService.fetchCities().then((response) => {
            setCityList(response.data)
        })
    }, [])


    const fetchTableData = () => {
        if(employee.roles[0] === "ADMINISTRATOR") {
            if (Number(dropDownRef.current.value) === 1) {
                fetchService.fetchApplicants().then((response) => {
                    setCursor("pointer");
                    setTableData(() => response.data);
                    console.log(response.data, " TABLEDATA")
                });
            } else {
                fetchService.fetchWaitingList().then((response) => {
                    setCursor("pointer");
                    setTableData(() => response.data);
                });
            }
        } else {
            if (Number(dropDownRef.current.value) === 1) {
                fetchService.fetchApplicantsByCity(employee.city.id).then((response) => {
                    setCursor("pointer");
                    setTableData(() => response.data);
                    console.log(response.data, " TABLEDATA")
                });
            } else {
                fetchService.fetchWaitingListByCity(employee.city.id).then((response) => {
                    setCursor("pointer");
                    setTableData(() => response.data);
                });
            }
        }
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        let fieldValue = event.target.value;
        if(fieldName === "city") {
            fieldValue = cityList[event.target.value]
        }


        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        console.log(newFormData)
        setCursor("pointer");
        setEditFormData(newFormData);
        fetchTableData();
    };

    const handleDeleteClick = (applicantId) => {
        setCursor("wait");
        fetchService.fetchDeleteApplicant(applicantId)
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


        setCursor("wait");
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
        setCursor("wait");
        fetchService.fetchPatchApplicant(editFormData.id, editedApplicant)
            .then(fetchTableData)
            .catch((error) => console.log(error));

        setEditApplicant(null);

    };

    const handleCancelClick = () => {
        setEditApplicant(null);
        setCursor("wait");
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
        setCursor("wait");
        fetchService.fetchVisitationRequest(applicant, bookedDate)
            .then((response) => {
                fetchTableData()
                console.log(response);
            });
    };

    const handleCancelVisitationClick = (reason, applicant) => {
        setCursor("wait");
        fetchService.fetchCancelVisitation(applicant, reason)
            .then((response) => {
                fetchTableData()
                console.log(response)
            })
    }

    const handleConfirmVisitationClick = (applicant) => {
        setCursor("wait");
        fetchService.fetchConfirmVisitation(applicant)
            .then((response) => {
                fetchTableData()
                console.log(response)
            })
    }


    return (

        <div style={{"cursor" : cursor}} className="mt-5 mx-5 text-break">
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
                                        cityList={cityList}
                                    />
                                ) : (
                                    <ApplicantTableReadOnly
                                        applicant={applicant}
                                        handleDeleteClick={handleDeleteClick}
                                        handleEditClick={handleEditClick}
                                        handleVisitationClick={handleVisitationClick}
                                        handleCancelVisitationClick={handleCancelVisitationClick}
                                        handleConfirmVisitationClick={handleConfirmVisitationClick}
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