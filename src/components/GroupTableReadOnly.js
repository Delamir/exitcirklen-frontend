import React from "react";

const GroupTableReadOnly = ({ applicantGroup,handleNewClick, handleDeleteClick, handleEditClick, handleInviteClick }) => {
    return (
        <tr key={applicantGroup.id}>
            <td>{applicantGroup.city}</td>
            <td>{applicantGroup.address}</td>
            <td>{applicantGroup.name}</td>
            <td>{applicantGroup.groupSize}</td>
            <td>{applicantGroup.availableSpots}</td>
            <td>{applicantGroup.price}</td>
            <td>{applicantGroup.startDate.replace("T", " ")}</td>
            <td className="d-flex gap-3 justify-content-center">
                <button
                    type="button"
                    className="btn btn-success btn-floating"
                    onClick={(event) => handleEditClick(event, applicantGroup)}
                >
                    Ændre
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-floating"
                    onClick={(event) => handleDeleteClick(event, applicantGroup)}
                >
                    Slet
                </button>
                <button
                    type="button"
                    className="btn btn-warning btn-floating"
                    onClick={(e) => handleInviteClick(e, applicantGroup)}
                >
                    Inviter
                </button>
            </td>
        </tr>
    );
};

export default GroupTableReadOnly;
