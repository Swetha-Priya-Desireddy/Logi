package com.wecp.logisticsmanagementandtrackingsystem.Controller;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Driver;
import com.wecp.logisticsmanagementandtrackingsystem.service.BusinessService;
import com.wecp.logisticsmanagementandtrackingsystem.service.CargoService;
import com.wecp.logisticsmanagementandtrackingsystem.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    private CargoService cargoService;
    private DriverService driverService;
    private BusinessService businessService;

    @Autowired
    public void setCargoService(CargoService cargoService) {
        this.cargoService = cargoService;
    }

    @Autowired
    public void setDriverService(DriverService driverService) {
        this.driverService = driverService;
    }

    @Autowired
    public void setBusinessService(BusinessService businessService) {
        this.businessService = businessService;
    }

    public CargoService getCargoService() {
        return cargoService;
    }

    public DriverService getDriverService() {
        return driverService;
    }

    public BusinessService getBusinessService() {
        return businessService;
    }

    @PostMapping("/cargo")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<Cargo> addCargo(@RequestBody(required = false) Cargo cargo) {
        if (cargo == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(this.cargoService.addCargo(cargo), HttpStatus.OK);
    }

    @GetMapping("/cargo-id")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<Cargo> getCargoById(@RequestParam(required = false) Long cargoId) {
        if (cargoId == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(this.cargoService.getCargoById(cargoId), HttpStatus.OK);
    }

    @GetMapping("/drivers")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return new ResponseEntity<>(this.driverService.getAllDrivers(), HttpStatus.OK);
    }

    @GetMapping("/cargo")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<List<Cargo>> viewAllCargos() {
        return new ResponseEntity<>(this.cargoService.viewAllCargos(), HttpStatus.OK);
    }

    @PostMapping("/assign-cargo")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<String> assignCargoToDriver(
            @RequestParam(required = false) Long cargoId,
            @RequestParam(required = false) Long driverId) {

        if (cargoId == null || driverId == null) {
            return ResponseEntity.badRequest().body("Missing cargoId or driverId");
        }

        boolean assignmentSuccess = this.cargoService.assignCargoToDriver(cargoId, driverId);
        if (assignmentSuccess) {
            return ResponseEntity.ok("{\"message\": \"Cargo assigned successfully.\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to assign cargo.");
        }
    }
    @DeleteMapping("/cargo/{id}")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<String> deleteCargo(@PathVariable Long id) {
        boolean deleted = this.cargoService.deleteCargo(id);
        if (deleted) {
            return ResponseEntity.ok("{\"message\": \"Cargo deleted successfully.\"}");
        } else {
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"message\": \"Cannot delete cargo. Either not found or status does not allow deletion.\"}");
        }
    }
    @PutMapping("/cargo/{id}")
    @PreAuthorize("hasAuthority('BUSINESS')")
    public ResponseEntity<Cargo> updateCargo(
            @PathVariable Long id,
            @RequestBody(required = false) Cargo incoming) {
    
        if (incoming == null) {
            return ResponseEntity.badRequest().build();
        }
    
        Cargo updated = this.cargoService.updateCargo(id, incoming);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
}
