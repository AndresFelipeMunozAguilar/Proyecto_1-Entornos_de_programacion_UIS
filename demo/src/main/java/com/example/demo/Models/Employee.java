package com.example.demo.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = Employee.TABLE_NAME)
public class Employee {

    public static final String TABLE_NAME = "Employee";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_employee;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "last_name", nullable = false, length = 50)
    private String last_name;

    @ManyToOne
    @Column(name = "id_job", nullable = false)
    private int id_job;

    @Column(name = "phone", nullable = false, length = 15, unique = true)
    private String phone;

    @Column(name = "image_url", nullable = false, length = 255)
    private String image_url;

    @Column(name = "employee_code", nullable = false, length = 20, unique = true)
    private String employee_code;

    // Constructor vacío (obligatorio para JPA)
    public Employee() {
    }

    // Constructor con parámetros
    public Employee(
            String name,
            String last_name,
            int id_job,
            String phone,
            String image_url,
            String employee_code) {
        this.name = name;
        this.last_name = last_name;
        this.id_job = id_job;
        this.phone = phone;
        this.image_url = image_url;
        this.employee_code = employee_code;
    }

    // Getters y Setters
    public int getIdEmployee() {
        return id_employee;
    }

    public void setIdEmployee(int id_employee) {
        this.id_employee = id_employee;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return last_name;
    }

    public void setLastName(String last_name) {
        this.last_name = last_name;
    }

    public int getIdJob() {
        return id_job;
    }

    public void setIdJob(int id_job) {
        this.id_job = id_job;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getImageUrl() {
        return image_url;
    }

    public void setImageUrl(String image_url) {
        this.image_url = image_url;
    }

    public String getEmployeeCode() {
        return employee_code;
    }

    public void setEmployeeCode(String employee_code) {
        this.employee_code = employee_code;
    }
}
