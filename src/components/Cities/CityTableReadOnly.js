import {CiEdit, CiTrash, CiViewList} from "react-icons/ci";
import React from "react";


const CityTableReadOnly =  ({ city, handleDeleteClick, handleEditClick, }) => {

    return (
        <tr key={city.id}>
            <td>{city.name}</td>
            <td>{city.address}</td>
            <td className="d-flex gap-3 justify-content-center">
                <button
                    type="button"
                    className="btn btn-success btn-floating"
                    onClick={(event) => handleEditClick(event, city)}
                >
                    <CiEdit/>
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-floating"
                    onClick={(event) => handleDeleteClick(event, city.id)}
                >
                    <CiTrash/>
                </button>
            </td>
        </tr>
    );
};

export default CityTableReadOnly;