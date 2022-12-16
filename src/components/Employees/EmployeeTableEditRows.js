import React from "react";
import {useEffect, useState} from "react";
import FetchService from "../../services/FetchService";


const EmployeeTableEditRows = ({
                                   editFormData,
                                   handleEditFormChange,
                                   handleEditFormSubmit,
                                   handleCancelClick,
                                   cityList
                               }) => {

    const [responsibility, setResponsibility] = useState([])
    const fetchService = new FetchService();

    useEffect(() => {
        fetchService.fetchEmployeeResponsibility().then((response) => {
            setResponsibility(response.data)
        })

    })

    return (
        <tr>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
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
                    name="age"
                    value={editFormData.age}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    name="phoneNumber"
                    value={editFormData.phoneNumber}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <select
                    className="form-control"
                    required="required"
                    name="responsibility"
                    value={editFormData.responsibility}
                    onChange={handleEditFormChange}>
                    {responsibility?.map((responsibilities, index) => (
                        <option value={responsibilities} key={index}>{responsibilities}</option>
                    ))}
                </select>
            </td>
            <td>
                <select
                    className="form-control"
                    required="required"
                    name="city"
                    onChange={handleEditFormChange}
                >
                    {cityList?.map((city, index) => {
                        if (city.id === editFormData.city.id) {
                            return <option value={index} key={city.id} selected>{city.name}</option>
                        }
                        return <option value={index} key={city.id}>{city.name}</option>
                    })
                    }
                </select>
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

export default EmployeeTableEditRows;