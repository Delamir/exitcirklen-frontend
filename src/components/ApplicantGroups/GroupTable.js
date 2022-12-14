import GenericTable from "../Generics/GenericTable";
import Container from "react-bootstrap/Container";
import {Fragment, useEffect, useState} from "react";
import GroupTableReadOnly from "./GroupTableReadOnly";
import GroupTableEditRows from "./GroupTableEditRows";
import {useNavigate} from "react-router-dom";
import FetchService from "../../services/FetchService";

function GroupTable() {

    const navigate = useNavigate();

    const headers = [
        "By",
        "Adresse",
        "Gruppe Navn",
        "Hold Størrelse",
        "Ledige Pladser",
        "Pris",
        "Datoer for start",
        <>
            <span className="d-flex flex-row-reverse">
                <button onClick={() => navigate("/opret-gruppe")}
                        type="button"
                        className="btn btn-create text-white text-left"
                >
                    + Opret gruppe
                </button>
            </span>
        </>,
    ];

    const [cursor, setCursor] = useState("pointer");
    const [editApplicantGroupId, setEditApplicantGroupId] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [applicantGroups, setApplicantGroups] = useState([]);
    const [editFormData, setEditFormData] = useState({
        city: "",
        address: "",
        name: "",
        groupSize: "",
        availableSpots: "",
        price: "",
        startDate: "",
    });

    const fetchService = new FetchService();

    useEffect(() => {
        fetchTableData();
    }, []);

    useEffect(() => {
        fetchService.fetchCities().then((response) => {
            setCityList(response.data)
        })
    }, [])


    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");

        let fieldValue = event.target.value;
        if(fieldName === "city") {
            fieldValue = cityList[event.target.value]
        }

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedApplicantGroup = {
            city: editFormData.city,
            address: editFormData.address,
            name: editFormData.name,
            groupSize: editFormData.groupSize,
            availableSpots: editFormData.availableSpots,
            price: editFormData.price,
            startDate: editFormData.startDate,
        };
        setCursor("wait");
        fetchService.fetchPatchApplicantGroup(editFormData.id, editedApplicantGroup)
            .then(fetchTableData)
            .catch((error) => console.log(error));
        setEditApplicantGroupId(null);
    };

    const handleDeleteClick = (e, applicantGroup) => {
        setCursor("wait");
        fetchService.fetchDeleteApplicantGroup(applicantGroup.id)
            .then(fetchTableData);

    };


    const handleEditClick = (event, applicantGroup) => {
        event.preventDefault();
        setEditApplicantGroupId(applicantGroup.id);

        const formValues = {
            id: applicantGroup.id,
            city: applicantGroup.city,
            address: applicantGroup.address,
            name: applicantGroup.name,
            groupSize: applicantGroup.groupSize,
            availableSpots: applicantGroup.groupSize - applicantGroup.inviteList.length,
            price: applicantGroup.price,
            startDate: applicantGroup.startDate,
        };

        setCursor("wait");
        fetchTableData();
        setEditFormData(formValues);
    };

    const handleInviteClick = (e, applicantGroup) => {
        e.preventDefault();
        navigate(`/gruppe/${applicantGroup.id}`);
    };

    const fetchTableData = () => {
        fetchService.fetchApplicantGroups().then((applicantGroups) => {
            setCursor("pointer");
            setApplicantGroups(applicantGroups.data);
            console.log(applicantGroups);
        });
    };

    const handleCancelClick = () => {
        setEditApplicantGroupId(null);
        setCursor("wait");
        fetchTableData();
    };

    return (
        <form>
            <Container style={{"cursor" : cursor}} className="mt-5">
                <h1>Gruppeoversigt</h1>
                <GenericTable headers={headers}>
                    {applicantGroups?.map((applicantGroup) => (
                        <Fragment key={applicantGroup.id}>
                            {editApplicantGroupId === applicantGroup.id ? (
                                <GroupTableEditRows
                                    editFormData={editFormData}
                                    handleEditFormChange={handleEditFormChange}
                                    handleEditFormSubmit={handleEditFormSubmit}
                                    handleCancelClick={handleCancelClick}
                                    cityList={cityList}
                                />
                            ) : (
                                <GroupTableReadOnly
                                    applicantGroup={applicantGroup}
                                    handleDeleteClick={handleDeleteClick}
                                    handleEditClick={handleEditClick}
                                    handleInviteClick={handleInviteClick}
                                />
                            )}
                        </Fragment>
                    ))}
                </GenericTable>
            </Container>
        </form>
    );
}

export default GroupTable;
