const API_URL = "http://localhost:8080";

// Doctor API calls
export const getDoctors = () =>
    fetch(`${API_URL}/doctors`).then((res) => res.json());
export const getDoctorById = (id) =>
    fetch(`${API_URL}/doctors/${id}`).then((res) => res.json());
export const createDoctor = (doctor) =>
    fetch(`${API_URL}/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
    }).then((res) => res.json());
export const updateDoctor = (id, doctor) =>
    fetch(`${API_URL}/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
    }).then((res) => res.json());
export const deleteDoctor = (id) =>
    fetch(`${API_URL}/doctors/${id}`, { method: "DELETE" });

// Patient API calls
export const getPatients = () =>
    fetch(`${API_URL}/patients`).then((res) => res.json());
export const getPatientById = (id) =>
    fetch(`${API_URL}/patients/${id}`).then((res) => res.json());
export const createPatient = (patient) =>
    fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
    }).then((res) => res.json());
export const updatePatient = (id, patient) =>
    fetch(`${API_URL}/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
    }).then((res) => res.json());
export const deletePatient = (id) =>
    fetch(`${API_URL}/patients/${id}`, { method: "DELETE" });

// Appointment API calls
export const getAppointments = () =>
    fetch(`${API_URL}/appointments`).then((res) => res.json());
export const getAppointmentById = (id) =>
    fetch(`${API_URL}/appointments/${id}`).then((res) => res.json());
export const createAppointment = (appointment) =>
    fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
    }).then((res) => res.json());
export const updateAppointment = (id, appointment) =>
    fetch(`${API_URL}/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
    }).then((res) => res.json());
export const deleteAppointment = (id) =>
    fetch(`${API_URL}/appointments/${id}`, { method: "DELETE" });
export const getDoctorAppointments = (doctorId) =>
    fetch(`${API_URL}/appointments/doctor/${doctorId}`).then((res) =>
        res.json()
    );
export const getPatientAppointments = (patientId) =>
    fetch(`${API_URL}/appointments/patient/${patientId}`).then((res) =>
        res.json()
    );
export const getDoctorSchedule = (doctorId, start, end) =>
    fetch(
        `${API_URL}/appointments/doctor/${doctorId}/schedule?start=${start}&end=${end}`
    ).then((res) => res.json());
export const getPatientSchedule = (patientId, start, end) =>
    fetch(
        `${API_URL}/appointments/patient/${patientId}/schedule?start=${start}&end=${end}`
    ).then((res) => res.json());
