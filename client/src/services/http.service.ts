
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //todo: complete missing code..
  public serverName=environment.apiUrl;
    
    constructor(private http: HttpClient, private authService:AuthService) {
  
     }
   getCargoById(cargoId: any): Observable<any> {
   
       const authToken = this.authService.getToken();
       let headers = new HttpHeaders();
       headers = headers.set('Content-Type', 'application/json');
       headers = headers.set('Authorization', `Bearer ${authToken}`)
       return this.http.get(this.serverName + `/api/business/cargo-id?cargoId=` + cargoId, { headers: headers });
     }
    getOrderStatus(cargoId:any):Observable<any> {
     
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName+`/api/customer/cargo-status?cargoId=`+cargoId,{headers:headers});
    }
    getCargoDetails(cargoId:any):Observable<any> {
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName+`/api/customer/cargo-details?cargoId=`+cargoId,{headers:headers});
    }
    getDriverIdByUserId(userId: number): Observable<number> {
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      return this.http.get<number>(`${this.serverName}/api/driver/getDriverId?userId=${userId}`, { headers: headers });
    }
    updateCargoStatus(newStatus:any,cargoId:any):Observable<any> {
    
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      return this.http.put<any>(this.serverName+'/api/driver/update-cargo-status?cargoId='+cargoId+'&newStatus='+newStatus,{},{headers:headers});
    }
    assignDriver(driverid: any, cargoId: any): Observable<any> {
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      return this.http.post<any>(
        `${this.serverName}/api/business/assign-cargo?cargoId=${cargoId}&driverId=${driverid}`,
        {}, 
        { headers: headers }
      );
    }
    
    getAssignOrders(driverId:any):Observable<any> {
      console.log("Driver ID", driverId);
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName+`/api/driver/cargo?driverId=`+driverId,{headers:headers});
    }
    getCargo():Observable<any> {
     
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName+`/api/business/cargo`,{headers:headers});
    }
  
    getDrivers():Observable<any> {
     
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`)
      return this.http.get(this.serverName+`/api/business/drivers`,{headers:headers});
    }
    addCargo(details:any):Observable<any> {
    
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      return this.http.post(this.serverName+'/api/business/cargo',details,{headers:headers});
    }
    Login(details:any):Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.post(this.serverName+'/api/login',details,{headers:headers});
    }
    registerUser(details:any):Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      console.log("Register working");
      return this.http.post(this.serverName+'/api/register',details,{headers:headers});
    }
    deleteCargo(cargoId: any): Observable<any> {
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    
      return this.http.delete<any>(this.serverName + `/api/business/cargo/${cargoId}`, { headers });
    }
    updateCargo(cargoId: any, details: any): Observable<any> {
      const authToken = this.authService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    
      return this.http.put<any>(this.serverName + `/api/business/cargo/${cargoId}`, details, { headers });
    }
    
}

