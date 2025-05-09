package com.webapp.getadoc.repository;

import com.webapp.getadoc.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorIdAndAppointmentTimeBetween(
        Long doctorId, LocalDateTime startTime, LocalDateTime endTime);
    List<Appointment> findByPatientIdAndAppointmentTimeBetween(
        Long patientId, LocalDateTime startTime, LocalDateTime endTime);
}
