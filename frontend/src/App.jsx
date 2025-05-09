import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DoctorList from "./components/DoctorList";
import PatientList from "./components/PatientList";
import AppointmentList from "./components/AppointmentList";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/doctors">Doctors</Link>
                        </li>
                        <li>
                            <Link to="/patients">Patients</Link>
                        </li>
                        <li>
                            <Link to="/appointments">Appointments</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route
                        path="/"
                        element={<h2>Home - Welcome to the Clinic</h2>}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
