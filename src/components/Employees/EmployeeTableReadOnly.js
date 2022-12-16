import React from "react";
import { CiEdit, CiTrash } from "react-icons/ci";

const EmployeeTableReadOnly = ({
    employee,
    handleEditClick,
    handleDeleteClick,
}) => {
    return (
        <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.age}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.role}</td>
            <td>{employee.city?.name}</td>
            <td className="d-flex gap-3 justify-content-center">
                <button
                    type="button"
                    className="btn btn-success btn-floating"
                    onClick={(event) => handleEditClick(event, employee)}
                >
                    <CiEdit />
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-floating"
                    onClick={(event) => {
                        const confirmBox = window.confirm(
                            "Vil du slette medarbejderen?"
                        );

                        if (confirmBox === true) {
                            handleDeleteClick(event, employee);
                        }
                    }}
                >
                    <CiTrash />
                </button>
            </td>
        </tr>
    );
};

export default EmployeeTableReadOnly;
