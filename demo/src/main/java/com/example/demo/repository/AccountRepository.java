package com.example.demo.repository;

import com.example.demo.model.Account;
import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByEmail(String email);

    @Query("SELECT a.email FROM Account a")
    List<String> findAllEmails();


}
