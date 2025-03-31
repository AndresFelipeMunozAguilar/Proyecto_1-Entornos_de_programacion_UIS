package com.example.demo.repository;

import java.util.Optional;

import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    // Método para encontrar un empleado por su código único
    Optional<Employee> findByEmployeeCode(String employeeCode);

    void deleteByEmployeeCode(String employeeCode);

    boolean existsByEmployeeCode(String employeeCode);

}
