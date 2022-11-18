import React from "react";

function ClientTableEditRows() {
    return(
        <tr>
            <td>
                <input type="text" required="required" name="name" />
            </td>
            <td>
                <input type="number" required="required" name="age" />
            </td>
            <td>
                <input type="text" required="required" name="email" />
            </td>
            <td>
                <input type="text" required="required" name="phoneNumber" />
            </td>
            <td>
                <input type="text" required="required" name="status" />
            </td>
            <td>
                <input type="datetime-local" required="required" name="lastChanged" />
            </td>
            <td>
                <input type="text" required="required" name="city" />
            </td>
            <td>
                <input type="text" required="required" name="description" />
            </td>
            <td>
                <button>Kosten</button>
            </td>
        </tr>
    )
}

export default ClientTableEditRows