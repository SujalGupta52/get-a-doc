import React, { useState, useEffect } from "react";
import {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} from "../services/api";

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [editingDoctor, setEditingDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const data = await getDoctors();
        setDoctors(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingDoctor) {
            await updateDoctor(editingDoctor.id, { name, specialty });
        } else {
            await createDoctor({ name, specialty });
        }
        fetchDoctors();
        setName("");
        setSpecialty("");
        setEditingDoctor(null);
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setName(doctor.name);
        setSpecialty(doctor.specialty);
    };

    const handleDelete = async (id) => {
        await deleteDoctor(id);
        fetchDoctors();
    };

    return (
        <div>
            <h2>Doctors</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    required
                />
                <button type="submit">
                    {editingDoctor ? "Update Doctor" : "Add Doctor"}
                </button>
            </form>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                        <button onClick={() => handleEdit(doctor)}>Edit</button>
                        <button onClick={() => handleDelete(doctor.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DoctorList;
