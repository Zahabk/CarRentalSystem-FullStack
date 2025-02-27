import { Component, inject, OnInit } from '@angular/core';
import { carModel } from '../../Models/CarWithLocation';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../CustomerComponents/header/header.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../Services/car.service';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { NavigationbarComponentAdmin } from '../navigationbar/navigationbar.component';
import { HeaderComponentAdmin } from '../header/header.component';
import { carModels } from '../../Models/carModels';


@Component({
  selector: 'app-cars',
  imports: [CommonModule, HeaderComponentAdmin, FormsModule, NavigationbarComponentAdmin],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{
 
  carService = inject(CarService);
  router = inject(Router);

  carList: carModel[] = [];
  successMessage: string = ''; // Property to hold the success message
  errorMessage: string = '';   // Property to handle error message (optional)

  ngOnInit(): void {
    this.getAllCars();
  }
  getAllCars() {
    this.carService.getAllCars().subscribe((result: any) => {
      this.carList = result;
    });
  }

  DeleteCar(selectedCar: carModels) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(selectedCar.licensePlate).subscribe({
        next: (response) => {
          // After successful deletion, update the car list

          this.getAllCars();

          alert('Car deleted successfully!');
          // this.router.navigate(['/app-your-cars']); // Redirect after successful delete
        },
        error: (error) => {
          alert('Failed to delete car. Please try again.');
        },
      });
    }
  }
  
  updateCarForAdmin(selectedCar: carModel) {
    this.router.navigate(['/app-admin-update-car'], { state: { data: selectedCar } });
  }

}


 





