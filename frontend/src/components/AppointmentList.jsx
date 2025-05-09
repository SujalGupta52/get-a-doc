import React, { useState, useEffect } from "react";
import {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getDoctors,
    getPatients,
} from "../services/api";

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [status, setStatus] = useState("SCHEDULED"); // Default status
    const [editingAppointment, setEditingAppointment] = useState(null);

    useEffect(() => {
        fetchAppointments();
        fetchDoctorsAndPatients();
    }, []);

    const fetchAppointments = async () => {
        const data = await getAppointments();
        setAppointments(data);
    };

    const fetchDoctorsAndPatients = async () => {
        const doctorsData = await getDoctors();
        const patientsData = await getPatients();
        setDoctors(doctorsData);
        setPatients(patientsData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointmentData = {
            doctorId,
            patientId,
            appointmentTime,
            status,
        };
        if (editingAppointment) {
            await updateAppointment(editingAppointment.id, {
                appointmentTime,
                status,
            });
        } else {
            await createAppointment(appointmentData);
        }
        fetchAppointments();
        setDoctorId("");
        setPatientId("");
        setAppointmentTime("");
        setStatus("SCHEDULED");
        setEditingAppointment(null);
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        setDoctorId(appointment.doctorId);
        setPatientId(appointment.patientId);
        setAppointmentTime(
            new Date(appointment.appointmentTime).toISOString().slice(0, 16)
        );
        setStatus(appointment.status);
    };

    const handleDelete = async (id) => {
        await deleteAppointment(id);
        fetchAppointments();
    };

    const getDoctorName = (id) =>
        doctors.find((doc) => doc.id === id)?.name || "Unknown Doctor";
    const getPatientName = (id) =>
        patients.find((pat) => pat.id === id)?.name || "Unknown Patient";

    return (
        <div>
            <h2>Appointments</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required
                    disabled={!!editingAppointment}
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
                <select
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                    disabled={!!editingAppointment}
                >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.name}
                        </option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
                <button type="submit">
                    {editingAppointment
                        ? "Update Appointment"
                        : "Add Appointment"}
                </button>
            </form>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        Dr. {getDoctorName(appointment.doctorId)} with{" "}
                        {getPatientName(appointment.patientId)}
                        at{" "}
                        {new Date(
                            appointment.appointmentTime
                        ).toLocaleString()}{" "}
                        - Status: {appointment.status}
                        <button onClick={() => handleEdit(appointment)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(appointment.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AppointmentList;
