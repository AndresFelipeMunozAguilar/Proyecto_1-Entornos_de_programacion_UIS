package com.example.demo.interfaceService;

import com.example.demo.model.Account;

import java.util.List;

public interface IAccountService {

    public List<String> getAllEmails();

    public Account createAccount(Account account);

    public Account changePassword(Integer accountId, String newPassword);

    public void deleteAccount(Integer accountId);

    public String verify(Account account);
}
