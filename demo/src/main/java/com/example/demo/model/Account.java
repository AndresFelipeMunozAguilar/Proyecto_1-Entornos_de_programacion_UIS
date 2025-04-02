package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_account", nullable = false)
    private int id_acount;
    @Column(name = "email", nullable = false, length = 100)
    private String email;
    @Column(name = "password", nullable = false, length = 255)
    private String password;
    @OneToOne
    @JoinColumn(name = "id_employee", nullable = false)
    private Employee id_employee;

    public int getId_acount() {
        return id_acount;
    }

    public void setId_acount(int id_acount) {
        this.id_acount = id_acount;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Employee getId_employee() {
        return id_employee;
    }

    public void setId_employee(Employee id_employee) {
        this.id_employee = id_employee;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id_acount=" + id_acount +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", id_employee=" + id_employee +
                '}';
    }
}
