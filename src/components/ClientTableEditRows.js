import React from "react";

function ClientTableEditRows({editFormData, handleEditFormChange, handleEditFormSubmit, handleCancelClick}) {
    return(
        <tr>
            <td>
                <input type="text"
                       required="required"
                       name="name"
                       value={editFormData.name}
                       onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type="number"
                       required="required"
                       name="age"
                       value={editFormData.age}
                       onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       name="email"
                       value={editFormData.email}
                       onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       name="phoneNumber"
                       value={editFormData.phoneNumber}
                       onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text"
                       required="required"
                       name="status"
                       value={editFormData.status}
                       onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type="datetime-local"
                       required="required"
                       name="lastChanged"
                       value={editFormData.lastChanged}
                       onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       name="city"
                       value={editFormData.city}
                       onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       name="description"
                       value={editFormData.description}
                       onChange={handleEditFormChange}/>
            </td>
            <td className="d-flex gap-3 justify-content-center">
                <button type="submit" className="btn btn-success btn-floating"
                onClick={(event) => handleEditFormSubmit(event)}>
                    Gem
                </button>
                <button type="button" className="btn btn-primary btn-floating"
                onClick={() => handleCancelClick()}>Annuller</button>
            </td>
        </tr>
    )
}

export default ClientTableEditRows