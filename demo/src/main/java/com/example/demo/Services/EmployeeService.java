package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DemoApplication;
import com.example.demo.InterfaceServices.IEmployeeService;
import com.example.demo.Repositories.EmployeeRepository;
import com.example.demo.Models.Employee;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService implements IEmployeeService {

    private final DemoApplication demoApplication;

    @Autowired
    EmployeeRepository employeeRepository;

    EmployeeService(DemoApplication demoApplication) {
        this.demoApplication = demoApplication;
    }

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }
}
