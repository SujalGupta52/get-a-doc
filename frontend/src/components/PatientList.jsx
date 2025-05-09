import React, { useState, useEffect } from "react";
import {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient,
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
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingPatient, setEditingPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const data = await getPatients();
            setPatients(data || []); // Ensure patients is always an array
        } catch (error) {
            console.error("Failed to fetch patients:", error);
            setPatients([]); // Set to empty array on error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPatient) {
                await updatePatient(editingPatient.id, { name, email });
            } else {
                await createPatient({ name, email });
            }
            fetchPatients();
            setName("");
            setEmail("");
            setEditingPatient(null);
        } catch (error) {
            console.error("Failed to save patient:", error);
        }
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setName(patient.name);
        setEmail(patient.email);
    };

    const handleDelete = async (id) => {
        try {
            await deletePatient(id);
            fetchPatients();
        } catch (error) {
            console.error("Failed to delete patient:", error);
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
                    Manage Patients
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ marginBottom: 3 }}
                >
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="Patient Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <PersonIcon
                                            sx={{
                                                mr: 1,
                                                color: "action.active",
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <EmailIcon
                                            sx={{
                                                mr: 1,
                                                color: "action.active",
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={
                                    editingPatient ? <EditIcon /> : <AddIcon />
                                }
                                sx={{ height: "56px" }} // Match TextField height
                            >
                                {editingPatient ? "Update" : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {patients.length === 0 ? (
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        No patients found. Add a new patient to get started.
                    </Typography>
                ) : (
                    <List>
                        {patients.map((patient) => (
                            <ListItem
                                key={patient.id}
                                divider
                                sx={{
                                    backgroundColor:
                                        editingPatient &&
                                        editingPatient.id === patient.id
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
                                    primary={patient.name}
                                    secondary={patient.email}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => handleEdit(patient)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDelete(patient.id)}
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

export default PatientList;
