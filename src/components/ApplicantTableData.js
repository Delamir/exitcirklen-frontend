import {CiCalendar, CiEdit, CiTrash} from "react-icons/ci";
import {useState} from "react";
import {Box, Modal, Typography} from "@mui/material";
import axios from "axios";

function ApplicantTableData({applicant, handleDeleteClick, handleEditClick}) {

    const [bookedDate, setBookedDate] = useState();
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault()
        setOpen(true);
    }
    const handleClose = (event) => {
        event.preventDefault()
        setOpen(false);
    }

    const handleVisitationClick = (event) => {
        event.preventDefault()
        console.log(bookedDate)
        axios
            .post("http://localhost:8081/applicants/visitation-request", {applicant: applicant, time: bookedDate})
            .then((response) => {
                console.log(response);
            });

        handleClose(event)
    };

    const handleChange = (event) => {
        setBookedDate(event.target.value)
    }

    return (
        <tr key={applicant.id}>
            <td>{applicant.name}</td>
            <td>{applicant.age}</td>
            <td>{applicant.email}</td>
            <td>{applicant.phoneNumber}</td>
            <td>
                {(() => {
                    let returnTd = applicant.status.replace("_", " ")

                    if (applicant.status === "IKKE_VISITERET") {
                        returnTd = <div>
                            {applicant.status.replace("_", " ")}
                            <button className="btn outline mb-2 ms-1" onClick={handleOpen}>
                                <CiCalendar/>
                            </button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="modal-visitation">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Book en visitation på {applicant.name}
                                    </Typography>
                                    <div className="d-flex gap-2">
                                        <input
                                            className="form-control mt-4"
                                            type="datetime-local"
                                            required="required"
                                            name="bookedDate"
                                            onChange={handleChange}
                                            value={bookedDate}
                                        />
                                        <button type="submit" className="btn btn-primary btn-floating mt-4"
                                                onClick={(event) => handleVisitationClick(event)}>
                                            Book
                                        </button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    }
                    return returnTd
                })()}
            </td>
            <td>{applicant.lastChanged.toString().replace("T", " ")}</td>
            <td>{applicant.city}</td>
            <td className="col-2">{applicant.description}</td>
            <td>
                <div className="d-flex gap-3 justify-content-center text-nowrap">
                    <button
                        type="button"
                        className="btn btn-success btn-floating"
                        onClick={(event) => handleEditClick(event, applicant)}
                    >
                        <CiEdit/>
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
                        <CiTrash/>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ApplicantTableData;
