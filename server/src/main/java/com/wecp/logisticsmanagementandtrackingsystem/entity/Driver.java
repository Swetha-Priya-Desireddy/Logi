
package com.wecp.logisticsmanagementandtrackingsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;

@Entity
public class Driver {
    // Primary Key Genaration
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    // Association with Cargo
    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Cargo> assignedCargos;

    // Empty Constructor
    public Driver() {
    }

    // Parameterized Constructor
    public Driver(String name, String email, List<Cargo> assignedCargos) {
        this.name = name;
        this.email = email;
        this.assignedCargos = assignedCargos;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Cargo> getAssignedCargos() {
        return assignedCargos;
    }

    public void setAssignedCargos(List<Cargo> assignedCargos) {
        this.assignedCargos = assignedCargos;
    }
}
