import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../Services/car.service';
import { SharedService } from '../../Services/shared.service'; // Import SharedService
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AgentNavBarComponent } from '../agent-nav-bar/agent-nav-bar.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [ReactiveFormsModule, AgentNavBarComponent],
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})
export class AgentComponent implements OnInit, OnDestroy {
  carForm!: FormGroup;
  imageFile: File | null = null;
  userEmail: string = ''; // Variable to store the email
  // emailSubscription: Subscription | undefined;

  fb = inject(FormBuilder);
  sharedService = inject(SharedService);
  router = inject(Router);
  carService = inject(CarService);

  ngOnInit(): void {
    // Subscribe to email from SharedService
    this.sharedService.currentEmail.subscribe((email) => {
      if (email) {
        this.userEmail = email;
      } else {
        console.warn('No email found in SharedService.');
      }
    });

    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900)]],
      colour: ['', Validators.required],
      totalSeats: [
        null,
        [Validators.required, Validators.min(5), Validators.max(7)],
      ],
      licensePlate: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      pricePerDay: [null, Validators.required],
      availableStatus: [false, Validators.required],
      availableDate: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  submitForm(): void {
    if (this.carForm.invalid || !this.imageFile) {
      alert('Please fill all required fields and upload an image.');
      return;
    }

    const formData = new FormData();
    Object.keys(this.carForm.value).forEach((key) => {
      formData.append(key, this.carForm.get(key)?.value);
    });

    formData.append('CarImageFile', this.imageFile);

    this.carService.createCar(formData, this.userEmail).subscribe({
      next: (response) => {
        alert('Car created successfully!');
        this.carForm.reset();
        this.imageFile = null;
        this.router.navigate(['/app-agent-home-page']);
      },
      error: (error) => {
        // alert('An error occurred: ' + error.message);
        alert('Car not registered Successfully!!!');
      },
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable to avoid memory leaks
    if (this.userEmail) {
      this.userEmail = '';
    }
  }
}
