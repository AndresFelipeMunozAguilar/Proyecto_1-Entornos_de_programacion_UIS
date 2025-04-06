package com.example.demo.service;

import com.example.demo.interfaceService.IAccountService;
import com.example.demo.model.Account;
import com.example.demo.repository.AccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class AccountService implements IAccountService {

    @Autowired
    AccountRepository accountRepository;

    @Override
    public List<String> getAllEmails() {

        return accountRepository.findAllEmails();
    }

    @Override
    public Account createAccount(Account account) {
        if (accountRepository.findByEmail(account.getEmail()) != null) {
            throw new IllegalArgumentException("El email ya está registrado.");
        }


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

}
