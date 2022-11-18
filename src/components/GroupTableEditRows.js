import React from "react";

const GroupTableEditRows = ({
    editFormData,
    handleEditFormChange,
    handleEditFormSubmit,
    handleCancelClick,
}) => {
    return (
        <tr>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    placeholder="Skriv en by..."
                    name="city"
                    value={editFormData.city}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    placeholder="Skriv en adresse..."
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    placeholder="Skriv et navn..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="number"
                    required="required"
                    placeholder="Skriv en gruppe størrelse..."
                    name="groupSize"
                    value={editFormData.groupSize}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    placeholder="Skriv et antal ledige pladser..."
                    name="availableSpots"
                    value={editFormData.availableSpots}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    placeholder="Skriv en pris..."
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="datetime-local"
                    required="required"
                    placeholder="Skriv en dato for start..."
                    name="startDate"
                    value={editFormData.startDate}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className="d-flex gap-3 justify-content-center">
                <button
                    type="submit"
                    className="btn btn-success btn-floating"
                    onClick={(event) => handleEditFormSubmit(event)}
                >
                    Gem
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-floating"
                    onClick={() => handleCancelClick()}
                >
                    Annuller
                </button>
            </td>
        </tr>
    );
};

export default GroupTableEditRows;
