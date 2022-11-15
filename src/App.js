import { Routes, Route } from "react-router-dom";
import ApplicantForm from "./components/ApplicantForm";

function App() {
    return (
        <Routes>
            <Route path="/tilmeld" element={<ApplicantForm />} />
        </Routes>
    );
}

export default App;
