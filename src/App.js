import { Routes, Route } from "react-router-dom";
import ApplicantForm from "./components/Applicants/ApplicantForm";
import Navbar from "./components/Generics/Navbar";
import ApplicantTable from "./components/Applicants/ApplicantTable";
import GroupTable from "./components/ApplicantGroups/GroupTable";
import Email from "./components/Email";
import Survey from "./components/Survey";
import Group from "./components/ApplicantGroups/Group";
import GroupForm from "./components/ApplicantGroups/GroupForm";
import Applicant from "./components/Applicants/Applicant";

function App() {
    return (
        <>
            <Navbar></Navbar>

            <Routes>
                <Route path="/opret-gruppe" element={<GroupForm/>}/>
                <Route path="/tilmeld" element={<ApplicantForm/>}/>
                <Route path="/klientoversigt" element={<ApplicantTable/>} />
                <Route path="/gruppeoversigt" element={<GroupTable/>} />
                <Route path="/testtest" element={<Applicant />} />
                <Route path="/survey/:id" element={<Survey />} />
                <Route path="/gruppe/:id" element={<Group />} />
            </Routes>
        </>
    );
}

export default App;
