package com.wecp.logisticsmanagementandtrackingsystem.service;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Driver;
import com.wecp.logisticsmanagementandtrackingsystem.entity.User;
import com.wecp.logisticsmanagementandtrackingsystem.exceptions.CargosNotFoundException;
import com.wecp.logisticsmanagementandtrackingsystem.exceptions.DriverNotFoundException;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CargoRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.DriverRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DriverService {


    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private UserRepository userRepository;

    public Driver createDriver(Driver driver) {
        
        return driverRepository.save(driver);
    }

    public List<Driver> getAllDrivers() {
       
        return driverRepository.findAll();

    }

    


   public boolean updateCargoStatus(Long cargoId, String newStatus) {
      
        Cargo cargo = cargoRepository.findById(cargoId).orElseThrow(() -> new EntityNotFoundException(cargoId + " not found!!"));

        cargo.setStatus(newStatus);
        cargoRepository.save(cargo);
        return true;

    }

   public List<Cargo> viewDriverCargos(Long driverId) throws CargosNotFoundException, DriverNotFoundException {
      
       Driver driver = driverRepository.findById(driverId)
               .orElseThrow(() -> new DriverNotFoundException("No driver found with ID: " + driverId));
   
       List<Cargo> cargos = cargoRepository.findByDriverId(driver.getId());
       if (cargos == null || cargos.isEmpty()) {
           throw new CargosNotFoundException("No cargos associated with this driver");
       }
   
       return cargos;
   }

   public Long getDriverIdByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        Driver driver = driverRepository.findByName(user.getUsername());
        return driver != null ? driver.getId() : null;
        
    }

   

}