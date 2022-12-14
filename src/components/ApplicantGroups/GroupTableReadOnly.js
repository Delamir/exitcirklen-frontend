import React from "react";
import {CiEdit, CiTrash, CiViewList} from "react-icons/ci";

const GroupTableReadOnly = ({ applicantGroup, handleDeleteClick, handleEditClick, handleInviteClick }) => {
    return (
        <tr key={applicantGroup.id}>
            <td>{applicantGroup.city?.name}</td>
            <td>{applicantGroup.address}</td>
            <td>{applicantGroup.name}</td>
            <td>{applicantGroup.groupSize}</td>
            <td>{applicantGroup.groupSize - applicantGroup.inviteList.length}</td>
            <td>{applicantGroup.price}</td>
            <td>{applicantGroup.startDate.replace("T", " ")}</td>
            <td className="d-flex gap-3 justify-content-center">
                <button
                    type="button"
                    className="btn btn-success btn-floating"
                    onClick={(event) => handleEditClick(event, applicantGroup)}
                >
                    <CiEdit/>
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-floating"
                    onClick={(event) => handleDeleteClick(event, applicantGroup)}
                >
                    <CiTrash/>
                </button>
                <button
                    type="button"
                    className="btn btn-warning btn-floating"
                    onClick={(e) => handleInviteClick(e, applicantGroup)}
                >
                    <CiViewList />
                </button>
            </td>
        </tr>
    );
};

export default GroupTableReadOnly;
