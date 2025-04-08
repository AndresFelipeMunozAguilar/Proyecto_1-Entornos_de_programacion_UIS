package com.example.demo.repository;

import com.example.demo.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Integer> {

    boolean existsByName(String name);

    boolean existsByIdJob(Integer idJob);

    @Query("SELECT a.name FROM Job a")
    List<String> findAllJobs();

}
