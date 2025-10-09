package com.wecp.logisticsmanagementandtrackingsystem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wecp.logisticsmanagementandtrackingsystem.dto.CargoStatusResponse;
import com.wecp.logisticsmanagementandtrackingsystem.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/cargo-status")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<CargoStatusResponse> viewCargoStatus(@RequestParam(required = false) Long cargoId) {

        if (cargoId == null) {
            return ResponseEntity.badRequest().build();
        }

        CargoStatusResponse cargoStatusResponse = customerService.viewCargoStatus(cargoId);
        if (cargoStatusResponse != null) {
            return new ResponseEntity<>(cargoStatusResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}