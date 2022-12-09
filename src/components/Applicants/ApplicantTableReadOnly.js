import {CiCalendar, CiCircleCheck, CiEdit, CiNoWaitingSign, CiTrash, CiViewList} from "react-icons/ci";
import {useState} from "react";
import {Box, Modal, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function ApplicantTableReadOnly({
                                applicant, handleDeleteClick, handleEditClick,
                                handleVisitationClick, handleCancelVisitationClick, handleConfirmVisitationClick
                            }) {

    const [bookedDate, setBookedDate] = useState();
    const [reason, setReason] = useState("");
    const [openBookVisitation, setOpenBookVisitation] = useState(false);
    const [openCancelVisitation, setOpenCancelVisitation] = useState(false);

    const handleOpenCancelVisitation = (event) => {
        event.preventDefault()
        setOpenCancelVisitation(true)
    }

    const handleCloseCancelVisitation = () => {
        setOpenCancelVisitation(false)
    }

    const handleOpenBookVisitation = (event) => {
        event.preventDefault()
        setOpenBookVisitation(true);
    }
    const handleCloseBookVisitation = () => {
        setOpenBookVisitation(false);
    }

    const handleBookedDateChange = (event) => {
        setBookedDate(event.target.value)
    }

    const handleCancelVisitationChange = (event) => {
        setReason(event.target.value)
    }

    const navigate = useNavigate();

    return (
        <tr key={applicant.id}>
            <td>{applicant.city}</td>
            <td>{applicant.group?.name}</td>
            <td>{applicant.name}</td>
            <td>{applicant.email}</td>
            <td>{applicant.phoneNumber}</td>
            <td>{applicant.age}</td>
            <td>{applicant.lastChanged.toString().replace("T", " ")}</td>
            <td className="col-2">{applicant.description}</td>
            <td>
                {(() => {
                    let returnTd = applicant.status.replace("_", " ")

                    // Modal for booking a visitation
                    if (applicant.status === "IKKE_VISITERET") {
                        returnTd = <div>
                            {applicant.status.replace("_", " ")}
                            <button className="btn outline mb-2 ms-1 better-icon-size"
                                    onClick={handleOpenBookVisitation}>
                                <CiCalendar/>
                            </button>
                            <Modal
                                open={openBookVisitation}
                                onClose={handleCloseBookVisitation}
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
                                            onChange={handleBookedDateChange}
                                            value={bookedDate}
                                        />
                                        <button type="submit" className="btn btn-primary btn-floating mt-4"
                                                onClick={() => {
                                                    handleVisitationClick(bookedDate, applicant)
                                                    handleCloseBookVisitation()
                                                }}>
                                            Book
                                        </button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    }

                    // Modal for canceling visitation
                    if (applicant.status === "I_PROCESS") {
                        returnTd =
                            <div>
                                {applicant.status.replace("_", " ")}
                                <button className="btn outline mb-2 ms-1 better-icon-size" onClick={() => {
                                    const confirmBox = window.confirm(
                                        "Godkend visitation?"
                                    );
                                    if (confirmBox === true) {
                                        handleConfirmVisitationClick(applicant);
                                    }

                                }}>
                                    <CiCircleCheck/>
                                </button>
                                <button className="btn outline mb-2 better-icon-size"
                                        onClick={handleOpenCancelVisitation}>
                                    <CiNoWaitingSign/>
                                </button>
                                <Modal
                                    open={openCancelVisitation}
                                    onClose={handleCloseCancelVisitation}
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
                                                type="text"
                                                required="required"
                                                name="reason"
                                                onChange={handleCancelVisitationChange}
                                                value={reason}
                                            />
                                            <button type="submit" className="btn btn-primary btn-floating mt-4"
                                                    onClick={() => {
                                                        handleCancelVisitationClick(reason, applicant)
                                                        handleCloseCancelVisitation()
                                                    }}>
                                                Aflys visitering
                                            </button>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                    }
                    return returnTd
                })()}
            </td>
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
                    <button className="btn btn-warning btn-floating"
                    onClick={() => navigate("/klient/" + applicant.id)}>
                        <CiViewList />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ApplicantTableReadOnly;
