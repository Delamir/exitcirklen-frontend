import { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EmployeeTableReadOnly from "./EmployeeTableReadOnly";
import EmployeeTableEditRows from "./EmployeeTableEditRows";
import GenericTable from "../Generics/GenericTable";
import FetchService from "../../services/FetchService";

function EmployeeTable() {
    const navigate = useNavigate();

    const headers = [
        "Navn",
        "Alder",
        "E-mail",
        "Telefonnummer",
        "Ansvarsområde",
        <>
            <span className="d-flex flex-row-reverse">
                <button
                    onClick={() => navigate("/opret-medarbejder")}
                    type="button"
                    className=" btn btn-create text-white"
                >
                    + Opret medarbejder
                </button>
            </span>
        </>,
    ];

    const fetchService = new FetchService();

    const [cursor, setCursor] = useState("pointer");
    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [employee, setEmployee] = useState([]);
    const [editFormData, setEditFormData] = useState({
        name: "",
        age: "",
        email: "",
        phoneNumber: "",
        responsibility: "",
    });

    const fetchTableData = () => {
        fetchService.fetchEmployees().then((employee) => {
            setCursor("pointer");
            setEmployee(employee.data);
            console.log(employee);
        });
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");

        const fieldValue = event.target.value;
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
        fetchTableData();
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedEmployee = {
            id: editFormData.id,
            name: editFormData.name,
            age: editFormData.age,
            email: editFormData.email,
            phoneNumber: editFormData.phoneNumber,
            responsibility: editFormData.responsibility,
        };
        console.log("HANDLE EDIT FORM ");
        console.log(editFormData);
        console.log(editFormData.id);

        setCursor("wait");
        fetchService
            .fetchPutEmployee(editFormData.id, editedEmployee)
            .then(fetchTableData)
            .catch((error) => console.log(error));

        setEditEmployeeId(null);
    };

    const handleEditClick = (event, employee) => {
        event.preventDefault();
        setEditEmployeeId(employee.id);

        const formValues = {
            id: employee.id,
            name: employee.name,
            age: employee.age,
            email: employee.email,
            city: employee.city,
            phoneNumber: employee.phoneNumber,
            responsibility: employee.role,
        };

        setCursor("wait");
        setEditFormData(formValues);
        fetchTableData();
    };

    const handleCancelClick = () => {
        setEditEmployeeId(null);
        setCursor("wait");
        fetchTableData();
    };

    const handleDeleteClick = (e, employee) => {
        setCursor("wait");
        fetchService.fetchDeleteEmployee(employee.id)
            .then(fetchTableData);
    };

    return (
        <form>
            <Container className="mt-5">
                <h1>Medarbejderoversigt</h1>
                <GenericTable headers={headers}>
                    {employee?.map((employee) => (
                        <Fragment key={employee.id}>
                            {editEmployeeId === employee.id ? (
                                <EmployeeTableEditRows
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleEditFormSubmit={handleEditFormSubmit}
                                    handleCancelClick={handleCancelClick}
                                />
                            ) : (
                                <EmployeeTableReadOnly
                                    employee={employee}
                                    handleDeleteClick={handleDeleteClick}
                                    handleEditClick={handleEditClick}
                                />
                            )}
                        </Fragment>
                    ))}
                </GenericTable>
            </Container>
        </form>
    );
}

export default EmployeeTable;
