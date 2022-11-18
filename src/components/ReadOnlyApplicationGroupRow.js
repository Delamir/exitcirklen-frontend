import React from "react";

const ReadOnlyApplicationGroupRow = ({applicantGroup, handleEditClick}) => {

    return (
        <tr key={applicantGroup.id}>
            <td>{applicantGroup.city}</td>
            <td>{applicantGroup.address}</td>
            <td>{applicantGroup.name}</td>
            <td>{applicantGroup.groupSize}</td>
            <td>{applicantGroup.availableSpots}</td>
            <td>{applicantGroup.price}</td>
            <td>{applicantGroup.startDate}</td>
            <td>
                <button type="button"
                        onClick={(event) =>
                            handleEditClick(event, applicantGroup)}>
                    Ændre
                </button>
            </td>
        </tr>
    );
};

export default ReadOnlyApplicationGroupRow