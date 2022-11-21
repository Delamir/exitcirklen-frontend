import { Routes, Route } from "react-router-dom";
import ApplicantForm from "./components/ApplicantForm";
import Navbar from "./components/Navbar";
import ApplicantTable from "./components/ApplicantTable";
import GroupTable from "./components/GroupTable";
import Email from "./components/Email";

function App() {
    return (
        <>
            <Navbar></Navbar>

            <Routes>
                <Route path="/tilmeld" element={<ApplicantForm/>}/>
                <Route path="/klientoversigt" element={<ApplicantTable/>} />
                <Route path="/gruppeoversigt" element={<GroupTable/>} />
                <Route path="/testtest" element={<Email />} />

            </Routes>
        </>
    );
}

export default App;
