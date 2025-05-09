import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    Clinic Management System © {new Date().getFullYear()}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    Built with React & Material-UI.
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                ></Typography>
            </Container>
        </Box>
    );
}

export default Footer;
