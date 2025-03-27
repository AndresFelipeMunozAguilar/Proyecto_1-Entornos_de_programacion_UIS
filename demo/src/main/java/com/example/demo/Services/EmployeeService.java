package com.example.demo.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DemoApplication;
import com.example.demo.InterfaceServices.IEmployeeService;
import com.example.demo.Repositories.EmployeeRepository;
import com.example.demo.Repositories.JobRepository;
import com.example.demo.Models.Employee;
import com.example.demo.Models.Job;

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
}
