import React, { useState, useEffect } from "react";
import {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} from "../services/api";
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
    Paper,
    Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [editingDoctor, setEditingDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await getDoctors();
            setDoctors(data || []); // Ensure doctors is always an array
        } catch (error) {
            console.error("Failed to fetch doctors:", error);
            setDoctors([]); // Set to empty array on error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDoctor) {
                await updateDoctor(editingDoctor.id, { name, specialty });
            } else {
                await createDoctor({ name, specialty });
            }
            fetchDoctors();
            setName("");
            setSpecialty("");
            setEditingDoctor(null);
        } catch (error) {
            console.error("Failed to save doctor:", error);
        }
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setName(doctor.name);
        setSpecialty(doctor.specialty);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoctor(id);
            fetchDoctors();
        } catch (error) {
            console.error("Failed to delete doctor:", error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Manage Doctors
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ marginBottom: 3 }}
                >
                    <Grid container spacing={2} alignItems="flex-start">
                        {" "}
                        {/* Changed alignItems to flex-start for better layout with potential error messages */}
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="Doctor Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="Specialty"
                                variant="outlined"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={
                                    editingDoctor ? <EditIcon /> : <AddIcon />
                                }
                                sx={{ height: "56px" }} // Match TextField height if they are standard variant
                            >
                                {editingDoctor ? "Update" : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {doctors.length === 0 ? (
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        No doctors found. Add a new doctor to get started.
                    </Typography>
                ) : (
                    <List>
                        {doctors.map((doctor) => (
                            <ListItem
                                key={doctor.id}
                                divider
                                sx={{
                                    backgroundColor:
                                        editingDoctor &&
                                        editingDoctor.id === doctor.id
                                            ? "action.hover"
                                            : "transparent",
                                    borderRadius: 1,
                                    mb: 1,
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={doctor.name}
                                    secondary={doctor.specialty}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => handleEdit(doctor)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDelete(doctor.id)}
                                        color="error"
                                        sx={{ ml: 1 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
}

export default DoctorList;
