package com.wecp.logisticsmanagementandtrackingsystem.repository;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {
    // extend jpa repository to add custom query methods if needed

    
    List<Cargo> findByBusinessId(Long businessId);

   
    List<Cargo> findByDriverId(Long driverId);
}