import React, { useState, useEffect } from "react";
import {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getDoctors,
    getPatients,
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [status, setStatus] = useState("SCHEDULED");
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchAppointments(), fetchDoctorsAndPatients()]);
            setLoading(false);
        };
        loadData();
    }, []);

    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
            setAppointments([]);
        }
    };

    const fetchDoctorsAndPatients = async () => {
        try {
            const doctorsData = await getDoctors();
            const patientsData = await getPatients();
            setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
            setPatients(Array.isArray(patientsData) ? patientsData : []);
        } catch (error) {
            console.error("Failed to fetch doctors or patients:", error);
            setDoctors([]);
            setPatients([]);
        }
    };

    const resetForm = () => {
        setDoctorId("");
        setPatientId("");
        setAppointmentTime("");
        setStatus("SCHEDULED");
        setEditingAppointment(null);
        setFormError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (!doctorId || !patientId || !appointmentTime) {
            setFormError(
                "All fields except status are required for new appointments."
            );
            return;
        }

        const appointmentData = {
            doctor: { id: parseInt(doctorId) },
            patient: { id: parseInt(patientId) },
            appointmentTime,
            status,
        };

        try {
            if (editingAppointment) {
                await updateAppointment(editingAppointment.id, {
                    appointmentTime,
                    status,
                });
            } else {
                await createAppointment(appointmentData);
            }
            fetchAppointments();
            resetForm();
        } catch (error) {
            console.error("Failed to save appointment:", error);
            setFormError(
                "Failed to save appointment. Please check console for details."
            );
        }
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        setDoctorId(appointment.doctor ? String(appointment.doctor.id) : "");
        setPatientId(appointment.patient ? String(appointment.patient.id) : "");
        const localDateTime = new Date(appointment.appointmentTime)
            .toISOString()
            .slice(0, 16);
        setAppointmentTime(localDateTime);
        setStatus(appointment.status);
        setFormError("");
    };

    const handleDelete = async (id) => {
        try {
            await deleteAppointment(id);
            fetchAppointments();
        } catch (error) {
            console.error("Failed to delete appointment:", error);
        }
    };

    const getDoctorName = (id) =>
        doctors.find((doc) => doc.id === parseInt(id))?.name ||
        "Unknown Doctor";
    const getPatientName = (id) =>
        patients.find((pat) => pat.id === parseInt(id))?.name ||
        "Unknown Patient";

    const getStatusIcon = (currentStatus) => {
        switch (currentStatus) {
            case "SCHEDULED":
                return (
                    <ScheduleIcon
                        color="primary"
                        sx={{ verticalAlign: "middle", mr: 0.5 }}
                    />
                );
            case "COMPLETED":
                return (
                    <CheckCircleOutlineIcon
                        color="success"
                        sx={{ verticalAlign: "middle", mr: 0.5 }}
                    />
                );
            case "CANCELLED":
                return (
                    <CancelIcon
                        color="error"
                        sx={{ verticalAlign: "middle", mr: 0.5 }}
                    />
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Manage Appointments
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ marginBottom: 4 }}
                >
                    {formError && (
                        <Typography color="error" align="center" gutterBottom>
                            {formError}
                        </Typography>
                    )}
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={3}>
                            <FormControl
                                fullWidth
                                required
                                disabled={!!editingAppointment}
                            >
                                <InputLabel id="doctor-select-label">
                                    Doctor
                                </InputLabel>
                                <Select
                                    labelId="doctor-select-label"
                                    value={doctorId}
                                    label="Doctor"
                                    onChange={(e) =>
                                        setDoctorId(e.target.value)
                                    }
                                    startAdornment={
                                        <MedicalServicesIcon
                                            sx={{
                                                mr: 1,
                                                color: "action.active",
                                            }}
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>Select Doctor</em>
                                    </MenuItem>
                                    {doctors.map((doctor) => (
                                        <MenuItem
                                            key={doctor.id}
                                            value={String(doctor.id)}
                                        >
                                            {doctor.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl
                                fullWidth
                                required
                                disabled={!!editingAppointment}
                            >
                                <InputLabel id="patient-select-label">
                                    Patient
                                </InputLabel>
                                <Select
                                    labelId="patient-select-label"
                                    value={patientId}
                                    label="Patient"
                                    onChange={(e) =>
                                        setPatientId(e.target.value)
                                    }
                                    startAdornment={
                                        <GroupIcon
                                            sx={{
                                                mr: 1,
                                                color: "action.active",
                                            }}
                                        />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>Select Patient</em>
                                    </MenuItem>
                                    {patients.map((patient) => (
                                        <MenuItem
                                            key={patient.id}
                                            value={String(patient.id)}
                                        >
                                            {patient.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Appointment Time"
                                type="datetime-local"
                                value={appointmentTime}
                                onChange={(e) =>
                                    setAppointmentTime(e.target.value)
                                }
                                required
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    startAdornment: (
                                        <EventIcon
                                            sx={{
                                                mr: 1,
                                                color: "action.active",
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth required>
                                <InputLabel id="status-select-label">
                                    Status
                                </InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                    startAdornment={getStatusIcon(status)}
                                >
                                    <MenuItem value="SCHEDULED">
                                        <ScheduleIcon
                                            sx={{
                                                verticalAlign: "middle",
                                                mr: 1,
                                            }}
                                        />
                                        Scheduled
                                    </MenuItem>
                                    <MenuItem value="COMPLETED">
                                        <CheckCircleOutlineIcon
                                            sx={{
                                                verticalAlign: "middle",
                                                mr: 1,
                                            }}
                                        />
                                        Completed
                                    </MenuItem>
                                    <MenuItem value="CANCELLED">
                                        <CancelIcon
                                            sx={{
                                                verticalAlign: "middle",
                                                mr: 1,
                                            }}
                                        />
                                        Cancelled
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={1}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={
                                    editingAppointment ? (
                                        <EditIcon />
                                    ) : (
                                        <AddIcon />
                                    )
                                }
                                sx={{ height: "56px" }}
                            >
                                {editingAppointment ? "Update" : "Add"}
                            </Button>
                        </Grid>
                        {editingAppointment && (
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={resetForm}
                                    sx={{ mt: { xs: 1, md: 0 } }}
                                >
                                    Cancel Edit
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                {appointments.length === 0 && !loading ? (
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        sx={{ mt: 3 }}
                    >
                        No appointments found. Schedule a new appointment to get
                        started.
                    </Typography>
                ) : (
                    <List>
                        {appointments
                            .sort(
                                (a, b) =>
                                    new Date(b.appointmentTime) -
                                    new Date(a.appointmentTime)
                            )
                            .map((appointment) => (
                                <ListItem
                                    key={appointment.id}
                                    divider
                                    sx={{
                                        backgroundColor:
                                            editingAppointment &&
                                            editingAppointment.id ===
                                                appointment.id
                                                ? "action.hover"
                                                : "transparent",
                                        borderRadius: 1,
                                        mb: 1,
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                        },
                                        display: "flex",
                                        flexDirection: {
                                            xs: "column",
                                            sm: "row",
                                        },
                                        alignItems: {
                                            xs: "flex-start",
                                            sm: "center",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primaryTypographyProps={{
                                            fontWeight: "medium",
                                        }}
                                        primary={`Dr. ${
                                            appointment.doctor
                                                ? appointment.doctor.name
                                                : "Unknown Doctor"
                                        } with ${
                                            appointment.patient
                                                ? appointment.patient.name
                                                : "Unknown Patient"
                                        }`}
                                        secondary={
                                            <>
                                                {new Date(
                                                    appointment.appointmentTime
                                                ).toLocaleString([], {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                                <br />
                                                Status:{" "}
                                                {getStatusIcon(
                                                    appointment.status
                                                )}{" "}
                                                <strong>
                                                    {appointment.status}
                                                </strong>
                                            </>
                                        }
                                    />
                                    <ListItemSecondaryAction
                                        sx={{
                                            position: {
                                                xs: "static",
                                                sm: "absolute",
                                            },
                                            right: { sm: 16 },
                                            mt: { xs: 1, sm: 0 },
                                            transform: {
                                                xs: "none",
                                                sm: "translateY(-50%)",
                                            },
                                            top: { sm: "50%" },
                                        }}
                                    >
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() =>
                                                handleEdit(appointment)
                                            }
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                handleDelete(appointment.id)
                                            }
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

export default AppointmentList;
