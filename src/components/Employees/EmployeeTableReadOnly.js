import React from "react";


const EmployeeTableReadOnly = ({employee, handleEditClick,handleDeleteClick,   }) => {
    return (
        <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.age}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.responsibility}</td>
            <td className="d-flex gap-3 justify-content-center">
                <button
                    type="button"
                    className="btn btn-success btn-floating"
                    onClick={(event) => handleEditClick(event, employee)}
                >
                    Ændre
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-floating"
                    onClick={(event) => handleDeleteClick(event, employee)}
                >
                    Slet
                </button>

            </td>
        </tr>
    );
};

export default EmployeeTableReadOnly;