import { Routes, Route } from "react-router-dom";
import ApplicantForm from "./components/Applicants/ApplicantForm";
import Navbar from "./components/Generics/Navbar";
import ApplicantTable from "./components/Applicants/ApplicantTable";
import GroupTable from "./components/ApplicantGroups/GroupTable";
import Survey from "./components/Survey";
import Group from "./components/ApplicantGroups/Group";
import GroupForm from "./components/ApplicantGroups/GroupForm";
import EmployeeTable from "./components/Employees/EmployeeTable";
import EmployeeForm from "./components/Employees/EmployeeForm";
import Login from "./components/auth/Login";
import { useEffect } from "react";
import AuthService from "./services/auth.service";
import Test from "./components/Test";
import Applicant from "./components/Applicants/Applicant";
import CityForm from "./components/Cities/CityForm";
import CityTable from "./components/Cities/CityTable";
import axios from "axios";
import {
    MsalProvider,
    useMsal,
    useMsalAuthentication,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { useState } from "react";
import { loginRequest } from "./configs/authConfig";

const Pages = () => {
    const { instance } = useMsal();
    const msalAuth = useMsalAuthentication(InteractionType.Redirect, {
        scopes: loginRequest.scopes,
    });
    const [token, setToken] = useState();

    useEffect(() => {
        console.log(msalAuth, "msal");
        if (!token) {
            if (msalAuth?.result) {
                setToken(msalAuth.result.accessToken);
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + msalAuth.result.accessToken;
                axios
                    .get("/applicants")
                    .then((res) => console.log("res", res))
                    .catch((err) => console.log("err", err));
            } else if (msalAuth?.acquireToken) {
                msalAuth.acquireToken().then((res) => {
                    setToken(res.accessToken);
                    axios.defaults.headers.common["Authorization"] =
                        "Bearer " + res.accessToken;
                });
            }
        }
    }, [msalAuth]);
    if (token) {
        console.log("HAS TOKEN", token);
        return (
            <>
                <Navbar />

                <Routes>
                    {/*<Route path="/" element={handleFrontPageRoute(employee.roles[0])} />*/}
                    <Route path="/klient/:id" element={<Applicant />} />
                    <Route
                        path="/opret-medarbejder"
                        element={<EmployeeForm />}
                    />
                    <Route
                        path="/medarbejderoversigt"
                        element={<EmployeeTable />}
                    />
                    <Route path="/opret-gruppe" element={<GroupForm />} />
                    <Route path="/tilmeld" element={<ApplicantForm />} />
                    <Route
                        path="/klientoversigt"
                        element={<ApplicantTable />}
                    />
                    <Route path="/gruppeoversigt" element={<GroupTable />} />
                    <Route path="/byoversigt" element={<CityTable />} />
                    <Route path="/opret-by" element={<CityForm />} />
                    <Route path="/testtest" element={<Test />} />
                    <Route path="/survey/:id" element={<Survey />} />
                    <Route path="/gruppe/:id" element={<Group />} />
                </Routes>
            </>
        );
    } else {
        return <></>;
    }
};

function App({ instance }) {
    /*
    const handleFrontPageRoute = (employeeRole) => {
        if (employeeRole === "GRUPPEANSVARLIG") {
            return <GroupTable/>
        } else {
            return <ApplicantTable/>
        }
    }
    
*/
    return (
        <MsalProvider instance={instance}>
            <Pages />
        </MsalProvider>
    );
}

export default App;
