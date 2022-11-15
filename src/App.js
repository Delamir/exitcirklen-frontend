import {Routes, Route} from "react-router-dom";
import ApplicantForm from "./components/ApplicantForm";
import Navbar from "./components/Navbar";
import ClientTable from "./components/ClientTable";

function App() {
    return (
        <>
            <Navbar>

            </Navbar>

            <Routes>
                <Route path="/tilmeld" element={<ApplicantForm/>}/>
                <Route path="/klientoversigt" element={<ClientTable/>} />
            </Routes>

        </>
    );
}

export default App;
