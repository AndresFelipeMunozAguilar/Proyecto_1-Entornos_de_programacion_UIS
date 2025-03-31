package com.example.demo.service;

import com.example.demo.model.Account;
import com.example.demo.model.AccountPrincipal;
import com.example.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account= accountRepo.findByEmail(email);
        if(account==null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found");
        }

        return new AccountPrincipal(account);
    }
}
