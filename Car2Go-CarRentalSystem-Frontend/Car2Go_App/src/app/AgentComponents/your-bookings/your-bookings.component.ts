import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../../Services/car.service';
import { carModel } from '../../Models/CarWithLocation';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentNavBarComponent } from "../agent-nav-bar/agent-nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-your-bookings',
  imports: [CommonModule, FormsModule, AgentNavBarComponent],
  templateUrl: './your-bookings.component.html',
  styleUrl: './your-bookings.component.css'
})
export class YourBookingsComponent {

  http = inject(HttpClient);
  sharedService = inject(SharedService);
  
  email: string | null = null;
  receivedCars: any[] = []; // Declare the cars array to hold the response data

  ngOnInit(): void {

    this.sharedService.currentEmail.subscribe((email) => {
      if (email) {
        this.email = email; // Assign the email
      }
    });

    // Fetching car reservation details from the API
    
    this.http.get(`https://localhost:7273/api/Reservation/Reserved-AgentCar?email=${this.email}`).subscribe((result: any) => {
      console.log(result);
      this.receivedCars = result; // Assign the response to receivedCars
    });
  }

}
