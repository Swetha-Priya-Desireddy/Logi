package com.wecp.logisticsmanagementandtrackingsystem.service;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Business;
import com.wecp.logisticsmanagementandtrackingsystem.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessService {
   
    @Autowired
    private BusinessRepository businessRepository;

    public Business registerBusiness(Business business) {

        return this.businessRepository.save(business);
    }
}