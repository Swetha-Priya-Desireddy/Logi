
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

    
    public Cargo addCargo(Cargo cargo) {
        return this.cargoRepo.save(cargo);
    }

    
    public Cargo getCargoById(Long cargoId) {
        return this.cargoRepo.findById(cargoId).get();
    }
       
    public List<Cargo> viewAllCargos() {
        return this.cargoRepo.findAll();
    }

    
    public boolean assignCargoToDriver(Long cargoId, Long driverId) {
        Cargo cargo = cargoRepo.findById(cargoId).orElseThrow(() -> new EntityNotFoundException("Cargo with ID " + cargoId + " not found!"));
        Driver driver = driverRepo.findById(driverId).orElseThrow(() -> new EntityNotFoundException("Driver with ID " + driverId + " not found!"));
        cargo.setStatus("Order Assigned");
        cargo.setDriver(driver);
        cargoRepo.save(cargo);
        return true;
    }
     public boolean deleteCargo(Long cargoId) {
            if (cargoId == null) return false;
    
            java.util.Optional<Cargo> cargoOpt = cargoRepo.findById(cargoId);
            if (cargoOpt.isEmpty()) {
                return false; 
            }
    
            Cargo cargo = cargoOpt.get();
            String status = cargo.getStatus();
    
          
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
    
            
            String status = existing.getStatus();
            if ("Order In-transit".equals(status) || "Order Delivered".equals(status)) {
                throw new RuntimeException("Cannot edit cargo in status: " + status);
            }
    
            
            existing.setContent(incoming.getContent());
            existing.setSize(incoming.getSize());
            existing.setStatus(incoming.getStatus());
            existing.setAddress(incoming.getAddress()); 
    
           
    
            return cargoRepo.save(existing);
        }
}
