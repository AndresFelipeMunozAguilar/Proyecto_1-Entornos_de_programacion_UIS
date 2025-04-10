package com.example.demo.controller;

import com.example.demo.model.Account;
import com.example.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/getAllEmails")
    public List<String> getAllEmails() {
        return accountService.getAllEmails();
    }
    // Crear una nueva cuenta
    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody Account account) {
        try {
            Account newAccount = accountService.createAccount(account);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAccount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El email ya está registrado.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El empleado ya tiene una cuenta registrada.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado.");
        }
    }

    // Cambiar la contraseña de una cuenta
    @PutMapping("/{id}/password")
    public ResponseEntity<Account> changePassword(@PathVariable("id") Integer accountId,
                                                  @RequestBody String newPassword) {
        try {
            Account updated = accountService.changePassword(accountId, newPassword);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Eliminar una cuenta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable("id") Integer accountId) {
        try {
            accountService.deleteAccount(accountId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
