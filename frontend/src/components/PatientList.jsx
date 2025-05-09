import React, { useState, useEffect } from "react";
import {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient,
} from "../services/api";

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingPatient, setEditingPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        const data = await getPatients();
        setPatients(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingPatient) {
            await updatePatient(editingPatient.id, { name, email });
        } else {
            await createPatient({ name, email });
        }
        fetchPatients();
        setName("");
        setEmail("");
        setEditingPatient(null);
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setName(patient.name);
        setEmail(patient.email);
    };

    const handleDelete = async (id) => {
        await deletePatient(id);
        fetchPatients();
    };

    return (
        <div>
            <h2>Patients</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">
                    {editingPatient ? "Update Patient" : "Add Patient"}
                </button>
            </form>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.name} - {patient.email}
                        <button onClick={() => handleEdit(patient)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(patient.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PatientList;
