package com.example.demo.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Services.EmployeeService;
import com.example.demo.Models.Employee;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAllEmployees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/getEmployeeByCode/{employeeCode}")
    public ResponseEntity<Employee> getEmployeeByCode(@PathVariable String employeeCode) {
        Optional<Employee> employee = employeeService.findByEmployeeCode(employeeCode);

        return employee.map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build());
    }

    @PostMapping("/createEmployee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {

        Employee savedEmployee = employeeService.createEmployee(employee);

        return ResponseEntity.ok(savedEmployee);

    }

}
