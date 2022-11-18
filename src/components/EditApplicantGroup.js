import React from "react";

const EditApplicantGroup = () => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Skriv en by..."
                    name="city"/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Skriv en adresse..."
                       name="address"/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Skriv et navn..."
                       name="name"/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Skriv en gruppe størrelse..."
                       name="groupSize"/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Skriv et antale ledige pladser..."
                       name="availableSpots"/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Skriv en pris..."
                       name="price"/>
            </td>
            <td>
                <input type="text"
                       required="required"
                       placeholder="Skriv en dato for start..."
                       name="startDate"/>
            </td>
        </tr>
    )
}

export default EditApplicantGroup