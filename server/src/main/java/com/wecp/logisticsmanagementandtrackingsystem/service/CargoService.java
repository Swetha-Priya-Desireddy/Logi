
package com.wecp.logisticsmanagementandtrackingsystem.service;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Driver;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CargoRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.DriverRepository;

import net.bytebuddy.dynamic.DynamicType.Builder.FieldDefinition.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepo;

    @Autowired
    private DriverRepository driverRepo;

    //funtion to add new cargo
    public Cargo addCargo(Cargo cargo) {
        return this.cargoRepo.save(cargo);
    }

    // function to get cargo by id
    public Cargo getCargoById(Long cargoId) {
        return this.cargoRepo.findById(cargoId).get();
    }
        // function to return list of all cargos
    public List<Cargo> viewAllCargos() {
        return this.cargoRepo.findAll();
    }

    //function to assign cargo to driver based in their IDs
    public boolean assignCargoToDriver(Long cargoId, Long driverId) {

        //check if the cargo exists in database based on cargoID, else throw error
        Cargo cargo = cargoRepo.findById(cargoId).orElseThrow(() -> new EntityNotFoundException("Cargo with ID " + cargoId + " not found!"));

        //check if the driver exists in database based on driverID, else throw error
        Driver driver = driverRepo.findById(driverId).orElseThrow(() -> new EntityNotFoundException("Driver with ID " + driverId + " not found!"));
        
        // if the driver and cargo are found, assign cargo to driver and return true.
        cargo.setStatus("Order Assigned");
        cargo.setDriver(driver);
        cargoRepo.save(cargo);
        return true;
    }
     public boolean deleteCargo(Long cargoId) {
            if (cargoId == null) return false;
    
            java.util.Optional<Cargo> cargoOpt = cargoRepo.findById(cargoId);
            if (cargoOpt.isEmpty()) {
                return false; // Not found
            }
    
            Cargo cargo = cargoOpt.get();
            String status = cargo.getStatus();
    
            // Business rule: only allow delete for Pending / Assigned
            if ("Order In-transit".equals(status) || "Order Delivered".equals(status)) {
                return false;
            }
    
            cargoRepo.deleteById(cargoId);
            return true;
        }
    public Cargo updateCargo(Long cargoId, Cargo incoming) {
            if (cargoId == null) {
                throw new IllegalArgumentException("cargoId cannot be null");
            }
            java.util.Optional<Cargo> opt = cargoRepo.findById(cargoId);
            if (opt.isEmpty()) {
                throw new RuntimeException("Cargo not found: " + cargoId);
            }
    
            Cargo existing = opt.get();
    
            // Optional business rule: block editing when In-transit or Delivered
            String status = existing.getStatus();
            if ("Order In-transit".equals(status) || "Order Delivered".equals(status)) {
                throw new RuntimeException("Cannot edit cargo in status: " + status);
            }
    
            // Update allowed fields
            existing.setContent(incoming.getContent());
            existing.setSize(incoming.getSize());
            existing.setStatus(incoming.getStatus());
            existing.setAddress(incoming.getAddress()); // ✅ NEW
    
            // Note: Typically don't change business/driver here via edit modal
            // If needed, add logic to update driver/business carefully
    
            return cargoRepo.save(existing);
        }
}
