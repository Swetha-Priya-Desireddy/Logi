package com.wecp.logisticsmanagementandtrackingsystem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.service.DriverService;

import java.util.List;

@RestController
@RequestMapping
public class DriverController {

    @Autowired
    private DriverService driverService;
     @GetMapping("/api/driver/getDriverId")
    public Long getDriverByName(@RequestParam Long userId) {
        return driverService.getDriverIdByUserId(userId);
    }
    @GetMapping("/api/driver/cargo")
    @PreAuthorize("hasAuthority('DRIVER')")
    public ResponseEntity<List<Cargo>> viewAssignedCargos(@RequestParam(required = false) Long driverId) {
        // if (driverId == null) {
        //     return ResponseEntity.badRequest().build();
        // }
        return new ResponseEntity<>(driverService.viewDriverCargos(driverId), HttpStatus.OK);
    }

    @PutMapping("api/driver/update-cargo-status")
    @PreAuthorize("hasAuthority('DRIVER')")
    public ResponseEntity<String> updateCargoStatus(
            @RequestParam(required = false) Long cargoId,
            @RequestParam(required = false) String newStatus) {

        if (cargoId == null || newStatus == null || newStatus.isEmpty()) {
            return ResponseEntity.badRequest().body("Missing cargoId or newStatus");
        }

        boolean updateSuccess = driverService.updateCargoStatus(cargoId, newStatus);

        if (updateSuccess) {
            return ResponseEntity.ok("{\"message\": \"Cargo status updated successfully.\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update cargo status.");
        }
    }
}