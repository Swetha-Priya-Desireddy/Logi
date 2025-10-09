package com.wecp.logisticsmanagementandtrackingsystem.repository;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // extends JpaRepository and add custom methods if needed
}