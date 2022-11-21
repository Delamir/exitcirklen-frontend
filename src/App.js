import {Routes, Route} from "react-router-dom";
import ApplicantForm from "./components/ApplicantForm";
import Navbar from "./components/Navbar";
import ApplicantTable from "./components/ApplicantTable";
import GroupTable from "./components/GroupTable";

function App() {
    return (
        <>
            <Navbar>

            </Navbar>

            <Routes>
                <Route path="/tilmeld" element={<ApplicantForm/>}/>
                <Route path="/klientoversigt" element={<ApplicantTable/>} />
                <Route path="/gruppeoversigt" element={<GroupTable/>} />
            </Routes>

        </>
    );
}

export default App;
