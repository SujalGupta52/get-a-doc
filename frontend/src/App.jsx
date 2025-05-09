import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import { Box } from "@chakra-ui/react";

function App() {
    return (
        <Box>
            <NavBar />
            <Box pt="60px">
                {" "}
                {/* Add padding to prevent content from being hidden behind fixed NavBar */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route
                        path="/appointments"
                        element={<AppointmentsPage />}
                    />
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
