package com.example.demo.Controllers;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Services.EmployeeService;
import com.example.demo.Models.Employee;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

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
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {

        try {
            Employee savedEmployee = employeeService.createEmployee(employee);
            return ResponseEntity.ok(savedEmployee);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: El Job con id " + employee.getJob().getIdJob() + " no existe.");

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Error: La integridad de los datos en el request body está comprometida.\t"
                            + e.getMostSpecificCause().getMessage());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: Datos inválidos en la solicitud.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor.");
        }

    }

    @DeleteMapping("/deleteByCode/{employeeCode}")
    public ResponseEntity<String> deleteEmployeeByCode(@PathVariable String employeeCode) {

        try {
            employeeService.deleteEmployeeByCode(employeeCode);

            return ResponseEntity.ok("Empleado eliminado correctamente.");

        } catch (NoSuchElementException e) {

            return ResponseEntity.status(404).body(e.getMessage());

        } catch (Exception e) {

            return ResponseEntity.status(500).body("Error interno del servidor");

        }

    }

    @PutMapping("updateEmployeeById/{idEmployee}")
    public ResponseEntity<?> updateEmployee(
            @PathVariable int idEmployee,
            @RequestBody Employee updatedEmployee) {

        Optional<Employee> employeeOptional = employeeService.updateEmployee(idEmployee, updatedEmployee);

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Error: No se encontró el empleado con ID " + idEmployee);

        if (employeeOptional.isPresent()) {
            response = ResponseEntity.ok(employeeOptional.get());
        }

        return response;
    }

}
