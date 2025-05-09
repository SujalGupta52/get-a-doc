import React from "react";
import { Container, Typography, Button, Box, Paper, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function HomePage() {
    return (
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
            <Paper
                elevation={3}
                sx={{ padding: 4, backgroundColor: "primary.lightest" }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    color="primary.dark"
                >
                    Welcome to Your Clinic Management
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Efficiently manage doctor schedules, patient records, and
                    appointments all in one place.
                </Typography>
                <Box
                    sx={{
                        marginTop: 4,
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/doctors"
                        size="large"
                        startIcon={<LocalHospitalIcon />}
                    >
                        Manage Doctors
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={RouterLink}
                        to="/patients"
                        size="large"
                        startIcon={<PeopleAltIcon />}
                    >
                        Manage Patients
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        component={RouterLink}
                        to="/appointments"
                        size="large"
                        startIcon={<EventAvailableIcon />}
                    >
                        View Appointments
                    </Button>
                </Box>
            </Paper>

            <Grid container spacing={4} sx={{ marginTop: 5 }}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ padding: 3 }}>
                        <LocalHospitalIcon
                            color="primary"
                            sx={{ fontSize: 40, marginBottom: 1 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Our Doctors
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Access a comprehensive list of specialized doctors.
                            Easily add, update, or remove doctor profiles.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ padding: 3 }}>
                        <PeopleAltIcon
                            color="secondary"
                            sx={{ fontSize: 40, marginBottom: 1 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Patient Care
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Maintain detailed patient records. Streamline
                            patient registration and information management.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ padding: 3 }}>
                        <EventAvailableIcon
                            color="action"
                            sx={{ fontSize: 40, marginBottom: 1 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Appointments
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Schedule and manage appointments with ease. View
                            upcoming appointments for doctors and patients.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HomePage;
