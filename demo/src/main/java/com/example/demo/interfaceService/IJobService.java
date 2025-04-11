package com.example.demo.interfaceService;

import com.example.demo.model.Job;

import java.util.List;
import java.util.Optional;

public interface IJobService {

    public List<Job> getAllJobs();

    public Optional<Job> getJob(Integer jobId);

    public Job updateJob(Integer id, Job job);

    public Job createJob(Job job);

    public void deleteJob(Integer jobId);

}
