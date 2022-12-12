import FetchService from "../../services/FetchService";
import {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import GenericTable from "../Generics/GenericTable";
import CityTableEditRows from "./CityTableEditRows";
import CityTableReadOnly from "./CityTableReadOnly";


function CityTable() {

    const navigate = useNavigate();

    const headers =
        [
            "Navn",
            "Address",
            <><span className="d-flex flex-row-reverse">
                <button onClick={() => navigate("/opret-by")} type="button" className=" btn btn-create text-white">+ Opret By</button>
            </span></>
        ];


    const fetchService = new FetchService();
    const [cursor, setCursor] = useState("pointer");
    const [tableData, setTableData] = useState();
    const [editCity, setEditCity] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        address: "",
    });

    useEffect(() => {
        fetchTableData();
    }, []);

    const fetchTableData = () => {
        fetchService.fetchCities().then((response) => {
            setCursor("pointer");
            setTableData(() => response.data);
        });
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
        fetchTableData();
    };

    const handleDeleteClick = (event, cityId) => {
        setCursor("wait");
        fetchService.fetchDeleteCity(Number(cityId))
            .then(fetchTableData);
    };

    const handleEditClick = (event, city) => {
        event.preventDefault();
        setEditCity(city.id);

        const formValues = {
            id: city.id,
            name: city.name,
            address: city.address,
        };
        setCursor("wait");
        setEditFormData(formValues);
        fetchTableData();
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedCity = {
            id: editFormData.id,
            name: editFormData.name,
            address: editFormData.address,
        };
        setCursor("wait");
        fetchService.fetchPutCity(editFormData.id, editedCity)
            .then(fetchTableData)
            .catch((error) => console.log(error));

        setEditCity(null);
    };

    const handleCancelClick = () => {
        setEditCity(null);
        setCursor("wait");
        fetchTableData();
    }


    return (
        <form>
            <Container className="mt-5">
                <h1>Byoversigt</h1>
                <GenericTable headers={headers}>
                    {tableData?.map((city) => (
                        <Fragment key={city.id}>
                            {editCity === city.id ? (
                                <CityTableEditRows
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleEditFormSubmit={handleEditFormSubmit}
                                    handleCancelClick={handleCancelClick}

                                />
                            ) : (
                                <CityTableReadOnly
                                    city={city}
                                    handleDeleteClick={handleDeleteClick}
                                    handleEditClick={handleEditClick}
                                />
                            )}
                        </Fragment>
                    ))}
                </GenericTable>
            </Container>
        </form>
    );
}

export default CityTable;