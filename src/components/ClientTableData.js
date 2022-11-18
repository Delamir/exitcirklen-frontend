import axios from "axios";

function ClientTableData ({ applicant }) {

    const handleDeleteClick = (applicantId) => {
        axios.delete("http://localhost:8081/applicants/" + applicantId)
    }

    return (
        <tr key={applicant.id}>
            <td>{applicant.name}</td>
            <td>{applicant.age}</td>
            <td>{applicant.email}</td>
            <td>{applicant.phoneNumber}</td>
            <td>{applicant.status}</td>
            <td>{applicant.lastChanged.replace('T', ' ')}</td>
            <td>{applicant.city}</td>
            <td>{applicant.description}</td>
            <td className="d-flex gap-3 justify-content-center">
                <button type="button" className="btn btn-success btn-floating">
                    Ændre
                </button>
                <button type="button" className="btn btn-danger btn-floating"
                        onClick={() => handleDeleteClick(applicant.id)}>
                    Slet
                </button>
            </td>
        </tr>
    );
}

export default ClientTableData;