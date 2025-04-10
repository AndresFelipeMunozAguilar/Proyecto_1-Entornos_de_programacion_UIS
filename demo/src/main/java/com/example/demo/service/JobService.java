package com.example.demo.service;

import com.example.demo.interfaceService.IJobService;
import com.example.demo.model.Job;
import com.example.demo.repository.JobRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class JobService implements IJobService {

    @Autowired
    JobRepository jobRepository;

    @Override
    public List<String> getAllJobs(){

        return jobRepository.findAllJobs();

    }

    @Override
    public Optional<Job> getJob(Integer jobId) {

        return jobRepository.findById(jobId);
    }

    @Override
    public Job updateJob(Integer id,Job jobDetails) {

        Job job = jobRepository.findById(id).
                orElseThrow(()-> new NoSuchElementException("Cuenta no encontrada con ID: " + id));

        //Actualizar los campos

        job.setName(jobDetails.getName());
        job.setDescription(jobDetails.getDescription());


        return jobRepository.save(job);
    }

    @Override
    public Job createJob(Job job) {
        if(jobRepository.existsByName(job.getName())) {
            throw new IllegalArgumentException("Ya existe un trabajo con ese nombre" + job.getName());
        }
        return jobRepository.save(job);
    }

    @Override
    public void deleteJob(Integer jobId) {

        if(!jobRepository.existsById(jobId)) {
            throw new IllegalArgumentException("No existe un trabajo con ese ID: " + jobId);
        }

        jobRepository.deleteById(jobId);
    }




}
