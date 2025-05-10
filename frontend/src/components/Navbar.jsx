import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <MedicalServicesIcon sx={{ mr: 2 }} />
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Get A Doc
                </Typography>
                <Box>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/doctors"
                    >
                        Doctors
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/patients"
                    >
                        Patients
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/appointments"
                    >
                        Appointments
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
