package com.example.demo.Repositories;

import java.util.Optional;

import com.example.demo.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    // Método para encontrar un empleado por su código único
    Optional<Employee> findByEmployeeCode(String employeeCode);

}
