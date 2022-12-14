import {CiFloppyDisk} from "react-icons/ci";
import React, {useEffect, useState} from "react";
import FetchService from "../../services/FetchService";

function ApplicantTableEditRows({
                                    editFormData,
                                    handleEditFormChange,
                                    handleEditFormSubmit,
                                    handleCancelClick,
                                    cityList
                                }) {

    const [status, setStatus] = useState([])


    const fetchService = new FetchService();

    useEffect(() => {
        fetchService.fetchApplicantStatus().then((response) => {
            setStatus(response.data)
        })
    }, [])


    console.log(editFormData.city)

    return (
        <tr>
            <td>
                <select className="form-control"
                        required="required"
                        name="city"
                        onChange={handleEditFormChange}>
                    {cityList?.map((city, index) => {
                        if (city.id === editFormData.city.id) {
                            return <option value={index} key={city.id} selected>{city.name}</option>
                        }
                        return <option value={index} key={city.id}>{city.name}</option>
                    })
                    }
                </select>
            </td>
            <td>
                {editFormData.group?.name}
            </td>
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
                    type="datetime-local"
                    required="required"
                    name="lastChanged"
                    value={editFormData.lastChanged}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className="form-control"
                    type="text"
                    required="required"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <select className="form-control"
                        required="required"
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditFormChange}>
                    {status?.map((statuses, index) => (
                        <option value={statuses} key={index}>{statuses.replace("_", " ")}</option>
                    ))}
                </select>
            </td>
            <td className="d-flex gap-3 justify-content-center text-nowrap">
                <button
                    type="submit"
                    className="btn btn-success btn-floating"
                    onClick={(event) => handleEditFormSubmit(event)}
                >
                    <CiFloppyDisk/>
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

export default ApplicantTableEditRows;
