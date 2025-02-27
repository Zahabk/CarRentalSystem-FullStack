import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { catchError, forkJoin, Observable, of, switchMap, throwError } from 'rxjs';
import { carModel } from '../Models/CarWithLocation';
import { carModels } from '../Models/carModels';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string ="https://localhost:7273/api/Car/";

  getAllCarsUrl:string = 'https://localhost:7273/api/Car/get-all-cars-with-rating';


  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getCars(){
    // return this.http.get(this.apiUrl+"get-all-cars");
    return this.http.get(this.apiUrl+"get-all-cars-with-rating");
  }
  
  getAllCars():Observable<any>{
    return this.http.get(this.getAllCarsUrl);
    
  }

  // Method to create a car
  createCar(formData: FormData, userEmail: string): Observable<any> {
    return this.http.post(`https://localhost:7273/api/Car/Create-Car?email=${userEmail}`, formData, {
      headers: new HttpHeaders(),
    });
  }

  // Delete Car (for Admin)
  deleteCar(licensePlate: string): Observable<any> {
    const params = new HttpParams().set('licensePlate', licensePlate);

    return this.http.delete<any>(`https://localhost:7273/api/Car/delete-car?licensePlate=${licensePlate}`, { params });
  }

  updateCar(updatedCar: carModel): Observable<any> {
    const params = new HttpParams().set('licensePlate', updatedCar.licensePlate);
    return this.http.put<any>(`https://localhost:7273/api/Car/update-car-with-location?licensePlate=${updatedCar.licensePlate}`, updatedCar, { params });
  }
  
}
