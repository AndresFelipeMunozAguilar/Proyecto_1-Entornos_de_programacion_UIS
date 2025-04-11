package com.example.demo.service;

import com.example.demo.interfaceService.IAccountService;
import com.example.demo.model.Account;
import com.example.demo.model.Employee;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.EmployeeRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class AccountService implements IAccountService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<String> getAllEmails() {

        return accountRepository.findAllEmails();
    }

    @Override
    public Account createAccount(Account account) {
       if (accountRepository.findByEmail(account.getEmail()) != null) {
        throw new IllegalArgumentException("El email ya está registrado.");
    }

    // 💡 Cargar el empleado real desde la base de datos
    int idEmp = account.getId_employee().getIdEmployee();

    Employee existingEmployee = employeeRepository.findById(idEmp)
            .orElseThrow(() -> new NoSuchElementException("Empleado no encontrado con ID: " + idEmp));

    // 🔄 Asignar el empleado persistido
    account.setId_employee(existingEmployee);

    return accountRepository.save(account);
    }

    @Override
    public Account changePassword(Integer accountId, String newPassword) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoSuchElementException("Cuenta no encontrada con ID: " + accountId));

        account.setPassword(newPassword);
        return accountRepository.save(account);
    }

    @Override
    public void deleteAccount(Integer accountId) {
        Account existingAccount = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoSuchElementException("Cuenta no encontrada con ID: " + accountId));

        accountRepository.delete(existingAccount);
    }

    @Override
    public String verify(Account account){
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(account.getEmail(), account.getPassword()));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(account.getEmail());
        }

        return "fail";


    }

}
