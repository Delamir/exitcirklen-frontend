import { Routes, Route } from "react-router-dom";
import ApplicantForm from "./components/ApplicantForm";
import Navbar from "./components/Navbar";
import ApplicantTable from "./components/ApplicantTable";
import GroupTable from "./components/GroupTable";
import Email from "./components/Email";
import Survey from "./components/Survey";
import Group from "./components/Group";
import GroupForm from "./components/GroupForm";

function App() {
    return (
        <>
            <Navbar></Navbar>

            <Routes>
                <Route path="/opret-gruppe" element={<GroupForm/>}/>
                <Route path="/tilmeld" element={<ApplicantForm/>}/>
                <Route path="/klientoversigt" element={<ApplicantTable/>} />
                <Route path="/gruppeoversigt" element={<GroupTable/>} />
                <Route path="/testtest" element={<Email />} />
                <Route path="/survey/:id" element={<Survey />} />
                <Route path="/gruppe/:id" element={<Group />} />
            </Routes>
        </>
    );
}

export default App;
