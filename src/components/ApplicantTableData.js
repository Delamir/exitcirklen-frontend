function ApplicantTableData({applicant, handleDeleteClick, handleEditClick}) {
    return (
        <tr key={applicant.id}>
            <td>{applicant.name}</td>
            <td>{applicant.age}</td>
            <td>{applicant.email}</td>
            <td>{applicant.phoneNumber}</td>
            <td>{applicant.status.replace("_", " ")}</td>
            <td>{applicant.lastChanged.replace("T", " ")}</td>
            <td>{applicant.city}</td>
            <td className="col-2">{applicant.description}</td>
            <td>
                <div className="d-flex gap-3 justify-content-center">
                    <button
                        type="button"
                        className="btn btn-success btn-floating"
                        onClick={(event) => handleEditClick(event, applicant)}
                    >
                        Ændre
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-floating"
                        onClick={() => {
                            const confirmBox = window.confirm(
                                "Vil du slette personen?"
                            );
                            if (confirmBox === true) {
                                handleDeleteClick(applicant.id);
                            }
                        }}
                    >
                        Slet
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ApplicantTableData;