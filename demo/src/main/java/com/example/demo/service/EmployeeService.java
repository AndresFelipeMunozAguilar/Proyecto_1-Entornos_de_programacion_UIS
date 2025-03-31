package com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DemoApplication;
import com.example.demo.interfaceService.IEmployeeService;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.JobRepository;
import com.example.demo.model.Employee;
import com.example.demo.model.Job;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService implements IEmployeeService {

    private final DemoApplication demoApplication;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    JobRepository jobRepository;

    @PersistenceContext
    private EntityManager entityManager; // Se usa para refrescar la entidad después de guardarla

    EmployeeService(DemoApplication demoApplication) {
        this.demoApplication = demoApplication;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> findByEmployeeCode(String employeeCode) {
        return employeeRepository.findByEmployeeCode(employeeCode);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        // Buscar el Job en la base de datos
        Job job = jobRepository.findById(employee.getJob().getIdJob())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Asignar el Job encontrado a Employee
        employee.setJob(job);

        // Guardar el empleado
        Employee savedEmployee = employeeRepository.save(employee);

        // Forzar la sincronización con la base de datos
        entityManager.refresh(savedEmployee);

        return savedEmployee; // Ahora contiene el `employeeCode` generado
    }

    @Override
    public void deleteEmployeeByCode(String employeeCode) {
        if (!employeeRepository.existsByEmployeeCode(employeeCode)) {
            throw new NoSuchElementException(
                    "Error: El empleado con código de empleado " + employeeCode + " no existe.");
        }

        employeeRepository.deleteByEmployeeCode(employeeCode);
    }
}
