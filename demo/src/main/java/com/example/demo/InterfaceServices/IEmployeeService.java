package com.example.demo.InterfaceServices;

import java.util.List;
import java.util.Optional;
import com.example.demo.Models.Employee;

public interface IEmployeeService {

    public List<Employee> getAllEmployees();

    public Optional<Employee> findByEmployeeCode(String employeeCode);

    public Employee createEmployee(Employee employee);

    public void deleteEmployeeByCode(String employeeCode);

    public Optional<Employee> updateEmployee(int idEmployee, Employee employee);

}
