
package com.wecp.logisticsmanagementandtrackingsystem.service;

import com.wecp.logisticsmanagementandtrackingsystem.dto.CargoStatusResponse;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Customer;
import com.wecp.logisticsmanagementandtrackingsystem.exceptions.CargoNotExistsException;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CargoRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
  
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CargoRepository cargoRepository;

    public Customer createCustomer(Customer customer) {
        
        return customerRepository.save(customer);

    }

    public CargoStatusResponse viewCargoStatus(Long cargoId) throws CargoNotExistsException{
       

        Cargo cargo = (cargoRepository.findById(cargoId)).orElse(null);
        if (cargo != null) {
            return new CargoStatusResponse(cargo.getId(), cargo.getStatus());
        } else {
            throw new CargoNotExistsException("Cargo with this Id doesn't exists.");
        }

    }
}
