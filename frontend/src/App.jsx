import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Box,
    Container,
} from "@mui/material";
import Navbar from "./components/NavBar"; // Corrected import path
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import DoctorList from "./components/DoctorList";
import PatientList from "./components/PatientList";
import AppointmentList from "./components/AppointmentList";
import "./App.css";

// Create a basic theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // A standard blue
            light: "#e3f2fd", // A light blue for backgrounds or highlights
            dark: "#0d47a1", // A darker blue for text or accents
        },
        secondary: {
            main: "#dc004e", // A standard pink/magenta
        },
        background: {
            default: "#f4f6f8", // Light grey background for the app
            paper: "#ffffff", // White for Paper components
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Slightly more rounded buttons
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // More rounded paper elements
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                    }}
                >
                    <Navbar />
                    <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/doctors" element={<DoctorList />} />
                            <Route path="/patients" element={<PatientList />} />
                            <Route
                                path="/appointments"
                                element={<AppointmentList />}
                            />
                        </Routes>
                    </Container>
                    <Footer />
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
