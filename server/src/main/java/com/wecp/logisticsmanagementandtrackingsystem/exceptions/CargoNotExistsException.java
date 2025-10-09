package com.wecp.logisticsmanagementandtrackingsystem.exceptions;

public class CargoNotExistsException extends RuntimeException{
    public CargoNotExistsException(String msg){
        super(msg);
    }
}
