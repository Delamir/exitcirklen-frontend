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

function App() {
    useEffect(() => {
        const employee = AuthService.getCurrentUser();

        if (employee) {
            console.log(employee, "logged in");
        } else {
            console.log("no emp");
        }
    }, []);

    if (AuthService.getCurrentUser()) {
        return (
            <>
                <Navbar />

                <Routes>
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
                    <Route path="/testtest" element={<Test />} />
                    <Route path="/survey/:id" element={<Survey />} />
                    <Route path="/gruppe/:id" element={<Group />} />
                </Routes>
            </>
        );
    } else {
        return (
            <>
                <Login />
            </>
        );
    }
}

export default App;
