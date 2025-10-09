package com.wecp.logisticsmanagementandtrackingsystem.repository;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    
    public Driver findByName(String name);
    
}