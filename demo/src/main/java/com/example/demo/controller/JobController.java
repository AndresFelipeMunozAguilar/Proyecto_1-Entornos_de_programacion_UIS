package com.example.demo.controller;

import com.example.demo.model.Job;
import com.example.demo.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/job")
public class JobController {

    private final JobService jobservice;

    @Autowired
    public JobController(JobService jobservice) {
        this.jobservice = jobservice;
    }

    // Obtener todos los trabajos
    @GetMapping
    public List<Job> getAllJobs() {

        return jobservice.getAllJobs();

    }

    // Obtener trabajo por id
    @GetMapping("/{id}")
    public Optional<Job> getJob(@PathVariable Integer id) {
        return jobservice.getJob(id);
    }

    // Crear un nuevo trabajo
    @PostMapping
    public Job createJob(@RequestBody Job jobDetails) {
        return jobservice.createJob(jobDetails);
    }

    // Actualizar nombre y descripción de un trabajo
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Integer id, @RequestBody Job jobDetails) {
        return jobservice.updateJob(id, jobDetails);
    }

    // Eliminar un trabajo
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Integer id) {
        jobservice.deleteJob(id);
    }

}
