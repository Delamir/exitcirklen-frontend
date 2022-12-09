import React from "react";


const CityTableEditRows = ({
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
                    name="name"
                    value={editFormData.name}
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
}

export default CityTableEditRows;