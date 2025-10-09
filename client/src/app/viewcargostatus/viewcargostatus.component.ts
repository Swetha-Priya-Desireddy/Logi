
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-viewcargostatus',
  templateUrl: './viewcargostatus.component.html',
  styleUrls: ['./viewcargostatus.component.scss']
})
export class ViewcargostatusComponent {
  cargo:any={}
  showError:any;
  errorMessage: any;
  cargoIdMd:any;
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService)
  {
 
  }
  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

  search()
  {
    if(this.cargoIdMd!=null)
    {
      this.cargo={};
      this.httpService.getOrderStatus(this.cargoIdMd).subscribe((data: any) => {
        this.cargo=data;
      }, error => {
       
        this.showError = true;
        this.errorMessage = `No result found with A.W.B No. ${this.cargoIdMd}. Please try with valid A.W.B No.`;
        console.error('Login error:', error);
        setTimeout(() => {
          this.showError = false;
        }, 5000);
      });;
    }
     
   
  }
}