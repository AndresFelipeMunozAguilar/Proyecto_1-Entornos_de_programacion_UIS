package com.example.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
@Table(name = Job.TABLE_NAME)
public class Job {

    public static final String TABLE_NAME = "job";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_job;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    public Job() {
        // Constructor vacío
    }

    public Job(int id_job, String name, String description) {
        this.id_job = id_job;
        this.name = name;
        this.description = description;
    }

    public int getIdJob() {
        return id_job;
    }

    public void setIdJob(int id_job) {
        this.id_job = id_job;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
