package com.webapp.getadoc.controller;

import com.webapp.getadoc.model.Appointment;
import com.webapp.getadoc.repository.AppointmentRepository;
import com.webapp.getadoc.repository.DoctorRepository;
import com.webapp.getadoc.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        return appointment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to create a new appointment
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointmentRequest) {
        // Ensure Doctor and Patient exist before creating appointment
        if (appointmentRequest.getDoctor() == null || appointmentRequest.getDoctor().getId() == null ||
            appointmentRequest.getPatient() == null || appointmentRequest.getPatient().getId() == null) {
            return ResponseEntity.badRequest().body(null); // Or a more descriptive error
        }

        boolean doctorExists = doctorRepository.existsById(appointmentRequest.getDoctor().getId());
        boolean patientExists = patientRepository.existsById(appointmentRequest.getPatient().getId());

        if (!doctorExists || !patientExists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Or indicate which one was not found
        }

        Appointment newAppointment = new Appointment();
        newAppointment.setDoctor(doctorRepository.findById(appointmentRequest.getDoctor().getId()).get());
        newAppointment.setPatient(patientRepository.findById(appointmentRequest.getPatient().getId()).get());
        newAppointment.setAppointmentTime(appointmentRequest.getAppointmentTime());
        newAppointment.setStatus(appointmentRequest.getStatus() != null ? appointmentRequest.getStatus() : "SCHEDULED");

        Appointment savedAppointment = appointmentRepository.save(newAppointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAppointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointmentDetails) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        if (appointmentOptional.isPresent()) {
            Appointment appointment = appointmentOptional.get();
            // Basic updates, can be expanded
            if (appointmentDetails.getAppointmentTime() != null) {
                appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
            }
            if (appointmentDetails.getStatus() != null) {
                appointment.setStatus(appointmentDetails.getStatus());
            }
            // Potentially update doctor/patient if logic allows, requires careful handling
            return ResponseEntity.ok(appointmentRepository.save(appointment));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    // Example: /api/appointments/doctor/1/schedule?start=2025-05-10T09:00:00&end=2025-05-10T17:00:00
    @GetMapping("/doctor/{doctorId}/schedule")
    public List<Appointment> getDoctorSchedule(
            @PathVariable Long doctorId,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        return appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(doctorId, start, end);
    }

     // Example: /api/appointments/patient/1/schedule?start=2025-05-10T00:00:00&end=2025-05-15T23:59:59
    @GetMapping("/patient/{patientId}/schedule")
    public List<Appointment> getPatientSchedule(
            @PathVariable Long patientId,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        return appointmentRepository.findByPatientIdAndAppointmentTimeBetween(patientId, start, end);
    }

}
