
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
 
@Component({
  selector: 'app-addcargo',
  templateUrl: './addcargo.component.html',
  styleUrls: ['./addcargo.component.scss']
})
export class AddcargoComponent implements OnInit {
  itemForm: FormGroup;
  itemForm1: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  cargList: any = [];
  assignModel: any = {};
  driverList: any = []
  showMessage: any;
  responseMessage: any;
  driverId: any;
  cargoId: any
  cargoToShow: any[] = [];
  
  
   orderToDelete:any | null = null;
   deleteLoading: boolean = false;
   deleteError: string = '';
   deleteSuccess: string = '';



  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      content: [this.formModel.content, [Validators.required]],
      size: [this.formModel.size, [Validators.required]],
      status: [this.formModel.status, [Validators.required]],
      address:[this.formModel.address, [Validators.required]]
    });
    this.itemForm1 = this.formBuilder.group({
      driver: [this.formModel.driver]
    })
  }
  ngOnInit(): void {
    this.getCargo();
    this.getDrivers();
    this.driverId = null;
  }
 
 
 setOrderToDelete(order: any) {
   this.orderToDelete = order;
   this.deleteError = '';
   this.deleteSuccess = '';
 }
 deleteCargo() {
   if (!this.orderToDelete?.id) return;
 
   this.deleteLoading = true;
   this.deleteError = '';
   this.deleteSuccess = '';
 
   const id = this.orderToDelete.id;
 
   this.httpService.deleteCargo(id).subscribe({
     next: (resp: any) => {
       
       this.removeCargoFromLists(id);

       this.deleteSuccess = (resp?.message) ? resp.message : `Cargo #${id} deleted successfully.`;
 
      
       setTimeout(() => {
         const closeBtn = document.getElementById('deleteModalCloseBtn');
         closeBtn?.click();
         this.deleteLoading = false;
         this.deleteSuccess = '';
         this.orderToDelete = null;
       }, 600);
     },
     error: (err) => {
       this.deleteLoading = false;
       const msg = err?.error?.message || err?.message || 'Failed to delete cargo.';
       this.deleteError = msg;
     }
   });
 }
 private removeCargoFromLists(id: number) {
 
   this.cargList = this.cargList.filter((c: any) => c.id !== id);
 
  
   const totalPages = Math.max(1, Math.ceil(this.cargList.length / this.itemsPerPage));
   if (this.currentPage > totalPages) {
     this.currentPage = totalPages;
   }
 
  
   this.paginateCargo();
 }
getDrivers() {
  this.driverList = [];
  this.httpService.getDrivers().subscribe((data: any) => {
    this.driverList = data;
    console.log(this.driverList);
  }, error => {
   
    this.showError = true;
    this.errorMessage = "Cannot get Drivers. Please try again later.";
    console.error('Error:', error);
  });;
 
}
logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
currentPage: number = 1;
itemsPerPage: number = 6;
 
 
getCargo() {
  this.cargList = [];
  this.httpService.getCargo().subscribe((data: any) => {
    this.cargList = data;
    this.paginateCargo();
  }, error => {
    this.showError = true;
    this.errorMessage = "Cannot fetch cargo. Please try again later.";
    console.error('Error:', error);
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
 
search() {
  this.showError = false;
  if (this.cargoId) {
    this.httpService.getCargoById(this.cargoId).subscribe((data: any) => {
      this.cargoToShow = [data];
    }, error => {
      this.showError = true;
      this.errorMessage = "No Record found with entered search ID";
      console.error('Login error:', error);
    });
  } else {
    this.paginateCargo();
  }
}
 
 
 
onSubmit() {
  if (this.itemForm.valid) {
    this.showError = false;
 
    this.httpService.addCargo(this.itemForm.value).subscribe((data: any) => {
      this.itemForm.reset();
      this.getCargo();
    }, error => {
     
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }
  else {
    this.itemForm.markAllAsTouched();
  }
}
addDriver(value: any) {
  this.assignModel.cargoId = value.id;
  this.driverId = null; 
  this.showMessage = false; 
  this.showError = false;   
}
 
 
assignDriver() {
  console.log("assigning")
  this.assignModel.driverId = this.driverId;
  console.log(this.assignModel.driverId)
  if (this.assignModel.driverId != null) {
    this.showMessage = false;
    this.httpService.assignDriver(this.assignModel.driverId, this.assignModel.cargoId).subscribe((data: any) => {
      this.showMessage = true;
      console.log("hello" + JSON.stringify(data));
      this.responseMessage = data.message;
      
    }, error => {
     
      this.showError = true;
      this.errorMessage = "An error occurred while assigning driver. Please try again later.";
      console.error('Error:', error);
    });;
  }
}


 editForm:FormGroup = this.formBuilder.group({  
  content: ['', [Validators.required]],  
  size:   ['', [Validators.required]],  
  status: ['', [Validators.required]],  
  address: ['', [Validators.required]]
});
orderToEdit: any | null = null;
editLoading: boolean = false;
editError: string = '';
editSuccess: string = '';


setOrderToEdit(order: any) {
  this.orderToEdit = order;
  this.editError = '';
  this.editSuccess = '';
  this.editForm.setValue({
    content: order.content ?? '',
    size: order.size ?? '',
    status: order.status ?? '',
    address: order.address ?? '' 
  });
}


updateCargo() {
  if (!this.orderToEdit?.id || this.editForm.invalid) {
    this.editForm.markAllAsTouched();
    return;
  }

  this.editLoading = true;
  this.editError = '';
  this.editSuccess = '';

  const id = this.orderToEdit.id;
  const payload = this.editForm.value;

  this.httpService.updateCargo(id, payload).subscribe({
    next: (updated: any) => {
      this.applyUpdateInLists(id, updated);
      this.editSuccess = `Cargo #${id} updated successfully.`;

      setTimeout(() => {
        const closeBtn = document.getElementById('editModalCloseBtn');
        closeBtn?.click();
        this.editLoading = false;
        this.editSuccess = '';
        this.orderToEdit = null;
      }, 600);
    },
    error: (err) => {
      this.editLoading = false;
      const msg = err?.error?.message || err?.message || 'Failed to update cargo.';
      this.editError = msg;
    }
  });
}


private applyUpdateInLists(id: number, updatedCargo: any) {
  this.cargList = this.cargList.map((c: any) => c.id === id ? { ...c, ...updatedCargo } : c);

  this.paginateCargo();
}
 
}