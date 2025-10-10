

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-assgin-cargo',
  templateUrl: './assgin-cargo.component.html',
  styleUrls: ['./assgin-cargo.component.scss']
})
export class AssginCargoComponent implements OnInit {
  showError: boolean = false;
  errorMessage: any;
  cargList: any = [];
  cargoToShow: any[] = []; 
  statusModel: any = {};
  showMessage: any;
  responseMessage: any;
  userId:any;
  driverId: any;
  currentPage: number =1;
  itemsPerPage: number = 6;
 
  constructor(
    private router: Router,
    private httpService: HttpService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    const userIdString = this.authService.getId;
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
 
    if (this.userId) {
      this.getDriverIdByUserId(this.userId);
    }
    
    this.statusModel.newStatus = null;
    this.getAssginCargo();
  }
 
  getDriverIdByUserId(userId: number): void {
    this.httpService.getDriverIdByUserId(userId).subscribe((id: number) => {
      this.driverId = id;
      if(this.driverId){
      this.getAssginCargo();
      this.getCargoById();
      }
      else{
        console.error();
      }
    });
  }
 
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 
  getCargoById() {
    this.httpService.getCargoDetails(this.driverId).subscribe(
      data => {
        console.log("Cargo details:", data);
      },
      error => {
        console.error('Error fetching cargo details:', error);
      }
    );
  }
 
  openDeliveryStatus(value: any) {
    this.statusModel.cargoId = value.id;
    this.statusModel.status = value.status;
  }
 
  getAssginCargo() {
    this.cargList = [];
    this.httpService.getAssignOrders(this.driverId).subscribe((data) => {
      this.cargList = data;
      this.paginateCargo();
    });
  }
 
  paginateCargo() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.cargoToShow = this.cargList.slice(start, end);
  }
 
  goToPage(page: number) {
    this.currentPage = page;
    this.paginateCargo();
  }
 
  addStatus(value: any) {
    this.statusModel.cargoId = value.id;
    this.showMessage=null;
    this.responseMessage=null;
    this.statusModel.newStatus = null;
  }
 
  assignDriver() {
    if (this.statusModel.newStatus != null) {
      this.showMessage = false;
      this.httpService.updateCargoStatus(this.statusModel.newStatus, this.statusModel.cargoId).subscribe((data) => {
        this.showMessage = true;
        this.responseMessage = data.message;
        this.getAssginCargo(); 
      });
    }
  }
}
 